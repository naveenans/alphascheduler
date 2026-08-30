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
import com.alphaplanner.app.data.DemoFinanceRepository
import java.text.NumberFormat
import java.util.Locale

@Composable
fun DashboardScreen() {
    var range by remember { mutableStateOf("Month") }
    val d = DemoFinanceRepository.snapshot
    val score by animateIntAsState(d.healthScore, label = "score")
    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        item {
            Text("Alpha Planner", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text("Your money. Your plan. Your freedom.", color = MaterialTheme.colorScheme.onSurfaceVariant)
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
                        Text("Savings rate ${d.savingsRate}% • $range view")
                    }
                }
            }
        }
        item { MetricGrid(d.income, d.expenses, d.savings, d.investments) }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp)) {
                Text("Alpha AI Insight", fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(8.dp))
                Text("Dining is trending above your normal level. Cutting ₹2,000 this month would increase your savings rate without changing essential expenses.")
            }}
        }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp)) {
                Text("Upcoming", fontWeight = FontWeight.Bold)
                Text("Car EMI • ₹14,650 • in 3 days")
                Text("LIC Premium • ₹7,800 • in 9 days")
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
