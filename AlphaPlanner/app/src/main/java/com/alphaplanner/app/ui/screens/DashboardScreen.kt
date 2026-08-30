package com.alphaplanner.app.ui.screens

import androidx.compose.animation.core.animateIntAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.alphaplanner.app.data.FinanceStore
import com.alphaplanner.app.data.PlannerStore
import com.alphaplanner.app.model.FinanceCategory
import com.alphaplanner.app.model.TransactionType
import java.text.NumberFormat
import java.util.Locale

@Composable
fun DashboardScreen() {
    var range by remember { mutableStateOf("Month") }
    val now = System.currentTimeMillis()
    val span = when (range) {
        "Day" -> 86_400_000L
        "Week" -> 7L * 86_400_000L
        "Year" -> 365L * 86_400_000L
        else -> 30L * 86_400_000L
    }
    val txs = FinanceStore.transactions.filter { it.timestampEpoch >= now - span }
    val income = txs.filter { it.type == TransactionType.CREDIT || it.type == TransactionType.REFUND }.sumOf { it.amount }
    val expenses = txs.filter { it.type == TransactionType.DEBIT }.sumOf { it.amount }
    val txInvestments = txs.filter { it.category == FinanceCategory.INVESTMENT || it.category == FinanceCategory.NPS || it.category == FinanceCategory.PF }.sumOf { it.amount }
    val plannedInvestments = PlannerStore.items.filter { it.type == "Investment" }.sumOf { it.amount }
    val investments = txInvestments + plannedInvestments
    val savings = (income - expenses).coerceAtLeast(0.0)
    val savingsRate = if (income > 0) ((savings / income) * 100).toInt().coerceIn(0, 100) else 0
    val budget = PlannerStore.monthlyBudget.value
    val normalizedBudget = when (range) { "Day" -> budget / 30.0; "Week" -> budget / 4.3; "Year" -> budget * 12; else -> budget }
    val budgetUse = if (normalizedBudget > 0) (expenses / normalizedBudget * 100).toInt() else 0
    val health = (45 + savingsRate / 2 - if (budgetUse > 100) 15 else 0 + if (plannedInvestments > 0) 5 else 0).coerceIn(0, 100)
    val score by animateIntAsState(health, label = "score")
    val topExpense = txs.filter { it.type == TransactionType.DEBIT }.groupBy { it.category }.maxByOrNull { e -> e.value.sumOf { it.amount } }
    val upcoming = PlannerStore.items.filter { (it.type == "Reminder" || it.type == "Receivable") && !it.done }.take(3)

    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        item {
            Text("Alpha Planner", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text("v1.0 • Plan Money. Build Wealth. Gain Freedom.", color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        item {
            SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
                listOf("Day", "Week", "Month", "Year").forEachIndexed { index, label ->
                    SegmentedButton(selected = range == label, onClick = { range = label }, shape = SegmentedButtonDefaults.itemShape(index, 4)) { Text(label) }
                }
            }
        }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) {
                Row(Modifier.padding(18.dp), verticalAlignment = Alignment.CenterVertically) {
                    CircularProgressIndicator(progress = { score / 100f }, modifier = Modifier.size(76.dp))
                    Spacer(Modifier.width(16.dp))
                    Column {
                        Text("Financial Health", style = MaterialTheme.typography.titleMedium)
                        Text("$score / 100", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
                        Text("Savings $savingsRate% • Budget used $budgetUse% • $range")
                    }
                }
            }
        }
        item { MetricGrid(income, expenses, savings, investments) }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("$range Budget Pace", fontWeight = FontWeight.Bold)
                LinearProgressIndicator(progress = { if (normalizedBudget > 0) (expenses / normalizedBudget).coerceIn(0.0,1.0).toFloat() else 0f }, modifier = Modifier.fillMaxWidth())
                Text("${formatInr(expenses)} of ${formatInr(normalizedBudget)}")
            } }
        }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp)) {
                Text("Alpha AI Insight", fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(8.dp))
                if (topExpense != null) {
                    val total = topExpense.value.sumOf { it.amount }
                    Text("Largest $range expense: ${topExpense.key.name.replace('_', ' ')} at ${formatInr(total)}. A 10% reduction would free ${formatInr(total * .10)}.")
                } else Text("No transactions in this $range window. Enable capture or add one manually.")
            } }
        }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text("Upcoming", fontWeight = FontWeight.Bold)
                if (upcoming.isEmpty()) Text("No unpaid reminders. Add EMI, premium, SIP or receivable reminders in Plan.")
                upcoming.forEach { Text("${it.title} • ${formatInr(it.amount)} • ${it.type}") }
            } }
        }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp)) {
                Text("Privacy status", fontWeight = FontWeight.Bold)
                Text("${FinanceStore.transactions.size} total transactions stored locally. No bank password, UPI PIN, ATM PIN or CVV is collected.")
            } }
        }
    }
}

@Composable
private fun MetricGrid(income: Double, expenses: Double, savings: Double, investments: Double) {
    val metrics = listOf("Income" to income, "Expenses" to expenses, "Savings" to savings, "Investments" to investments)
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        metrics.chunked(2).forEach { row ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                row.forEach { (label, value) -> ElevatedCard(Modifier.weight(1f)) { Column(Modifier.padding(16.dp)) {
                    Text(label, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text(formatInr(value), style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                } } }
            }
        }
    }
}

private fun formatInr(value: Double): String = NumberFormat.getCurrencyInstance(Locale("en", "IN")).format(value)
