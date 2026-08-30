package com.alphaplanner.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.alphaplanner.app.ui.AlphaPlannerApp
import com.alphaplanner.app.ui.theme.AlphaPlannerTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AlphaPlannerTheme { AlphaPlannerApp() }
        }
    }
}
