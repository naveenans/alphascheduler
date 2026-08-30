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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.alphaplanner.app.data.FinanceStore
import com.alphaplanner.app.data.PlannerStore
import com.alphaplanner.app.model.FinanceCategory
import com.alphaplanner.app.model.TransactionType
import java.text.NumberFormat
import java.util.Calendar
import java.util.Locale

@Composable
fun DashboardScreen(
    onOpenExpenses: () -> Unit = {},
    onOpenGoals: () -> Unit = {},
    onOpenAi: () -> Unit = {}
) {
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
    val netWorth = savings + investments
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

    val reminders = PlannerStore.items.filter { (it.type == "Reminder" || it.type == "Receivable") && !it.done }
        .sortedBy { if (it.dueEpoch > 0) it.dueEpoch else Long.MAX_VALUE }.take(3)

    LazyColumn(
        modifier = Modifier.fillMaxSize().background(
            Brush.verticalGradient(listOf(MaterialTheme.colorScheme.background, MaterialTheme.colorScheme.surface.copy(alpha = .58f)))
        ),
        contentPadding = PaddingValues(18.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text("${greeting()}! 👋", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.ExtraBold)
                    Text("Welcome to Alpha Planner", color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                IconButton(onClick = {}) {
                    BadgedBox(badge = { if (reminders.isNotEmpty()) Badge { Text(reminders.size.toString()) } }) {
                        Icon(Icons.Default.NotificationsNone, "Reminders")
                    }
                }
            }
        }

        item {
            SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
                listOf("Day", "Week", "Month", "Year").forEachIndexed { index, label ->
                    SegmentedButton(selected = range == label, onClick = { range = label }, shape = SegmentedButtonDefaults.itemShape(index, 4)) { Text(label) }
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(26.dp)) {
                Row(Modifier.padding(20.dp), verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("Financial Health Score", style = MaterialTheme.typography.titleMedium)
                        Text(if (txs.isEmpty()) "0 / 100" else "$health / 100", style = MaterialTheme.typography.displaySmall, fontWeight = FontWeight.ExtraBold)
                        Text(if (txs.isEmpty()) "Add your first transaction to begin" else healthMessage(health), color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.SemiBold)
                    }
                    HealthRing(score = health)
                }
            }
        }

        item { MetricGrid(income, expenses, savings, investments) }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text("Savings Rate", fontWeight = FontWeight.Bold)
                        Text("Target 20%", color = MaterialTheme.colorScheme.onSurfaceVariant, style = MaterialTheme.typography.bodySmall)
                    }
                    Text("$savingsRate%", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.ExtraBold)
                    val progress by animateFloatAsState((savingsRate / 100f).coerceIn(0f, 1f), label = "savings")
                    LinearProgressIndicator(progress = { progress }, modifier = Modifier.fillMaxWidth().height(10.dp).clip(CircleShape))
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Column { Text("Net Worth", fontWeight = FontWeight.Bold); Text(formatInr(netWorth), style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.ExtraBold, color = MaterialTheme.colorScheme.primary) }
                        Icon(Icons.Default.AutoGraph, null, tint = MaterialTheme.colorScheme.primary)
                    }
                    if (dailySpend.any { it > 0f }) SpendingLineChart(dailySpend) else EmptyMiniState("Your net-worth trend will appear as data grows", Icons.Default.ShowChart)
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Column { Text("Expense Overview", fontWeight = FontWeight.Bold); Text("$range spending", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant) }
                        Text(formatInr(expenses), style = MaterialTheme.typography.titleLarge, color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.ExtraBold)
                    }
                    if (dailySpend.any { it > 0f }) SpendingLineChart(dailySpend) else EmptyMiniState("No expenses yet", Icons.Default.QueryStats)
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("Top Categories", fontWeight = FontWeight.Bold)
                    if (topCategories.isEmpty()) EmptyMiniState("Add your first expense to see category breakdown", Icons.Default.Category)
                    else {
                        val max = topCategories.maxOf { it.value }.coerceAtLeast(1.0)
                        topCategories.forEach { entry -> CategoryBar(entry.key.name.replace('_', ' '), entry.value, (entry.value / max).toFloat()) }
                    }
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("Quick Actions", fontWeight = FontWeight.Bold)
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        QuickAction("Expense", Icons.Default.ReceiptLong, onOpenExpenses, Modifier.weight(1f))
                        QuickAction("Goal", Icons.Default.FlagCircle, onOpenGoals, Modifier.weight(1f))
                        QuickAction("AI Coach", Icons.Default.AutoAwesome, onOpenAi, Modifier.weight(1f))
                    }
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text("Upcoming Reminders", fontWeight = FontWeight.Bold)
                        Text("${reminders.size} active", color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.bodySmall)
                    }
                    if (reminders.isEmpty()) EmptyMiniState("No upcoming reminders — you're all caught up", Icons.Default.EventAvailable)
                    else reminders.forEach { r ->
                        Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                            Box(Modifier.size(40.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primaryContainer), contentAlignment = Alignment.Center) { Icon(Icons.Default.CalendarMonth, null, tint = MaterialTheme.colorScheme.primary) }
                            Spacer(Modifier.width(10.dp))
                            Column(Modifier.weight(1f)) { Text(r.title, fontWeight = FontWeight.SemiBold); Text("${r.type} • ${formatInr(r.amount)}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant) }
                            Icon(Icons.Default.ChevronRight, null, tint = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text("Budget Tracking", fontWeight = FontWeight.Bold)
                    if (normalizedBudget > 0) {
                        val fraction = (expenses / normalizedBudget).coerceIn(0.0, 1.0).toFloat()
                        val animated by animateFloatAsState(fraction, label = "budget")
                        LinearProgressIndicator(progress = { animated }, modifier = Modifier.fillMaxWidth().height(10.dp).clip(CircleShape))
                        Text("${formatInr(expenses)} of ${formatInr(normalizedBudget)} • ${budgetUse}% used")
                    } else EmptyMiniState("Set your first budget in Goals", Icons.Default.Speed)
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) { Icon(Icons.Default.AutoAwesome, null, tint = MaterialTheme.colorScheme.tertiary); Spacer(Modifier.width(8.dp)); Text("Alpha AI Insight", fontWeight = FontWeight.Bold) }
                    val top = topCategories.firstOrNull()
                    Text(when {
                        txs.isEmpty() -> "Your dashboard is clean. Add or capture transactions to unlock personalized financial insights."
                        top != null -> "${top.key.name.replace('_', ' ')} is your largest $range expense at ${formatInr(top.value)}. Cutting 10% could free ${formatInr(top.value * .10)} for savings or investment."
                        else -> "Your tracked cash flow is ready for review."
                    })
                    TextButton(onClick = onOpenAi) { Text("Chat with Alpha AI"); Spacer(Modifier.width(6.dp)); Icon(Icons.Default.ArrowForward, null, Modifier.size(18.dp)) }
                }
            }
        }
    }
}

@Composable
private fun HealthRing(score: Int) {
    val value by animateFloatAsState((score / 100f).coerceIn(0f, 1f), label = "healthRing")
    val primary = MaterialTheme.colorScheme.primary
    val track = MaterialTheme.colorScheme.surfaceVariant
    Box(Modifier.size(104.dp), contentAlignment = Alignment.Center) {
        Canvas(Modifier.fillMaxSize()) {
            drawArc(track, -90f, 360f, false, style = Stroke(11.dp.toPx(), cap = StrokeCap.Round))
            drawArc(primary, -90f, 360f * value, false, style = Stroke(11.dp.toPx(), cap = StrokeCap.Round))
        }
        Icon(if (score > 0) Icons.Default.Favorite else Icons.Default.AddChart, null, tint = primary, modifier = Modifier.size(30.dp))
    }
}

@Composable
private fun MetricGrid(income: Double, expenses: Double, savings: Double, investments: Double) {
    val metrics = listOf(
        Triple("Income", income, Icons.Default.AccountBalance),
        Triple("Expenses", expenses, Icons.Default.ReceiptLong),
        Triple("Savings", savings, Icons.Default.Savings),
        Triple("Investments", investments, Icons.Default.TrendingUp)
    )
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        metrics.chunked(2).forEach { row ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                row.forEach { (label, value, icon) ->
                    ElevatedCard(Modifier.weight(1f), shape = RoundedCornerShape(22.dp)) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Box(Modifier.size(36.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primaryContainer), contentAlignment = Alignment.Center) { Icon(icon, null, Modifier.size(19.dp), tint = MaterialTheme.colorScheme.primary) }
                            Text(label, color = MaterialTheme.colorScheme.onSurfaceVariant, style = MaterialTheme.typography.bodySmall)
                            Text(formatInr(value), style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.ExtraBold)
                            Text(if (label == "Investments") "Total value" else "This ${labelForPeriod()}", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun QuickAction(label: String, icon: ImageVector, onClick: () -> Unit, modifier: Modifier = Modifier) {
    Surface(onClick = onClick, modifier = modifier, shape = RoundedCornerShape(18.dp), color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = .55f)) {
        Column(Modifier.padding(vertical = 14.dp, horizontal = 8.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(7.dp)) {
            Box(Modifier.size(38.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primaryContainer), contentAlignment = Alignment.Center) { Icon(icon, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(20.dp)) }
            Text(label, style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.SemiBold)
        }
    }
}

@Composable
private fun SpendingLineChart(values: List<Float>) {
    val lineColor = MaterialTheme.colorScheme.primary
    val secondary = MaterialTheme.colorScheme.tertiary
    val gridColor = MaterialTheme.colorScheme.outline.copy(alpha = .18f)
    Canvas(Modifier.fillMaxWidth().height(132.dp)) {
        repeat(4) { i -> val y = size.height * i / 3f; drawLine(gridColor, Offset(0f, y), Offset(size.width, y), strokeWidth = 1f) }
        val max = values.maxOrNull()?.coerceAtLeast(1f) ?: 1f
        val step = if (values.size > 1) size.width / (values.size - 1) else size.width
        val path = Path()
        values.forEachIndexed { index, value ->
            val x = step * index; val y = size.height - (value / max) * size.height * .84f
            if (index == 0) path.moveTo(x, y) else path.lineTo(x, y)
        }
        drawPath(path, lineColor, style = Stroke(width = 4f, cap = StrokeCap.Round))
        values.forEachIndexed { index, value -> val x = step * index; val y = size.height - (value / max) * size.height * .84f; drawCircle(if (index == values.lastIndex) secondary else lineColor, 5f, Offset(x, y)) }
    }
}

@Composable
private fun CategoryBar(label: String, amount: Double, fraction: Float) {
    val animated by animateFloatAsState(fraction.coerceIn(0f, 1f), label = label)
    Column(verticalArrangement = Arrangement.spacedBy(5.dp)) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text(label.lowercase().replaceFirstChar { it.uppercase() }); Text(formatInr(amount), fontWeight = FontWeight.SemiBold) }
        LinearProgressIndicator(progress = { animated }, modifier = Modifier.fillMaxWidth().height(8.dp).clip(CircleShape))
    }
}

@Composable
private fun EmptyMiniState(text: String, icon: ImageVector) {
    Row(Modifier.fillMaxWidth().padding(vertical = 12.dp), verticalAlignment = Alignment.CenterVertically) {
        Box(Modifier.size(42.dp).clip(CircleShape).background(MaterialTheme.colorScheme.surfaceVariant), contentAlignment = Alignment.Center) { Icon(icon, null, tint = MaterialTheme.colorScheme.onSurfaceVariant) }
        Spacer(Modifier.width(10.dp)); Text(text, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

private fun greeting(): String = when (Calendar.getInstance().get(Calendar.HOUR_OF_DAY)) { in 5..11 -> "Good Morning"; in 12..16 -> "Good Afternoon"; else -> "Good Evening" }
private fun healthMessage(score: Int): String = when { score >= 80 -> "Great going!"; score >= 60 -> "Good progress"; score >= 40 -> "Building momentum"; else -> "Let's improve together" }
private fun labelForPeriod(): String = "period"
private fun formatInr(value: Double): String = NumberFormat.getCurrencyInstance(Locale("en", "IN")).format(value)
