package com.alphaplanner.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun PlanScreen() {
    Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Text("Plan", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
        Text("Budgets • Goals • Investments • Freedom Planner")
        ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp)) {
            Text("Emergency Fund", fontWeight = FontWeight.Bold)
            Text("₹2,85,000 / ₹6,00,000")
            LinearProgressIndicator(progress = { .475f }, modifier = Modifier.fillMaxWidth())
        }}
        ElevatedCard(Modifier.fillMaxWidth()) { Column(Modifier.padding(18.dp)) {
            Text("Financial Freedom", fontWeight = FontWeight.Bold)
            Text("Prototype target: ₹3.4 Cr")
            Text("This will become an assumption-driven calculator in Phase 1B.")
        }}
    }
}
