package com.example.payment

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

class PaymentIntegration {

    // Ensure this runs on a background thread (e.g., viewModelScope.launch(Dispatchers.IO))
    suspend fun verifyPayment(apiKey: String, baseUrl: String): Boolean = withContext(Dispatchers.IO) {
        try {
            // First, trigger a manual refresh on the backend
            val refreshUrl = URL("$baseUrl/api/verify/manual-refresh")
            val refreshConnection = refreshUrl.openConnection() as HttpURLConnection
            refreshConnection.apply {
                requestMethod = "POST"
                setRequestProperty("x-api-key", apiKey)
                setRequestProperty("Content-Type", "application/json")
            }

            if (refreshConnection.responseCode != 200) {
                return@withContext false
            }

            val refreshResponse = refreshConnection.inputStream.bufferedReader().use { it.readText() }
            val json = JSONObject(refreshResponse)
            
            // Check if any new payments were found
            val count = json.optInt("count", 0)
            return@withContext count > 0

        } catch (e: Exception) {
            e.printStackTrace()
            return@withContext false
        }
    }
}
