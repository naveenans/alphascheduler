package com.alphaplanner.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.alphaplanner.app.data.DemoFinanceRepository
import com.alphaplanner.app.model.TransactionType
import java.text.NumberFormat
import java.util.Locale

@Composable
fun TransactionsScreen() {
    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item { Text("Transactions", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold) }
        items(DemoFinanceRepository.transactions) { tx ->
            ElevatedCard(Modifier.fillMaxWidth()) {
                Row(Modifier.padding(16.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                    Column(Modifier.weight(1f)) {
                        Text(tx.merchant, fontWeight = FontWeight.Bold)
                        Text("${tx.bank} • ${tx.category.name.replace('_', ' ')}", style = MaterialTheme.typography.bodySmall)
                        Text(tx.timestampLabel, style = MaterialTheme.typography.labelSmall)
                    }
                    val prefix = if (tx.type == TransactionType.CREDIT) "+" else "−"
                    Text(prefix + NumberFormat.getCurrencyInstance(Locale("en", "IN")).format(tx.amount), fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
