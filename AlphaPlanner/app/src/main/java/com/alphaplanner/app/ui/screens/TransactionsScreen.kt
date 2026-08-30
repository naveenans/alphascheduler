package com.alphaplanner.app.ui.screens

import android.content.Intent
import android.provider.Settings
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.alphaplanner.app.data.FinanceStore
import com.alphaplanner.app.model.FinanceCategory
import com.alphaplanner.app.model.TransactionType
import java.text.NumberFormat
import java.util.Locale

@Composable
fun TransactionsScreen() {
    val context = LocalContext.current
    var showAdd by remember { mutableStateOf(false) }

    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item {
            Text("Transactions", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text("v0.2 • Local storage + notification capture", color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        item {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                Button(onClick = { showAdd = true }, modifier = Modifier.weight(1f)) { Text("Add manually") }
                OutlinedButton(
                    onClick = { context.startActivity(Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS)) },
                    modifier = Modifier.weight(1f)
                ) { Text("Enable capture") }
            }
        }
        items(FinanceStore.transactions, key = { it.id }) { tx ->
            ElevatedCard(Modifier.fillMaxWidth()) {
                Row(Modifier.padding(16.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                    Column(Modifier.weight(1f)) {
                        Text(tx.merchant, fontWeight = FontWeight.Bold)
                        Text("${tx.bank} • ${tx.category.name.replace('_', ' ')}", style = MaterialTheme.typography.bodySmall)
                        Text(tx.timestampLabel, style = MaterialTheme.typography.labelSmall)
                    }
                    val prefix = if (tx.type == TransactionType.CREDIT) "+" else "−"
                    Text(prefix + NumberFormat.getCurrencyInstance(Locale("en", "IN")).format(tx.amount), fontWeight = FontWeight.Bold)
                }
            }
        }
    }

    if (showAdd) {
        ManualTransactionDialog(onDismiss = { showAdd = false })
    }
}

@Composable
private fun ManualTransactionDialog(onDismiss: () -> Unit) {
    var merchant by remember { mutableStateOf("") }
    var bank by remember { mutableStateOf("") }
    var amount by remember { mutableStateOf("") }
    var type by remember { mutableStateOf(TransactionType.DEBIT) }
    var category by remember { mutableStateOf(FinanceCategory.MISCELLANEOUS) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add transaction") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                OutlinedTextField(merchant, { merchant = it }, label = { Text("Merchant / source") }, singleLine = true)
                OutlinedTextField(bank, { bank = it }, label = { Text("Bank / wallet") }, singleLine = true)
                OutlinedTextField(amount, { amount = it.filter { c -> c.isDigit() || c == '.' } }, label = { Text("Amount") }, singleLine = true)
                SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
                    listOf(TransactionType.DEBIT, TransactionType.CREDIT).forEachIndexed { index, option ->
                        SegmentedButton(selected = type == option, onClick = { type = option }, shape = SegmentedButtonDefaults.itemShape(index, 2)) { Text(option.name) }
                    }
                }
                Text("Category: ${category.name.replace('_', ' ')}", style = MaterialTheme.typography.labelLarge)
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    listOf(FinanceCategory.GROCERY, FinanceCategory.FOOD_DINING, FinanceCategory.FUEL, FinanceCategory.SALARY).forEach { c ->
                        FilterChip(selected = category == c, onClick = { category = c }, label = { Text(c.name.replace('_', ' ').take(8)) })
                    }
                }
            }
        },
        confirmButton = {
            Button(onClick = {
                amount.toDoubleOrNull()?.takeIf { it > 0 }?.let { FinanceStore.addManual(merchant, bank, it, type, category) }
                onDismiss()
            }) { Text("Save") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } }
    )
}
