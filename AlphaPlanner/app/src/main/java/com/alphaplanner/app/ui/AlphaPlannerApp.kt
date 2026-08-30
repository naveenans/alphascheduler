package com.alphaplanner.app.ui

import androidx.compose.animation.Crossfade
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.unit.dp
import com.alphaplanner.app.data.PlannerStore
import com.alphaplanner.app.ui.screens.*

enum class AppTab(val label: String) {
    HOME("Home"), EXPENSES("Expenses"), GOALS("Goals"), AI("AI Coach"), NEWS("News"), SETTINGS("Settings")
}

@Composable
fun AlphaPlannerApp() {
    var selected by remember { mutableStateOf(AppTab.HOME) }
    val haptic = LocalHapticFeedback.current

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        bottomBar = {
            NavigationBar(
                containerColor = MaterialTheme.colorScheme.surface,
                tonalElevation = 12.dp
            ) {
                AppTab.entries.forEach { tab ->
                    val icon = when (tab) {
                        AppTab.HOME -> Icons.Default.Home
                        AppTab.EXPENSES -> Icons.Default.AccountBalanceWallet
                        AppTab.GOALS -> Icons.Default.FlagCircle
                        AppTab.AI -> Icons.Default.AutoAwesome
                        AppTab.NEWS -> Icons.Default.Newspaper
                        AppTab.SETTINGS -> Icons.Default.Settings
                    }
                    NavigationBarItem(
                        selected = selected == tab,
                        onClick = {
                            if (PlannerStore.hapticsEnabled.value) haptic.performHapticFeedback(HapticFeedbackType.LongPress)
                            selected = tab
                        },
                        icon = { Icon(icon, tab.label) },
                        label = { Text(tab.label, style = MaterialTheme.typography.labelSmall) },
                        alwaysShowLabel = selected == tab,
                        colors = NavigationBarItemDefaults.colors(
                            indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                            selectedIconColor = MaterialTheme.colorScheme.primary,
                            selectedTextColor = MaterialTheme.colorScheme.primary,
                            unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                            unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    )
                }
            }
        }
    ) { padding ->
        Surface(Modifier.padding(padding), color = MaterialTheme.colorScheme.background) {
            if (PlannerStore.reduceMotion.value) AppContent(selected) { selected = it }
            else Crossfade(targetState = selected, label = "tabTransition") { tab -> AppContent(tab) { selected = it } }
        }
    }
}

@Composable
private fun AppContent(tab: AppTab, onSelect: (AppTab) -> Unit) {
    when (tab) {
        AppTab.HOME -> DashboardScreen(
            onOpenExpenses = { onSelect(AppTab.EXPENSES) },
            onOpenGoals = { onSelect(AppTab.GOALS) },
            onOpenAi = { onSelect(AppTab.AI) }
        )
        AppTab.EXPENSES -> TransactionsScreen()
        AppTab.GOALS -> GoalsScreen()
        AppTab.AI -> AiCoachScreen()
        AppTab.NEWS -> NewsScreen()
        AppTab.SETTINGS -> SettingsScreen()
    }
}
