package com.alphaplanner.app.ui.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

private val DarkBlack = darkColorScheme(
    primary = Color(0xFF37F07C),
    onPrimary = Color(0xFF001B08),
    primaryContainer = Color(0xFF0D3A1E),
    onPrimaryContainer = Color(0xFFB8F7C8),
    secondary = Color(0xFF62D5FF),
    tertiary = Color(0xFFB68CFF),
    background = Color(0xFF040706),
    surface = Color(0xFF0C1110),
    surfaceVariant = Color(0xFF151C19),
    onSurface = Color(0xFFF4F8F5),
    onSurfaceVariant = Color(0xFFAAB7B0),
    outline = Color(0xFF2A3731),
    error = Color(0xFFFF665F)
)

private val LightWhite = lightColorScheme(
    primary = Color(0xFF087A44),
    secondary = Color(0xFF006A8A),
    tertiary = Color(0xFF7356B6),
    background = Color(0xFFF5F8F6),
    surface = Color.White,
    surfaceVariant = Color(0xFFEAF0EC),
    onSurface = Color(0xFF111814),
    onSurfaceVariant = Color(0xFF55615A)
)

private val BlackWhite = darkColorScheme(
    primary = Color.White,
    secondary = Color(0xFFD6D6D6),
    background = Color.Black,
    surface = Color(0xFF0E0E0E),
    surfaceVariant = Color(0xFF1A1A1A),
    onPrimary = Color.Black
)

private val RedBlack = darkColorScheme(
    primary = Color(0xFFFF5E57),
    secondary = Color(0xFFFFA19B),
    background = Color(0xFF070303),
    surface = Color(0xFF120909),
    surfaceVariant = Color(0xFF211111)
)

private val WhiteBlue = lightColorScheme(
    primary = Color(0xFF1769E0),
    secondary = Color(0xFF00A0C8),
    tertiary = Color(0xFF6650A4),
    background = Color(0xFFF5F8FF),
    surface = Color.White,
    surfaceVariant = Color(0xFFEAF0FA)
)

private val AlphaShapes = Shapes(
    extraSmall = androidx.compose.foundation.shape.RoundedCornerShape(10.dp),
    small = androidx.compose.foundation.shape.RoundedCornerShape(14.dp),
    medium = androidx.compose.foundation.shape.RoundedCornerShape(20.dp),
    large = androidx.compose.foundation.shape.RoundedCornerShape(26.dp),
    extraLarge = androidx.compose.foundation.shape.RoundedCornerShape(32.dp)
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
    MaterialTheme(
        colorScheme = colors,
        typography = Typography(),
        shapes = AlphaShapes,
        content = content
    )
}
