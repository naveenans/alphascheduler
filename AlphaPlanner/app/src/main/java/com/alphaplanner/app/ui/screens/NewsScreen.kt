package com.alphaplanner.app.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.alphaplanner.app.data.NewsRepository

@Composable
fun NewsScreen() {
    val context = LocalContext.current
    var topic by remember { mutableStateOf("India") }
    var loading by remember { mutableStateOf(true) }
    var news by remember { mutableStateOf(emptyList<NewsRepository.NewsItem>()) }
    LaunchedEffect(topic) { loading = true; news = NewsRepository.load(topic); loading = false }
    LazyColumn(contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item { Text("Finance Feed", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold); Text("Latest saving, investing, RBI, Government and global finance updates") }
        item { SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
            listOf("India","Government","Global").forEachIndexed { i, t -> SegmentedButton(selected = topic == t, onClick = { topic = t }, shape = SegmentedButtonDefaults.itemShape(i, 3)) { Text(t) } }
        } }
        if (loading) item { LinearProgressIndicator(Modifier.fillMaxWidth()) }
        if (!loading && news.isEmpty()) item { ElevatedCard(Modifier.fillMaxWidth()) { Text("No feed available right now. Check your internet connection and refresh by changing a topic.", Modifier.padding(18.dp)) } }
        items(news) { item ->
            ElevatedCard(onClick = { if (item.link.isNotBlank()) context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(item.link))) }, modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(5.dp)) {
                    Text(item.title, fontWeight = FontWeight.Bold)
                    Text(item.source, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.primary)
                    if (item.published.isNotBlank()) Text(item.published, style = MaterialTheme.typography.labelSmall)
                    Text("Why it matters: review whether this changes your savings, borrowing, tax, insurance or investment plan.", style = MaterialTheme.typography.bodySmall)
                }
            }
        }
    }
}
