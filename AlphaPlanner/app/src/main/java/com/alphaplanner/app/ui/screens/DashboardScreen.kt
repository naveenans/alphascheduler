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
import com.alphaplanner.app.model.FinanceCategory
import com.alphaplanner.app.model.TransactionType
import java.text.NumberFormat
import java.util.Locale

@Composable
fun DashboardScreen() {
    var range by remember { mutableStateOf("Month") }
    val txs = FinanceStore.transactions
    val income = txs.filter { it.type == TransactionType.CREDIT }.sumOf { it.amount }
    val expenses = txs.filter { it.type == TransactionType.DEBIT }.sumOf { it.amount }
    val investments = txs.filter { it.category == FinanceCategory.INVESTMENT || it.category == FinanceCategory.NPS || it.category == FinanceCategory.PF }.sumOf { it.amount }
    val savings = (income - expenses).coerceAtLeast(0.0)
    val savingsRate = if (income > 0) ((savings / income) * 100).toInt().coerceIn(0, 100) else 0
    val health = (45 + savingsRate / 2 - if (expenses > income && income > 0) 15 else 0).coerceIn(0, 100)
    val score by animateIntAsState(health, label = "score")
    val topExpense = txs.filter { it.type == TransactionType.DEBIT }.groupBy { it.category }.maxByOrNull { e -> e.value.sumOf { it.amount } }

    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        item {
            Text("Alpha Planner", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text("v0.2 • Your money. Your plan. Your freedom.", color = MaterialTheme.colorScheme.onSurfaceVariant)
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
                        Text("Savings rate $savingsRate% • $range view")
                    }
                }
            }
        }
        item { MetricGrid(income, expenses, savings, investments) }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp)) {
                Text("Alpha Insight", fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(8.dp))
                if (topExpense != null) {
                    val total = topExpense.value.sumOf { it.amount }
                    Text("Your largest tracked expense category is ${topExpense.key.name.replace('_', ' ')} at ${formatInr(total)}. Review this category first when planning your next savings target.")
                } else {
                    Text("Enable transaction capture or add transactions manually to generate personalized spending insights.")
                }
            }}
        }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp)) {
                Text("Capture status", fontWeight = FontWeight.Bold)
                Text("${txs.size} transactions stored locally on this device.")
                Text("Use Transactions → Enable capture to let Alpha Planner classify supported bank and UPI notifications.")
            }}
        }
    }
}

@Composable
private fun MetricGrid(income: Double, expenses: Double, savings: Double, investments: Double) {
    val metrics = listOf("Income" to income, "Expenses" to expenses, "Savings" to savings, "Investments" to investments)
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        metrics.chunked(2).forEach { row ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                row.forEach { (label, value) ->
                    ElevatedCard(Modifier.weight(1f)) { Column(Modifier.padding(16.dp)) {
                        Text(label, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text(formatInr(value), style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                    }}
                }
            }
        }
    }
}

private fun formatInr(value: Double): String = NumberFormat.getCurrencyInstance(Locale("en", "IN")).format(value)
