package com.alphaplanner.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun NewsScreen() {
    Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("Finance Feed", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
        Text("India • Global • Government • RBI • Tax • Investing")
        ElevatedCard(Modifier.fillMaxWidth()) { Text("Live news API integration is intentionally isolated for Phase 1B.", Modifier.padding(18.dp)) }
    }
}
