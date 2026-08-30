package com.alphaplanner.app.data

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.net.Uri
import androidx.core.content.ContextCompat
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

object SmsTransactionImporter {
    data class ImportResult(
        val scanned: Int,
        val imported: Int,
        val skipped: Int,
        val permissionGranted: Boolean
    )

    private const val LOOKBACK_DAYS = 10L
    private const val DAY_MS = 86_400_000L

    fun importLast10Days(context: Context): ImportResult {
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) {
            return ImportResult(0, 0, 0, false)
        }

        val cutoff = System.currentTimeMillis() - LOOKBACK_DAYS * DAY_MS
        var scanned = 0
        var imported = 0
        var skipped = 0
        val uri = Uri.parse("content://sms/inbox")
        val projection = arrayOf("_id", "address", "body", "date")

        context.contentResolver.query(
            uri,
            projection,
            "date >= ?",
            arrayOf(cutoff.toString()),
            "date DESC"
        )?.use { cursor ->
            val idIndex = cursor.getColumnIndexOrThrow("_id")
            val addressIndex = cursor.getColumnIndexOrThrow("address")
            val bodyIndex = cursor.getColumnIndexOrThrow("body")
            val dateIndex = cursor.getColumnIndexOrThrow("date")

            while (cursor.moveToNext()) {
                scanned++
                val smsId = cursor.getLong(idIndex)
                val sender = cursor.getString(addressIndex).orEmpty()
                val body = cursor.getString(bodyIndex).orEmpty()
                val date = cursor.getLong(dateIndex)

                val parsed = TransactionParser.parse(
                    packageName = "sms.${sender.filter { it.isLetterOrDigit() }.take(16)}",
                    title = sender,
                    text = body,
                    capturedAt = date,
                    timestampLabel = "SMS • ${formatDate(date)}"
                )

                if (parsed == null) {
                    skipped++
                    continue
                }

                val stableId = 8_000_000_000_000_000_000L + smsId.coerceAtMost(999_999_999_999_999_999L)
                val tx = parsed.copy(id = stableId)
                val before = FinanceStore.transactions.size
                FinanceStore.add(tx)
                if (FinanceStore.transactions.size > before) imported++ else skipped++
            }
        }

        return ImportResult(scanned, imported, skipped, true)
    }

    private fun formatDate(epoch: Long): String =
        SimpleDateFormat("dd MMM, h:mm a", Locale.getDefault()).format(Date(epoch))
}
