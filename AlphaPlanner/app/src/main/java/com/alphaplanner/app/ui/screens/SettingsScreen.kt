package com.alphaplanner.app.ui.screens

import android.content.Intent
import android.provider.Settings
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.alphaplanner.app.BuildConfig
import com.alphaplanner.app.data.FinanceStore
import com.alphaplanner.app.data.PlannerStore

@Composable
fun SettingsScreen() {
    val context = LocalContext.current
    val themes = listOf("Dark Black", "Light White", "Black & White", "Red & Black", "White & Blue")
    LazyColumn(
        modifier = Modifier.fillMaxSize().background(Brush.verticalGradient(listOf(MaterialTheme.colorScheme.background, MaterialTheme.colorScheme.surface.copy(alpha = .45f)))),
        contentPadding = PaddingValues(18.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Column {
                Text("Settings", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.ExtraBold)
                Text("Customize your Alpha Planner experience", color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(26.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
                    SettingHeader("Appearance", Icons.Default.Palette)
                    themes.forEach { theme ->
                        val selected = PlannerStore.themeMode.value == theme
                        Surface(
                            onClick = { PlannerStore.setTheme(theme) },
                            shape = RoundedCornerShape(18.dp),
                            color = if (selected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = .45f)
                        ) {
                            Row(Modifier.fillMaxWidth().padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
                                Box(Modifier.size(28.dp).clip(CircleShape).background(themeColor(theme)))
                                Spacer(Modifier.width(12.dp))
                                Text(theme, Modifier.weight(1f), fontWeight = if (selected) FontWeight.Bold else FontWeight.Normal)
                                if (selected) Icon(Icons.Default.CheckCircle, null, tint = MaterialTheme.colorScheme.primary)
                            }
                        }
                    }
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(26.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    SettingHeader("Experience", Icons.Default.Tune)
                    SwitchRow("Haptics", "Touch feedback on navigation and actions", Icons.Default.Vibration, PlannerStore.hapticsEnabled.value, PlannerStore::setHaptics)
                    SwitchRow("Animations", "Smooth card, chart and navigation motion", Icons.Default.Animation, !PlannerStore.reduceMotion.value) { PlannerStore.setReduceMotion(!it) }
                    SwitchRow("Biometric lock", "Protect financial data with device security", Icons.Default.Fingerprint, PlannerStore.biometricEnabled.value, PlannerStore::setBiometric)
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(26.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    SettingHeader("Privacy & data", Icons.Default.Shield)
                    ActionRow("Notification capture", "Manage secure transaction notification access", Icons.Default.NotificationsActive) {
                        context.startActivity(Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS))
                    }
                    ActionRow("Data stored locally", "${FinanceStore.transactions.size} transactions on this device", Icons.Default.Storage) {}
                    ActionRow("Export & backup", "Use the Expenses screen to export your transaction CSV", Icons.Default.Backup) {}
                    ActionRow("Currency", "Indian Rupee (₹ / INR)", Icons.Default.CurrencyRupee) {}
                }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(26.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    SettingHeader("About", Icons.Default.Info)
                    ActionRow("Alpha Planner", "Plan Money. Build Wealth. Gain Freedom.", Icons.Default.AccountBalanceWallet) {}
                    ActionRow("Version", BuildConfig.VERSION_NAME, Icons.Default.Tag) {}
                    ActionRow("Secure & private", "No bank password, UPI PIN, ATM PIN or CVV is collected", Icons.Default.VerifiedUser) {}
                }
            }
        }
    }
}

@Composable
private fun SettingHeader(title: String, icon: androidx.compose.ui.graphics.vector.ImageVector) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(Modifier.size(38.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primaryContainer), contentAlignment = Alignment.Center) {
            Icon(icon, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(20.dp))
        }
        Spacer(Modifier.width(10.dp))
        Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
    }
}

@Composable
private fun SwitchRow(title: String, subtitle: String, icon: androidx.compose.ui.graphics.vector.ImageVector, checked: Boolean, onChecked: (Boolean) -> Unit) {
    Row(Modifier.fillMaxWidth().padding(vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
        Icon(icon, null, tint = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(Modifier.width(12.dp))
        Column(Modifier.weight(1f)) {
            Text(title, fontWeight = FontWeight.SemiBold)
            Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        Switch(checked = checked, onCheckedChange = onChecked)
    }
}

@Composable
private fun ActionRow(title: String, subtitle: String, icon: androidx.compose.ui.graphics.vector.ImageVector, onClick: () -> Unit) {
    Surface(onClick = onClick, color = androidx.compose.ui.graphics.Color.Transparent) {
        Row(Modifier.fillMaxWidth().padding(vertical = 12.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(icon, null, tint = MaterialTheme.colorScheme.onSurfaceVariant)
            Spacer(Modifier.width(12.dp))
            Column(Modifier.weight(1f)) {
                Text(title, fontWeight = FontWeight.SemiBold)
                Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Icon(Icons.Default.ChevronRight, null, tint = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

@Composable
private fun themeColor(theme: String): androidx.compose.ui.graphics.Color = when (theme) {
    "Light White" -> androidx.compose.ui.graphics.Color.White
    "Black & White" -> androidx.compose.ui.graphics.Color(0xFF222222)
    "Red & Black" -> androidx.compose.ui.graphics.Color(0xFFE53935)
    "White & Blue" -> androidx.compose.ui.graphics.Color(0xFF1769E0)
    else -> androidx.compose.ui.graphics.Color(0xFF22E36B)
}
