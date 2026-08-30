package com.alphaplanner.app.ui

import androidx.compose.animation.Crossfade
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
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalHapticFeedback
import com.alphaplanner.app.data.PlannerStore
import com.alphaplanner.app.ui.screens.*

enum class AppTab(val label: String) { HOME("Home"), TRANSACTIONS("Transactions"), PLAN("Plan"), NEWS("News"), AI("AI") }

@Composable
fun AlphaPlannerApp() {
    var selected by remember { mutableStateOf(AppTab.HOME) }
    val haptic = LocalHapticFeedback.current
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
                        onClick = {
                            if (PlannerStore.hapticsEnabled.value) haptic.performHapticFeedback(HapticFeedbackType.LongPress)
                            selected = tab
                        },
                        icon = { Icon(icon, tab.label) },
                        label = { Text(tab.label) }
                    )
                }
            }
        }
    ) { padding ->
        Surface(Modifier.padding(padding)) {
            if (PlannerStore.reduceMotion.value) AppContent(selected)
            else Crossfade(targetState = selected, label = "tab") { AppContent(it) }
        }
    }
}

@Composable
private fun AppContent(tab: AppTab) {
    when (tab) {
        AppTab.HOME -> DashboardScreen()
        AppTab.TRANSACTIONS -> TransactionsScreen()
        AppTab.PLAN -> PlanScreen()
        AppTab.NEWS -> NewsScreen()
        AppTab.AI -> AiCoachScreen()
    }
}
