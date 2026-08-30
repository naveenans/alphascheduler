package com.alphaplanner.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun AiCoachScreen() {
    var text by remember { mutableStateOf("") }
    Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("Alpha AI", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
        Text("Ask about savings, budgets, debt, investing education or financial freedom.")
        OutlinedTextField(value = text, onValueChange = { text = it }, modifier = Modifier.fillMaxWidth(), placeholder = { Text("How can I save more this month?") })
        Button(onClick = {}, modifier = Modifier.fillMaxWidth()) { Text("Ask Alpha AI") }
        ElevatedCard(Modifier.fillMaxWidth()) { Text("AI connectivity will use an explicit user-consent layer and minimal-data payloads.", Modifier.padding(18.dp)) }
    }
}
