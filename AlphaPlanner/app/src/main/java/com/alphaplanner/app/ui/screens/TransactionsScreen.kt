package com.alphaplanner.app.ui.screens

import android.content.Intent
import android.provider.Settings
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
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
    var query by remember { mutableStateOf("") }
    var filter by remember { mutableStateOf("All") }

    val filtered = FinanceStore.transactions.filter { tx ->
        val queryMatch = query.isBlank() || listOf(tx.merchant, tx.bank, tx.category.name).any { it.contains(query, true) }
        val typeMatch = when (filter) {
            "Income" -> tx.type == TransactionType.CREDIT || tx.type == TransactionType.REFUND
            "Expense" -> tx.type == TransactionType.DEBIT
            "Invest" -> tx.type == TransactionType.INVESTMENT || tx.category in setOf(FinanceCategory.INVESTMENT, FinanceCategory.NPS, FinanceCategory.PF)
            else -> true
        }
        queryMatch && typeMatch
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(18.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text("Expenses", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.ExtraBold)
            Text("Track every rupee • smart categorization", color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        item {
            OutlinedTextField(
                value = query,
                onValueChange = { query = it },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                leadingIcon = { Icon(Icons.Default.Search, null) },
                trailingIcon = { if (query.isNotEmpty()) IconButton(onClick = { query = "" }) { Icon(Icons.Default.Close, null) } },
                placeholder = { Text("Search transactions") },
                shape = RoundedCornerShape(18.dp)
            )
        }
        item {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                listOf("All", "Income", "Expense", "Invest").forEach { label ->
                    FilterChip(selected = filter == label, onClick = { filter = label }, label = { Text(label) })
                }
            }
        }
        item {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                Button(onClick = { showAdd = true }, modifier = Modifier.weight(1f)) {
                    Icon(Icons.Default.Add, null); Spacer(Modifier.width(6.dp)); Text("Add Transaction")
                }
                OutlinedButton(onClick = { context.startActivity(Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS)) }, modifier = Modifier.weight(1f)) {
                    Icon(Icons.Default.NotificationsActive, null); Spacer(Modifier.width(6.dp)); Text("Capture")
                }
            }
        }

        if (filtered.isEmpty()) {
            item {
                ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(26.dp)) {
                    Column(Modifier.fillMaxWidth().padding(vertical = 44.dp, horizontal = 24.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        Box(Modifier.size(68.dp).clip(CircleShape).background(MaterialTheme.colorScheme.surfaceVariant), contentAlignment = Alignment.Center) { Icon(Icons.Default.AccountBalanceWallet, null, Modifier.size(34.dp), tint = MaterialTheme.colorScheme.primary) }
                        Text(if (query.isBlank()) "No transactions yet" else "No matches", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                        Text(if (query.isBlank()) "Add your first transaction to get started." else "Try a different search or filter.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                        if (query.isBlank()) Button(onClick = { showAdd = true }) { Icon(Icons.Default.Add, null); Spacer(Modifier.width(6.dp)); Text("Add Transaction") }
                    }
                }
            }
        } else {
            items(filtered, key = { it.id }) { tx -> TransactionRow(tx) }
        }
    }

    if (showAdd) ManualTransactionDialog(onDismiss = { showAdd = false })
}

@Composable
private fun TransactionRow(tx: com.alphaplanner.app.model.FinanceTransaction) {
    val positive = tx.type == TransactionType.CREDIT || tx.type == TransactionType.REFUND
    ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(20.dp)) {
        Row(Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(Modifier.size(46.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primaryContainer), contentAlignment = Alignment.Center) { Icon(categoryIcon(tx.category), null, tint = MaterialTheme.colorScheme.primary) }
            Spacer(Modifier.width(12.dp))
            Column(Modifier.weight(1f)) {
                Text(tx.merchant, fontWeight = FontWeight.Bold)
                Text("${bankBadge(tx.bank)} • ${pretty(tx.category.name)}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Text(tx.timestampLabel, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Text((if (positive) "+" else "−") + NumberFormat.getCurrencyInstance(Locale("en", "IN")).format(tx.amount), fontWeight = FontWeight.ExtraBold, color = if (positive) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurface)
        }
    }
}

@Composable
private fun ManualTransactionDialog(onDismiss: () -> Unit) {
    var merchant by remember { mutableStateOf("") }; var bank by remember { mutableStateOf("") }; var amount by remember { mutableStateOf("") }; var type by remember { mutableStateOf(TransactionType.DEBIT) }; var category by remember { mutableStateOf(FinanceCategory.MISCELLANEOUS) }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add transaction") },
        text = { Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            OutlinedTextField(merchant, { merchant = it }, label = { Text("Merchant / source") }, singleLine = true)
            OutlinedTextField(bank, { bank = it }, label = { Text("Bank / wallet") }, singleLine = true)
            OutlinedTextField(amount, { amount = it.filter { c -> c.isDigit() || c == '.' } }, label = { Text("Amount") }, singleLine = true)
            SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
                listOf(TransactionType.DEBIT, TransactionType.CREDIT).forEachIndexed { index, option -> SegmentedButton(selected = type == option, onClick = { type = option }, shape = SegmentedButtonDefaults.itemShape(index, 2)) { Text(option.name) } }
            }
            Text("Category", fontWeight = FontWeight.SemiBold)
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                listOf(FinanceCategory.GROCERY, FinanceCategory.FOOD_DINING, FinanceCategory.FUEL, FinanceCategory.SALARY).forEach { c -> FilterChip(selected = category == c, onClick = { category = c }, label = { Text(pretty(c.name).take(9)) }) }
            }
        } },
        confirmButton = { Button(onClick = { amount.toDoubleOrNull()?.takeIf { it > 0 }?.let { FinanceStore.addManual(merchant, bank, it, type, category) }; onDismiss() }) { Text("Save") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } }
    )
}

private fun categoryIcon(category: FinanceCategory) = when (category) {
    FinanceCategory.SALARY -> Icons.Default.Payments
    FinanceCategory.GROCERY -> Icons.Default.ShoppingCart
    FinanceCategory.FUEL -> Icons.Default.LocalGasStation
    FinanceCategory.FOOD_DINING -> Icons.Default.Restaurant
    FinanceCategory.INVESTMENT, FinanceCategory.NPS, FinanceCategory.PF -> Icons.Default.TrendingUp
    FinanceCategory.LIC, FinanceCategory.HEALTH_INSURANCE -> Icons.Default.HealthAndSafety
    FinanceCategory.VEHICLE -> Icons.Default.DirectionsCar
    FinanceCategory.GOVERNMENT -> Icons.Default.AccountBalance
    FinanceCategory.RENT, FinanceCategory.EMI -> Icons.Default.HomeWork
    FinanceCategory.UTILITIES -> Icons.Default.Bolt
    FinanceCategory.SHOPPING -> Icons.Default.ShoppingBag
    FinanceCategory.MEDICAL -> Icons.Default.MedicalServices
    FinanceCategory.EDUCATION -> Icons.Default.School
    FinanceCategory.SUBSCRIPTION -> Icons.Default.Subscriptions
    else -> Icons.Default.Wallet
}

private fun bankBadge(bank: String): String {
    val cleaned = bank.trim(); if (cleaned.isBlank()) return "Manual"
    val initials = cleaned.split(" ").filter { it.isNotBlank() }.take(2).joinToString("") { it.first().uppercase() }
    return if (initials.isBlank()) cleaned.take(3).uppercase() else "$initials · $cleaned"
}

private fun pretty(value: String): String = value.lowercase().replace('_', ' ').replaceFirstChar { it.uppercase() }
