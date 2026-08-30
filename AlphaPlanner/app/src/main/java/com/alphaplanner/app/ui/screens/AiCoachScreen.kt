package com.alphaplanner.app.ui.screens

import android.content.Intent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.alphaplanner.app.data.FinanceStore
import com.alphaplanner.app.data.PlannerStore
import com.alphaplanner.app.model.FinanceCategory
import com.alphaplanner.app.model.TransactionType
import java.text.NumberFormat
import java.util.Locale

@Composable
fun AiCoachScreen() {
    val context = LocalContext.current
    var question by remember { mutableStateOf("") }
    var answer by remember { mutableStateOf("") }
    val tx = FinanceStore.transactions
    val income = tx.filter { it.type == TransactionType.CREDIT }.sumOf { it.amount }
    val expense = tx.filter { it.type == TransactionType.DEBIT }.sumOf { it.amount }
    val dining = tx.filter { it.category == FinanceCategory.FOOD_DINING }.sumOf { it.amount }
    val shopping = tx.filter { it.category == FinanceCategory.SHOPPING }.sumOf { it.amount }
    val saving = (income - expense).coerceAtLeast(0.0)
    val rate = if (income > 0) saving / income * 100 else 0.0
    val autoInsight = when {
        income <= 0 -> "Start by recording salary/income. Alpha AI needs cash-flow data before it can estimate your savings capacity."
        rate < 10 -> "Your recorded savings rate is ${rate.toInt()}%. Aim first for 10–15% by cutting discretionary categories before increasing investment risk."
        dining + shopping > expense * 0.25 -> "Dining + shopping form a large share of recorded spending. A 15% reduction here would free roughly ${inr((dining + shopping) * .15)}."
        else -> "Your recorded savings rate is ${rate.toInt()}%. Keep an emergency fund and automate long-term investing before increasing lifestyle spending."
    }

    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item { Text("Alpha AI", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold); Text("Private on-device financial coach") }
        item { ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp)) { Text("Today’s insight", fontWeight = FontWeight.Bold); Spacer(Modifier.height(6.dp)); Text(autoInsight) } } }
        item {
            ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Ask about your money", fontWeight = FontWeight.Bold)
                OutlinedTextField(question, { question = it }, label = { Text("e.g. How can I save more?") }, modifier = Modifier.fillMaxWidth())
                Button(onClick = { answer = coach(question, income, expense, rate, dining, shopping) }) { Text("Ask Alpha AI") }
                if (answer.isNotBlank()) Text(answer)
                Text("Educational guidance only; not regulated investment advice.", style = MaterialTheme.typography.labelSmall)
            } }
        }
        item { SettingsCard(onExport = {
            val csv = buildString { append("Date,Merchant,Bank,Type,Category,Amount\n"); FinanceStore.transactions.forEach { t -> append("${t.timestampLabel},${t.merchant.replace(","," ")},${t.bank},${t.type},${t.category},${t.amount}\n") } }
            val send = Intent(Intent.ACTION_SEND).apply { type = "text/csv"; putExtra(Intent.EXTRA_SUBJECT, "Alpha Planner transaction export"); putExtra(Intent.EXTRA_TEXT, csv) }
            context.startActivity(Intent.createChooser(send, "Export Alpha Planner data"))
        }) }
    }
}

private fun coach(q: String, income: Double, expense: Double, rate: Double, dining: Double, shopping: Double): String {
    val s = q.lowercase()
    return when {
        "emergency" in s -> "A practical emergency target is 3–6 months of essential expenses. Your app target is ${inr(PlannerStore.emergencyTarget.value)}; build it in liquid, low-volatility instruments before depending on market investments."
        "invest" in s || "sip" in s -> "With recorded income ${inr(income)} and spending ${inr(expense)}, your current recorded surplus is ${inr((income-expense).coerceAtLeast(0.0))}. Prioritize emergency reserves and high-cost debt, then automate diversified long-term investing aligned with your risk and time horizon."
        "save" in s || "spend" in s -> "Your recorded savings rate is ${rate.toInt()}%. Dining is ${inr(dining)} and shopping is ${inr(shopping)}. Set category caps and route the saved amount automatically on salary day."
        "freedom" in s || "independence" in s -> "Your current freedom target is ${inr(PlannerStore.freedomTarget.value)}. Track annual expenses, keep the target inflation-aware, and grow the gap between income and lifestyle spending consistently."
        "insurance" in s -> "Separate protection from investing: review adequate term life cover for dependants, health insurance for medical risk, and vehicle cover where applicable. Track renewal reminders in Plan → Reminders."
        "loan" in s || "emi" in s -> "Compare your loan rate with expected low-risk returns. High-cost debt usually deserves priority. Use the EMI calculator in Plan and set every EMI as a reminder to avoid penalties."
        else -> "Based on your recorded data: income ${inr(income)}, expenses ${inr(expense)}, savings rate ${rate.toInt()}%. Focus on cash-flow visibility, emergency reserves, insurance, controlled debt and automated long-term investing. Ask me specifically about saving, SIP, EMI, emergency fund, insurance or financial freedom."
    }
}

@Composable
private fun SettingsCard(onExport: () -> Unit) {
    val themes = listOf("Dark Black","Light White","Black & White","Red & Black","White & Blue")
    ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Settings, Privacy & Security", fontWeight = FontWeight.Bold)
        Text("Theme", style = MaterialTheme.typography.labelMedium)
        themes.forEach { t -> Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text(t, Modifier.padding(top = 12.dp)); RadioButton(selected = PlannerStore.themeMode.value == t, onClick = { PlannerStore.setTheme(t) }) } }
        HorizontalDivider()
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text("Biometric / device lock", Modifier.padding(top = 12.dp)); Switch(PlannerStore.biometricEnabled.value, { PlannerStore.setBiometric(it) }) }
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text("Haptic feedback", Modifier.padding(top = 12.dp)); Switch(PlannerStore.hapticsEnabled.value, { PlannerStore.setHaptics(it) }) }
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text("Reduce motion", Modifier.padding(top = 12.dp)); Switch(PlannerStore.reduceMotion.value, { PlannerStore.setReduceMotion(it) }) }
        Button(onClick = onExport, modifier = Modifier.fillMaxWidth()) { Text("Export transactions as CSV") }
        Text("No banking password, UPI PIN, ATM PIN or CVV is requested or stored. Transaction capture uses Android notification access only after you enable it.", style = MaterialTheme.typography.bodySmall)
    } }
}

private fun inr(v: Double): String = NumberFormat.getCurrencyInstance(Locale("en", "IN")).format(v)
