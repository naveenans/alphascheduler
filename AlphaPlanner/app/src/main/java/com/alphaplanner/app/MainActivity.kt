package com.alphaplanner.app

import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import com.alphaplanner.app.data.FinanceStore
import com.alphaplanner.app.data.PlannerStore
import com.alphaplanner.app.ui.AlphaPlannerApp
import com.alphaplanner.app.ui.theme.AlphaPlannerTheme

class MainActivity : FragmentActivity() {
    private var unlocked by mutableStateOf(false)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        FinanceStore.init(this)
        PlannerStore.init(this)
        unlocked = !PlannerStore.biometricEnabled.value
        setContent {
            AlphaPlannerTheme(PlannerStore.themeMode.value) {
                if (unlocked) AlphaPlannerApp() else LockedScreen { authenticate() }
            }
        }
        if (!unlocked) authenticate()
    }

    private fun authenticate() {
        val manager = BiometricManager.from(this)
        if (manager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_WEAK or BiometricManager.Authenticators.DEVICE_CREDENTIAL) != BiometricManager.BIOMETRIC_SUCCESS) {
            unlocked = true
            return
        }
        val prompt = BiometricPrompt(this, ContextCompat.getMainExecutor(this), object : BiometricPrompt.AuthenticationCallback() {
            override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                super.onAuthenticationSucceeded(result)
                unlocked = true
            }
        })
        val info = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Unlock Alpha Planner")
            .setSubtitle("Protect your financial information")
            .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_WEAK or BiometricManager.Authenticators.DEVICE_CREDENTIAL)
            .build()
        prompt.authenticate(info)
    }
}

@Composable
private fun LockedScreen(onUnlock: () -> Unit) {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        ElevatedCard(Modifier.padding(28.dp)) {
            Column(Modifier.padding(28.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(14.dp)) {
                Icon(Icons.Default.Lock, null, Modifier.size(48.dp))
                Text("Alpha Planner Locked", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
                Text("Your financial data stays on this device unless you explicitly export it.")
                Button(onClick = onUnlock) { Text("Unlock") }
            }
        }
    }
}
