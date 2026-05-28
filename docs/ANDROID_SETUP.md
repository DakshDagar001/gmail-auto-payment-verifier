# Android Integration Guide

This guide explains how to integrate the Payment Verifier into your Android app (Kotlin).

## Method: Direct API Call

Since your Android app needs to know if a payment was successful, it can poll the backend API.

### 1. Update AndroidManifest.xml
Ensure you have internet permissions:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### 2. Network Call Implementation
We provided an example in `src/examples/android/PaymentIntegration.kt`.

### 3. Usage in ViewModel / Activity
```kotlin
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

class CheckoutActivity : AppCompatActivity() {
    
    fun onPaymentCompletedLocally() {
        // User clicked "I have paid"
        
        lifecycleScope.launch {
            val integration = PaymentIntegration()
            
            // Show loading spinner
            val isVerified = integration.verifyPayment(
                apiKey = "your_super_secret_api_key_here",
                baseUrl = "https://your-app.up.railway.app"
            )
            
            if (isVerified) {
                // Unlock game item / add coins
                unlockPremiumFeature()
            } else {
                // Show error: "Payment not detected yet, please wait a minute and try again."
            }
        }
    }
}
```

### Security Warning
Do not hardcode `apiKey` in your Android APK if possible. It is better to have an intermediate secure backend, or obfuscate it.
