package com.alphaplanner.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

enum class AlphaThemeMode { DARK_BLACK, LIGHT_WHITE, BLACK_WHITE, RED_BLACK, WHITE_BLUE }

private val Green = Color(0xFF30E77A)
private val DarkBg = Color(0xFF07110B)
private val DarkCard = Color(0xFF101A14)

@Composable
fun AlphaPlannerTheme(
    mode: AlphaThemeMode = if (isSystemInDarkTheme()) AlphaThemeMode.DARK_BLACK else AlphaThemeMode.LIGHT_WHITE,
    content: @Composable () -> Unit
) {
    val colors = when (mode) {
        AlphaThemeMode.DARK_BLACK -> darkColorScheme(primary = Green, background = DarkBg, surface = DarkCard)
        AlphaThemeMode.LIGHT_WHITE -> lightColorScheme(primary = Color(0xFF087A37))
        AlphaThemeMode.BLACK_WHITE -> darkColorScheme(primary = Color.White, background = Color.Black, surface = Color(0xFF121212))
        AlphaThemeMode.RED_BLACK -> darkColorScheme(primary = Color(0xFFFF4D4D), background = Color.Black, surface = Color(0xFF171010))
        AlphaThemeMode.WHITE_BLUE -> lightColorScheme(primary = Color(0xFF2563EB), background = Color(0xFFF8FAFF))
    }
    MaterialTheme(colorScheme = colors, content = content)
}
