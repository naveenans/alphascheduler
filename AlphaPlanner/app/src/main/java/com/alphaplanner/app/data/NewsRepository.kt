package com.alphaplanner.app.data

import android.util.Xml
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.xmlpull.v1.XmlPullParser
import java.net.HttpURLConnection
import java.net.URL

object NewsRepository {
    data class NewsItem(val title: String, val link: String, val source: String, val published: String)

    suspend fun load(topic: String): List<NewsItem> = withContext(Dispatchers.IO) {
        val query = when (topic) {
            "India" -> "India personal finance savings investment mutual funds"
            "Government" -> "RBI SEBI Government India tax PPF NPS EPF finance"
            "Global" -> "global markets economy personal finance investing"
            else -> "India finance savings investing"
        }
        val url = "https://news.google.com/rss/search?q=" + java.net.URLEncoder.encode(query, "UTF-8") + "&hl=en-IN&gl=IN&ceid=IN:en"
        runCatching { parse(url).take(25) }.getOrElse { emptyList() }
    }

    private fun parse(address: String): List<NewsItem> {
        val connection = URL(address).openConnection() as HttpURLConnection
        connection.connectTimeout = 8000; connection.readTimeout = 8000
        connection.setRequestProperty("User-Agent", "AlphaPlanner/1.0")
        connection.inputStream.use { input ->
            val parser = Xml.newPullParser(); parser.setInput(input, null)
            val out = mutableListOf<NewsItem>()
            var event = parser.eventType
            var inItem = false
            var title = ""; var link = ""; var pub = ""; var source = "Finance News"
            while (event != XmlPullParser.END_DOCUMENT) {
                when (event) {
                    XmlPullParser.START_TAG -> when (parser.name) {
                        "item" -> { inItem = true; title = ""; link = ""; pub = ""; source = "Finance News" }
                        "title" -> if (inItem) title = parser.nextText()
                        "link" -> if (inItem) link = parser.nextText()
                        "pubDate" -> if (inItem) pub = parser.nextText()
                        "source" -> if (inItem) source = parser.nextText()
                    }
                    XmlPullParser.END_TAG -> if (parser.name == "item" && inItem) {
                        if (title.isNotBlank()) out.add(NewsItem(title, link, source, pub)); inItem = false
                    }
                }
                event = parser.next()
            }
            return out
        }
    }
}
