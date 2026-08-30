package com.alphaplanner.app.ui.screens

import android.Manifest
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.alphaplanner.app.data.FinanceStore
import com.alphaplanner.app.data.PlannerStore
import com.alphaplanner.app.data.ReminderScheduler
import com.alphaplanner.app.model.TransactionType
import java.text.NumberFormat
import java.util.Locale
import kotlin.math.pow

@Composable
fun PlanScreen() {
    var section by remember { mutableStateOf("Overview") }
    val sections = listOf("Overview", "Goals", "Invest", "Reminders", "Calculators")
    Column(Modifier.fillMaxSize()) {
        Row(Modifier.horizontalScroll(rememberScrollState()).padding(12.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            sections.forEach { FilterChip(selected = section == it, onClick = { section = it }, label = { Text(it) }) }
        }
        when (section) {
            "Goals" -> GoalsSection()
            "Invest" -> InvestmentSection()
            "Reminders" -> ReminderSection()
            "Calculators" -> CalculatorSection()
            else -> PlanOverview()
        }
    }
}

@Composable
private fun PlanOverview() {
    val tx = FinanceStore.transactions
    val income = tx.filter { it.type == TransactionType.CREDIT }.sumOf { it.amount }
    val spend = tx.filter { it.type == TransactionType.DEBIT }.sumOf { it.amount }
    val invest = PlannerStore.items.filter { it.type == "Investment" }.sumOf { it.amount }
    val goals = PlannerStore.items.filter { it.type == "Goal" }.sumOf { it.amount }
    val emergencySaved = PlannerStore.items.filter { it.type == "Emergency" }.sumOf { it.amount }
    val budget = PlannerStore.monthlyBudget.value
    val freedom = PlannerStore.freedomTarget.value
    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item { Text("Financial Freedom Planner", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold) }
        item { MetricCard("Monthly budget", budget, if (budget > 0) (spend / budget).coerceIn(0.0, 1.0).toFloat() else 0f) }
        item { MetricCard("Emergency fund", PlannerStore.emergencyTarget.value, if (PlannerStore.emergencyTarget.value > 0) (emergencySaved / PlannerStore.emergencyTarget.value).coerceIn(0.0,1.0).toFloat() else 0f) }
        item { MetricCard("Freedom number", freedom, if (freedom > 0) (invest / freedom).coerceIn(0.0,1.0).toFloat() else 0f) }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text("Your position", fontWeight = FontWeight.Bold)
                Text("Recorded income: ${inr(income)}")
                Text("Recorded spending: ${inr(spend)}")
                Text("Tracked investments: ${inr(invest)}")
                Text("Goal commitments: ${inr(goals)}")
                val rate = if (income > 0) (((income - spend) / income) * 100).toInt() else 0
                Text("Savings rate: $rate%")
            } }
        }
    }
}

@Composable
private fun GoalsSection() {
    var show by remember { mutableStateOf(false) }
    val goals = PlannerStore.items.filter { it.type == "Goal" || it.type == "Emergency" }
    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item { Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text("Goals", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold); Button(onClick = { show = true }) { Text("Add") } } }
        items(goals, key = { it.id }) { g -> PlanItemCard(g) }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(16.dp)) {
                Text("Targets", fontWeight = FontWeight.Bold)
                EditableNumber("Monthly budget", PlannerStore.monthlyBudget.value, PlannerStore::setBudget)
                EditableNumber("Emergency target", PlannerStore.emergencyTarget.value, PlannerStore::setEmergency)
                EditableNumber("Financial freedom target", PlannerStore.freedomTarget.value, PlannerStore::setFreedom)
            } }
        }
    }
    if (show) AddPlanItemDialog("Goal", onDismiss = { show = false })
}

@Composable
private fun InvestmentSection() {
    var show by remember { mutableStateOf(false) }
    val investments = PlannerStore.items.filter { it.type == "Investment" }
    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item { Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text("Investments", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold); Button(onClick = { show = true }) { Text("Add") } } }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp)) {
                Text("Portfolio tracked", fontWeight = FontWeight.Bold)
                Text(inr(investments.sumOf { it.amount }), style = MaterialTheme.typography.headlineMedium)
                Text("Mutual funds • Stocks • ETF • FD/RD • PPF/EPF • NPS • Gold • Bonds")
            } }
        }
        items(investments, key = { it.id }) { PlanItemCard(it) }
    }
    if (show) AddPlanItemDialog("Investment", onDismiss = { show = false })
}

@Composable
private fun ReminderSection() {
    val context = LocalContext.current
    var show by remember { mutableStateOf(false) }
    val launcher = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { }
    val reminders = PlannerStore.items.filter { it.type == "Reminder" || it.type == "Receivable" }
    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Column { Text("Payments & Receivables", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold); Text("EMI • cards • rent • LIC • SIP • tax • receivables") }
                Button(onClick = { if (Build.VERSION.SDK_INT >= 33) launcher.launch(Manifest.permission.POST_NOTIFICATIONS); show = true }) { Text("Add") }
            }
        }
        items(reminders, key = { it.id }) { item ->
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(16.dp)) {
                Text(item.title, fontWeight = FontWeight.Bold); Text("${item.type} • ${inr(item.amount)}")
                if (item.dueEpoch > 0) Text("Scheduled reminder enabled")
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    TextButton(onClick = { PlannerStore.toggleDone(item.id) }) { Text(if (item.done) "Mark unpaid" else "Mark paid") }
                    TextButton(onClick = { PlannerStore.deleteItem(item.id) }) { Text("Delete") }
                }
            } }
        }
    }
    if (show) AddReminderDialog(onDismiss = { show = false }) { item -> ReminderScheduler.schedule(context, item) }
}

@Composable
private fun CalculatorSection() {
    var monthly by remember { mutableStateOf("10000") }
    var rate by remember { mutableStateOf("12") }
    var years by remember { mutableStateOf("10") }
    var loan by remember { mutableStateOf("1000000") }
    var loanRate by remember { mutableStateOf("9") }
    var months by remember { mutableStateOf("60") }
    val m = monthly.toDoubleOrNull() ?: 0.0; val r = (rate.toDoubleOrNull() ?: 0.0) / 1200.0; val n = (years.toIntOrNull() ?: 0) * 12
    val sip = if (r > 0 && n > 0) m * (((1 + r).pow(n) - 1) / r) * (1 + r) else m * n
    val p = loan.toDoubleOrNull() ?: 0.0; val lr = (loanRate.toDoubleOrNull() ?: 0.0) / 1200.0; val ln = months.toIntOrNull() ?: 0
    val emi = if (lr > 0 && ln > 0) p * lr * (1 + lr).pow(ln) / ((1 + lr).pow(ln) - 1) else if (ln > 0) p / ln else 0.0
    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item { Text("Financial Calculators", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold) }
        item { ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("SIP / Compound Growth", fontWeight = FontWeight.Bold)
            OutlinedTextField(monthly, { monthly = it }, label = { Text("Monthly investment ₹") })
            OutlinedTextField(rate, { rate = it }, label = { Text("Expected return % p.a.") })
            OutlinedTextField(years, { years = it }, label = { Text("Years") })
            Text("Estimated value: ${inr(sip)}", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
        } } }
        item { ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("EMI Calculator", fontWeight = FontWeight.Bold)
            OutlinedTextField(loan, { loan = it }, label = { Text("Loan ₹") })
            OutlinedTextField(loanRate, { loanRate = it }, label = { Text("Interest % p.a.") })
            OutlinedTextField(months, { months = it }, label = { Text("Months") })
            Text("Monthly EMI: ${inr(emi)}", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
        } } }
    }
}

@Composable
private fun AddPlanItemDialog(type: String, onDismiss: () -> Unit) {
    var title by remember { mutableStateOf("") }; var amount by remember { mutableStateOf("") }; var note by remember { mutableStateOf("") }
    AlertDialog(onDismissRequest = onDismiss, title = { Text("Add $type") }, text = { Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        OutlinedTextField(title, { title = it }, label = { Text(if (type == "Investment") "Asset / product" else "Goal name") })
        OutlinedTextField(amount, { amount = it }, label = { Text("Amount ₹") })
        OutlinedTextField(note, { note = it }, label = { Text("Note / category") })
    } }, confirmButton = { Button(onClick = { val a = amount.toDoubleOrNull() ?: 0.0; if (title.isNotBlank() && a > 0) PlannerStore.addItem(type, title, a, note); onDismiss() }) { Text("Save") } }, dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } })
}

@Composable
private fun AddReminderDialog(onDismiss: () -> Unit, onScheduled: (PlannerStore.PlanItem) -> Unit) {
    var title by remember { mutableStateOf("") }; var amount by remember { mutableStateOf("") }; var days by remember { mutableStateOf("1") }; var receivable by remember { mutableStateOf(false) }
    AlertDialog(onDismissRequest = onDismiss, title = { Text("Add reminder") }, text = { Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        OutlinedTextField(title, { title = it }, label = { Text("EMI / payment / person") })
        OutlinedTextField(amount, { amount = it }, label = { Text("Amount ₹") })
        OutlinedTextField(days, { days = it }, label = { Text("Remind in days") })
        Row { Checkbox(receivable, { receivable = it }); Text("Receivable / money due to me", Modifier.padding(top = 12.dp)) }
    } }, confirmButton = { Button(onClick = {
        val due = System.currentTimeMillis() + (days.toLongOrNull() ?: 1L) * 86_400_000L
        PlannerStore.addItem(if (receivable) "Receivable" else "Reminder", title.ifBlank { "Payment reminder" }, amount.toDoubleOrNull() ?: 0.0, dueEpoch = due)
        PlannerStore.items.firstOrNull()?.let(onScheduled); onDismiss()
    }) { Text("Schedule") } }, dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } })
}

@Composable
private fun PlanItemCard(item: PlannerStore.PlanItem) {
    ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(16.dp)) {
        Text(item.title, fontWeight = FontWeight.Bold); Text("${item.type} • ${inr(item.amount)}"); if (item.note.isNotBlank()) Text(item.note)
        TextButton(onClick = { PlannerStore.deleteItem(item.id) }) { Text("Remove") }
    } }
}

@Composable
private fun MetricCard(label: String, target: Double, progress: Float) {
    ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text(label, fontWeight = FontWeight.Bold); Text(inr(target)) }
        LinearProgressIndicator(progress = { progress }, Modifier.fillMaxWidth())
        Text("${(progress * 100).toInt()}%")
    } }
}

@Composable
private fun EditableNumber(label: String, value: Double, save: (Double) -> Unit) {
    var text by remember(value) { mutableStateOf(value.toLong().toString()) }
    OutlinedTextField(text, { text = it }, label = { Text(label) }, trailingIcon = { TextButton(onClick = { text.toDoubleOrNull()?.let(save) }) { Text("Save") } }, modifier = Modifier.fillMaxWidth())
}

private fun inr(v: Double): String = NumberFormat.getCurrencyInstance(Locale("en", "IN")).format(v)
