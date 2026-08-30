package com.alphaplanner.app.ui.screens

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.alphaplanner.app.data.PlannerStore
import java.text.NumberFormat
import java.util.Locale

@Composable
fun GoalsScreen() {
    var showAdd by remember { mutableStateOf(false) }
    val goals = PlannerStore.items.filter { it.type == "Goal" || it.type == "Emergency" }

    LazyColumn(
        modifier = Modifier.fillMaxSize().background(Brush.verticalGradient(listOf(MaterialTheme.colorScheme.background, MaterialTheme.colorScheme.surface.copy(alpha = .45f)))),
        contentPadding = PaddingValues(18.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text("Goals", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.ExtraBold)
                    Text("Plan your dreams and track every milestone", color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                FilledTonalButton(onClick = { showAdd = true }) {
                    Icon(Icons.Default.Add, null, Modifier.size(18.dp)); Spacer(Modifier.width(6.dp)); Text("Add Goal")
                }
            }
        }

        item { GoalSummaryCard("Financial Freedom", PlannerStore.items.filter { it.type == "Investment" }.sumOf { it.amount }, PlannerStore.freedomTarget.value, Icons.Default.RocketLaunch) }
        item { GoalSummaryCard("Emergency Fund", PlannerStore.items.filter { it.type == "Emergency" }.sumOf { it.amount }, PlannerStore.emergencyTarget.value, Icons.Default.HealthAndSafety) }

        if (goals.isEmpty()) {
            item {
                ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(26.dp)) {
                    Column(Modifier.fillMaxWidth().padding(28.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        Box(Modifier.size(58.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primaryContainer), contentAlignment = Alignment.Center) { Icon(Icons.Default.FlagCircle, null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(30.dp)) }
                        Text("No goals yet", fontWeight = FontWeight.Bold)
                        Text("Create your first goal to start tracking progress.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Button(onClick = { showAdd = true }) { Icon(Icons.Default.Add, null); Spacer(Modifier.width(6.dp)); Text("Create Goal") }
                    }
                }
            }
        } else {
            items(goals, key = { it.id }) { goal ->
                GoalRow(goal.title, 0.0, goal.amount.coerceAtLeast(1.0), goal.note, iconForGoal(goal.title)) { PlannerStore.deleteItem(goal.id) }
            }
        }

        item {
            ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("Goal targets", fontWeight = FontWeight.Bold)
                    TargetField("Monthly budget", PlannerStore.monthlyBudget.value, PlannerStore::setBudget)
                    TargetField("Emergency fund target", PlannerStore.emergencyTarget.value, PlannerStore::setEmergency)
                    TargetField("Financial freedom number", PlannerStore.freedomTarget.value, PlannerStore::setFreedom)
                }
            }
        }
    }

    if (showAdd) GoalDialog(
        onDismiss = { showAdd = false },
        onSave = { title, amount, note -> PlannerStore.addItem("Goal", title, amount, note); showAdd = false }
    )
}

@Composable
private fun GoalSummaryCard(title: String, current: Double, target: Double, icon: ImageVector) {
    val fraction = if (target > 0) (current / target).coerceIn(0.0, 1.0).toFloat() else 0f
    val progress by animateFloatAsState(fraction, label = title)
    ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(24.dp)) {
        Column(Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(42.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primaryContainer), contentAlignment = Alignment.Center) { Icon(icon, null, tint = MaterialTheme.colorScheme.primary) }
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f)) { Text(title, fontWeight = FontWeight.Bold); Text("${inr(current)} of ${inr(target)}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant) }
                Text("${(progress * 100).toInt()}%", color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
            }
            LinearProgressIndicator(progress = { progress }, modifier = Modifier.fillMaxWidth().height(9.dp).clip(CircleShape))
        }
    }
}

@Composable
private fun GoalRow(title: String, current: Double, target: Double, note: String, icon: ImageVector, onDelete: () -> Unit) {
    val fraction = if (target > 0) (current / target).coerceIn(0.0,1.0).toFloat() else 0f
    ElevatedCard(Modifier.fillMaxWidth(), shape = RoundedCornerShape(22.dp)) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(40.dp).clip(CircleShape).background(MaterialTheme.colorScheme.secondaryContainer), contentAlignment = Alignment.Center) { Icon(icon, null, tint = MaterialTheme.colorScheme.secondary) }
                Spacer(Modifier.width(10.dp))
                Column(Modifier.weight(1f)) { Text(title, fontWeight = FontWeight.Bold); Text("${inr(current)} of ${inr(target)}", style = MaterialTheme.typography.bodySmall) }
                IconButton(onClick = onDelete) { Icon(Icons.Default.DeleteOutline, "Delete") }
            }
            LinearProgressIndicator(progress = { fraction }, Modifier.fillMaxWidth().height(8.dp).clip(CircleShape))
            if (note.isNotBlank()) Text(note, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

@Composable
private fun TargetField(label: String, value: Double, save: (Double) -> Unit) {
    var text by remember(value) { mutableStateOf(if (value == 0.0) "" else value.toLong().toString()) }
    OutlinedTextField(text, { text = it.filter { c -> c.isDigit() || c == '.' } }, label = { Text(label) }, leadingIcon = { Icon(Icons.Default.CurrencyRupee, null) }, trailingIcon = { TextButton(onClick = { text.toDoubleOrNull()?.let(save) }) { Text("Save") } }, modifier = Modifier.fillMaxWidth(), singleLine = true)
}

@Composable
private fun GoalDialog(onDismiss: () -> Unit, onSave: (String, Double, String) -> Unit) {
    var title by remember { mutableStateOf("") }; var amount by remember { mutableStateOf("") }; var note by remember { mutableStateOf("") }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add financial goal") },
        text = { Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            OutlinedTextField(title, { title = it }, label = { Text("Goal name") }, leadingIcon = { Icon(Icons.Default.Flag, null) })
            OutlinedTextField(amount, { amount = it.filter { c -> c.isDigit() || c == '.' } }, label = { Text("Target amount ₹") }, leadingIcon = { Icon(Icons.Default.CurrencyRupee, null) })
            OutlinedTextField(note, { note = it }, label = { Text("Note") })
        } },
        confirmButton = { Button(onClick = { val a = amount.toDoubleOrNull() ?: 0.0; if (title.isNotBlank() && a > 0) onSave(title, a, note) }) { Text("Save Goal") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } }
    )
}

private fun iconForGoal(title: String): ImageVector = when {
    title.contains("car", true) || title.contains("vehicle", true) -> Icons.Default.DirectionsCar
    title.contains("home", true) || title.contains("house", true) -> Icons.Default.HomeWork
    title.contains("travel", true) || title.contains("vacation", true) -> Icons.Default.Flight
    title.contains("retire", true) -> Icons.Default.Elderly
    else -> Icons.Default.FlagCircle
}

private fun inr(v: Double): String = NumberFormat.getCurrencyInstance(Locale("en", "IN")).format(v)
