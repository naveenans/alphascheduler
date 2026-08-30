package com.alphaplanner.app.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Newspaper
import androidx.compose.material.icons.filled.Payments
import androidx.compose.material.icons.filled.TrackChanges
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.alphaplanner.app.ui.screens.*

enum class AppTab(val label: String) { HOME("Home"), TRANSACTIONS("Transactions"), PLAN("Plan"), NEWS("News"), AI("AI") }

@Composable
fun AlphaPlannerApp() {
    var selected by remember { mutableStateOf(AppTab.HOME) }
    Scaffold(
        bottomBar = {
            NavigationBar {
                AppTab.entries.forEach { tab ->
                    val icon = when (tab) {
                        AppTab.HOME -> Icons.Default.Home
                        AppTab.TRANSACTIONS -> Icons.Default.Payments
                        AppTab.PLAN -> Icons.Default.TrackChanges
                        AppTab.NEWS -> Icons.Default.Newspaper
                        AppTab.AI -> Icons.Default.AutoAwesome
                    }
                    NavigationBarItem(
                        selected = selected == tab,
                        onClick = { selected = tab },
                        icon = { Icon(icon, tab.label) },
                        label = { Text(tab.label) }
                    )
                }
            }
        }
    ) { padding ->
        Surface(Modifier.padding(padding)) {
            when (selected) {
                AppTab.HOME -> DashboardScreen()
                AppTab.TRANSACTIONS -> TransactionsScreen()
                AppTab.PLAN -> PlanScreen()
                AppTab.NEWS -> NewsScreen()
                AppTab.AI -> AiCoachScreen()
            }
        }
    }
}
