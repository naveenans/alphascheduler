package com.alphaplanner.app.ui.screens

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
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
    val health = if (txs.isEmpty()) 0 else (45 + savingsRate / 2 - if (budgetUse > 100) 15 else 0 + if (plannedInvestments > 0) 5 else 0).coerceIn(0, 100)

    val topCategories = txs.filter { it.type == TransactionType.DEBIT }
        .groupBy { it.category }
        .mapValues { e -> e.value.sumOf { it.amount } }
        .entries.sortedByDescending { it.value }.take(5)

    val dailySpend = (6 downTo 0).map { offset ->
        val end = now - offset * 86_400_000L
        val start = end - 86_400_000L
        txs.filter { it.type == TransactionType.DEBIT && it.timestampEpoch in start..end }.sumOf { it.amount }.toFloat()
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize().background(
            Brush.verticalGradient(listOf(MaterialTheme.colorScheme.background, MaterialTheme.colorScheme.surface.copy(alpha = .55f)))
        ),
        contentPadding = PaddingValues(18.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Box(
                    Modifier.size(46.dp).clip(RoundedCornerShape(14.dp)).background(MaterialTheme.colorScheme.primaryContainer),
                    contentAlignment = Alignment.Center
                ) { Icon(Icons.Default.AccountBalanceWallet, null, tint = MaterialTheme.colorScheme.primary) }
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f)) {
                    Text("Alpha Planner", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.ExtraBold)
                    Text("Your money, clearly visualized", color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                AssistChip(onClick = {}, label = { Text("v1.1") }, leadingIcon = { Icon(Icons.Default.AutoGraph, null, Modifier.size(16.dp)) })
            }
        }

        item {
            SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
                listOf("Day", "Week", "Month", "Year").forEachIndexed { index, label ->
                    SegmentedButton(
                        selected = range == label,
                        onClick = { range = label },
                        shape = SegmentedButtonDefaults.itemShape(index, 4)
                    ) { Text(label) }
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(26.dp)) {
                Row(Modifier.padding(20.dp), verticalAlignment = Alignment.CenterVertically) {
                    HealthRing(score = health)
                    Spacer(Modifier.width(18.dp))
                    Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("Financial health", style = MaterialTheme.typography.titleMedium)
                        Text(if (txs.isEmpty()) "Start tracking" else "$health / 100", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.ExtraBold)
                        Text(
                            if (txs.isEmpty()) "Add your first transaction to activate insights."
                            else "Savings rate $savingsRate% • $range view",
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }

        item { MetricGrid(income, expenses, savings, investments) }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Column {
                            Text("Expense trend", fontWeight = FontWeight.Bold)
                            Text("Last 7 days in selected window", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        Icon(Icons.Default.ShowChart, null, tint = MaterialTheme.colorScheme.primary)
                    }
                    if (dailySpend.any { it > 0f }) SpendingLineChart(dailySpend)
                    else EmptyMiniState("No spending data yet", Icons.Default.QueryStats)
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.BarChart, null, tint = MaterialTheme.colorScheme.secondary)
                        Spacer(Modifier.width(8.dp))
                        Text("Top spending categories", fontWeight = FontWeight.Bold)
                    }
                    if (topCategories.isEmpty()) EmptyMiniState("Categories appear after you spend", Icons.Default.Category)
                    else {
                        val max = topCategories.maxOf { it.value }.coerceAtLeast(1.0)
                        topCategories.forEach { entry -> CategoryBar(entry.key.name.replace('_', ' '), entry.value, (entry.value / max).toFloat()) }
                    }
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text("Savings progress", fontWeight = FontWeight.Bold)
                        Text("$savingsRate%", color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
                    }
                    val progress by animateFloatAsState((savingsRate / 100f).coerceIn(0f, 1f), label = "savings")
                    LinearProgressIndicator(progress = { progress }, modifier = Modifier.fillMaxWidth().height(10.dp).clip(CircleShape))
                    Text("Target guide: 20%+ savings rate", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text("Budget pace", fontWeight = FontWeight.Bold)
                    if (normalizedBudget > 0) {
                        val fraction = (expenses / normalizedBudget).coerceIn(0.0, 1.0).toFloat()
                        val animated by animateFloatAsState(fraction, label = "budget")
                        LinearProgressIndicator(progress = { animated }, modifier = Modifier.fillMaxWidth().height(10.dp).clip(CircleShape))
                        Text("${formatInr(expenses)} of ${formatInr(normalizedBudget)} • ${budgetUse}% used")
                    } else {
                        EmptyMiniState("Set a budget in Plan to activate this meter", Icons.Default.Speed)
                    }
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.AutoAwesome, null, tint = MaterialTheme.colorScheme.tertiary)
                        Spacer(Modifier.width(8.dp))
                        Text("Alpha insight", fontWeight = FontWeight.Bold)
                    }
                    val top = topCategories.firstOrNull()
                    Text(
                        when {
                            txs.isEmpty() -> "Your dashboard is clean. Add or capture transactions to generate personalized insights."
                            top != null -> "${top.key.name.replace('_', ' ')} is your largest $range expense at ${formatInr(top.value)}. Cutting 10% would free ${formatInr(top.value * .10)}."
                            else -> "Your tracked cash flow is ready for review."
                        }
                    )
                }
            }
        }

        item {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                StatusCard("Capture", "${FinanceStore.transactions.size} stored", Icons.Default.NotificationsActive, Modifier.weight(1f))
                StatusCard("Privacy", "Local-first", Icons.Default.Shield, Modifier.weight(1f))
            }
        }
    }
}

@Composable
private fun HealthRing(score: Int) {
    val value by animateFloatAsState((score / 100f).coerceIn(0f, 1f), label = "healthRing")
    val primary = MaterialTheme.colorScheme.primary
    val track = MaterialTheme.colorScheme.surfaceVariant
    Box(Modifier.size(96.dp), contentAlignment = Alignment.Center) {
        Canvas(Modifier.fillMaxSize()) {
            drawArc(track, -90f, 360f, false, style = Stroke(10.dp.toPx(), cap = StrokeCap.Round))
            drawArc(primary, -90f, 360f * value, false, style = Stroke(10.dp.toPx(), cap = StrokeCap.Round))
        }
        Icon(if (score > 0) Icons.Default.Favorite else Icons.Default.AddChart, null, tint = primary)
    }
}

@Composable
private fun MetricGrid(income: Double, expenses: Double, savings: Double, investments: Double) {
    val metrics = listOf(
        Triple("Income", income, Icons.Default.SouthWest),
        Triple("Expenses", expenses, Icons.Default.NorthEast),
        Triple("Savings", savings, Icons.Default.Savings),
        Triple("Investments", investments, Icons.Default.TrendingUp)
    )
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        metrics.chunked(2).forEach { row ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                row.forEach { (label, value, icon) ->
                    ElevatedCard(Modifier.weight(1f), shape = RoundedCornerShape(22.dp)) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Box(Modifier.size(34.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primaryContainer), contentAlignment = Alignment.Center) {
                                Icon(icon, null, Modifier.size(18.dp), tint = MaterialTheme.colorScheme.primary)
                            }
                            Text(label, color = MaterialTheme.colorScheme.onSurfaceVariant, style = MaterialTheme.typography.bodySmall)
                            Text(formatInr(value), style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.ExtraBold)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun SpendingLineChart(values: List<Float>) {
    val progress by animateFloatAsState(1f, label = "line")
    val lineColor = MaterialTheme.colorScheme.primary
    val gridColor = MaterialTheme.colorScheme.outline.copy(alpha = .25f)
    Canvas(Modifier.fillMaxWidth().height(130.dp)) {
        repeat(4) { i ->
            val y = size.height * i / 3f
            drawLine(gridColor, Offset(0f, y), Offset(size.width, y), strokeWidth = 1f)
        }
        val max = values.maxOrNull()?.coerceAtLeast(1f) ?: 1f
        val step = if (values.size > 1) size.width / (values.size - 1) else size.width
        val path = Path()
        values.forEachIndexed { index, value ->
            val x = step * index
            val y = size.height - (value / max) * size.height * .86f
            if (index == 0) path.moveTo(x, y) else path.lineTo(x, y)
        }
        drawPath(path, lineColor.copy(alpha = progress), style = Stroke(width = 4f, cap = StrokeCap.Round))
        values.forEachIndexed { index, value ->
            val x = step * index
            val y = size.height - (value / max) * size.height * .86f
            drawCircle(lineColor, 5f, Offset(x, y))
        }
    }
}

@Composable
private fun CategoryBar(label: String, amount: Double, fraction: Float) {
    val animated by animateFloatAsState(fraction.coerceIn(0f, 1f), label = label)
    Column(verticalArrangement = Arrangement.spacedBy(5.dp)) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Text(label.lowercase().replaceFirstChar { it.uppercase() }, style = MaterialTheme.typography.bodyMedium)
            Text(formatInr(amount), fontWeight = FontWeight.SemiBold)
        }
        LinearProgressIndicator(progress = { animated }, modifier = Modifier.fillMaxWidth().height(8.dp).clip(CircleShape))
    }
}

@Composable
private fun EmptyMiniState(text: String, icon: androidx.compose.ui.graphics.vector.ImageVector) {
    Row(Modifier.fillMaxWidth().padding(vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
        Box(Modifier.size(40.dp).clip(CircleShape).background(MaterialTheme.colorScheme.surfaceVariant), contentAlignment = Alignment.Center) {
            Icon(icon, null, tint = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        Spacer(Modifier.width(10.dp))
        Text(text, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
private fun StatusCard(title: String, subtitle: String, icon: androidx.compose.ui.graphics.vector.ImageVector, modifier: Modifier = Modifier) {
    ElevatedCard(modifier, shape = RoundedCornerShape(20.dp)) {
        Row(Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(icon, null, tint = MaterialTheme.colorScheme.primary)
            Spacer(Modifier.width(10.dp))
            Column {
                Text(title, fontWeight = FontWeight.Bold)
                Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}

private fun formatInr(value: Double): String = NumberFormat.getCurrencyInstance(Locale("en", "IN")).format(value)
