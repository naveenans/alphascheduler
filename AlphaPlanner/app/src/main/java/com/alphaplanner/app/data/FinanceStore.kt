package com.alphaplanner.app.data

import android.content.Context
import androidx.compose.runtime.mutableStateListOf
import com.alphaplanner.app.model.FinanceCategory
import com.alphaplanner.app.model.FinanceTransaction
import com.alphaplanner.app.model.TransactionType
import org.json.JSONArray
import org.json.JSONObject

object FinanceStore {
    private const val PREFS = "alpha_planner_finance"
    private const val KEY = "transactions"
    private var appContext: Context? = null
    val transactions = mutableStateListOf<FinanceTransaction>()

    fun init(context: Context) {
        if (appContext != null) return
        appContext = context.applicationContext
        load()
        if (transactions.isEmpty()) transactions.addAll(DemoFinanceRepository.transactions)
    }

    fun add(tx: FinanceTransaction) {
        if (transactions.any { it.id == tx.id }) return
        transactions.add(0, tx)
        persist()
    }

    fun addManual(merchant: String, bank: String, amount: Double, type: TransactionType, category: FinanceCategory) {
        val now = System.currentTimeMillis()
        add(FinanceTransaction(now, merchant.ifBlank { "Manual entry" }, bank.ifBlank { "Manual" }, amount, type, category, "Just now", now))
    }

    fun delete(id: Long) { transactions.removeAll { it.id == id }; persist() }
    fun clearAll() { transactions.clear(); persist() }

    fun csv(): String = buildString {
        append("Timestamp,Merchant,Bank,Type,Category,Amount\n")
        transactions.forEach { t -> append("${t.timestampEpoch},${t.merchant.replace(","," ")},${t.bank.replace(","," ")},${t.type},${t.category},${t.amount}\n") }
    }

    private fun persist() {
        val ctx = appContext ?: return
        val array = JSONArray()
        transactions.forEach { tx -> array.put(JSONObject().apply {
            put("id", tx.id); put("merchant", tx.merchant); put("bank", tx.bank); put("amount", tx.amount)
            put("type", tx.type.name); put("category", tx.category.name); put("timestampLabel", tx.timestampLabel); put("timestampEpoch", tx.timestampEpoch)
        }) }
        ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString(KEY, array.toString()).apply()
    }

    private fun load() {
        val ctx = appContext ?: return
        val raw = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString(KEY, null) ?: return
        runCatching {
            val array = JSONArray(raw)
            for (i in 0 until array.length()) {
                val o = array.getJSONObject(i)
                transactions.add(FinanceTransaction(
                    id = o.getLong("id"), merchant = o.getString("merchant"), bank = o.getString("bank"), amount = o.getDouble("amount"),
                    type = TransactionType.valueOf(o.getString("type")), category = FinanceCategory.valueOf(o.getString("category")),
                    timestampLabel = o.optString("timestampLabel", "Saved"), timestampEpoch = o.optLong("timestampEpoch", o.getLong("id"))
                ))
            }
        }
    }
}
