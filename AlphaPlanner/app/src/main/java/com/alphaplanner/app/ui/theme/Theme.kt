package com.alphaplanner.app.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkBlack = darkColorScheme(
    primary = Color(0xFF39E58C), secondary = Color(0xFF7CE7B1), background = Color(0xFF050706), surface = Color(0xFF101411), onPrimary = Color.Black
)
private val LightWhite = lightColorScheme(
    primary = Color(0xFF087F5B), secondary = Color(0xFF0B7285), background = Color(0xFFF8FAF9), surface = Color.White
)
private val BlackWhite = darkColorScheme(
    primary = Color.White, secondary = Color(0xFFD0D0D0), background = Color.Black, surface = Color(0xFF111111), onPrimary = Color.Black
)
private val RedBlack = darkColorScheme(
    primary = Color(0xFFFF4D4D), secondary = Color(0xFFFF8A80), background = Color(0xFF080404), surface = Color(0xFF160A0A)
)
private val WhiteBlue = lightColorScheme(
    primary = Color(0xFF1769E0), secondary = Color(0xFF4E8DF5), background = Color(0xFFF7FAFF), surface = Color.White
)

@Composable
fun AlphaPlannerTheme(mode: String = "Dark Black", content: @Composable () -> Unit) {
    val colors = when (mode) {
        "Light White" -> LightWhite
        "Black & White" -> BlackWhite
        "Red & Black" -> RedBlack
        "White & Blue" -> WhiteBlue
        else -> DarkBlack
    }
    MaterialTheme(colorScheme = colors, typography = Typography(), content = content)
}
