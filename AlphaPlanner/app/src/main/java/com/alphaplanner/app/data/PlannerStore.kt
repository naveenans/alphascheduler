package com.alphaplanner.app.data

import android.content.Context
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import org.json.JSONArray
import org.json.JSONObject

object PlannerStore {
    private const val PREFS = "alpha_planner_settings"
    private var context: Context? = null

    data class PlanItem(
        val id: Long,
        val type: String,
        val title: String,
        val amount: Double,
        val note: String = "",
        val dueEpoch: Long = 0L,
        val done: Boolean = false
    )

    val themeMode = mutableStateOf("Dark Black")
    val biometricEnabled = mutableStateOf(false)
    val hapticsEnabled = mutableStateOf(true)
    val reduceMotion = mutableStateOf(false)
    val monthlyBudget = mutableStateOf(50000.0)
    val emergencyTarget = mutableStateOf(300000.0)
    val freedomTarget = mutableStateOf(15000000.0)
    val items = mutableStateListOf<PlanItem>()

    fun init(ctx: Context) {
        if (context != null) return
        context = ctx.applicationContext
        val p = context!!.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
        themeMode.value = p.getString("theme", "Dark Black") ?: "Dark Black"
        biometricEnabled.value = p.getBoolean("biometric", false)
        hapticsEnabled.value = p.getBoolean("haptics", true)
        reduceMotion.value = p.getBoolean("reduceMotion", false)
        monthlyBudget.value = p.getFloat("budget", 50000f).toDouble()
        emergencyTarget.value = p.getFloat("emergency", 300000f).toDouble()
        freedomTarget.value = p.getFloat("freedom", 15000000f).toDouble()
        loadItems(p.getString("items", null))
    }

    fun setTheme(v: String) { themeMode.value = v; save() }
    fun setBiometric(v: Boolean) { biometricEnabled.value = v; save() }
    fun setHaptics(v: Boolean) { hapticsEnabled.value = v; save() }
    fun setReduceMotion(v: Boolean) { reduceMotion.value = v; save() }
    fun setBudget(v: Double) { monthlyBudget.value = v; save() }
    fun setEmergency(v: Double) { emergencyTarget.value = v; save() }
    fun setFreedom(v: Double) { freedomTarget.value = v; save() }

    fun addItem(type: String, title: String, amount: Double, note: String = "", dueEpoch: Long = 0L) {
        items.add(0, PlanItem(System.currentTimeMillis(), type, title, amount, note, dueEpoch))
        save()
    }

    fun toggleDone(id: Long) {
        val index = items.indexOfFirst { it.id == id }
        if (index >= 0) items[index] = items[index].copy(done = !items[index].done)
        save()
    }

    fun deleteItem(id: Long) { items.removeAll { it.id == id }; save() }

    private fun save() {
        val p = context?.getSharedPreferences(PREFS, Context.MODE_PRIVATE) ?: return
        val arr = JSONArray()
        items.forEach { i -> arr.put(JSONObject().apply {
            put("id", i.id); put("type", i.type); put("title", i.title); put("amount", i.amount)
            put("note", i.note); put("due", i.dueEpoch); put("done", i.done)
        }) }
        p.edit()
            .putString("theme", themeMode.value)
            .putBoolean("biometric", biometricEnabled.value)
            .putBoolean("haptics", hapticsEnabled.value)
            .putBoolean("reduceMotion", reduceMotion.value)
            .putFloat("budget", monthlyBudget.value.toFloat())
            .putFloat("emergency", emergencyTarget.value.toFloat())
            .putFloat("freedom", freedomTarget.value.toFloat())
            .putString("items", arr.toString())
            .apply()
    }

    private fun loadItems(raw: String?) {
        if (raw.isNullOrBlank()) return
        runCatching {
            val arr = JSONArray(raw)
            for (x in 0 until arr.length()) {
                val o = arr.getJSONObject(x)
                items.add(PlanItem(o.getLong("id"), o.getString("type"), o.getString("title"), o.getDouble("amount"), o.optString("note"), o.optLong("due"), o.optBoolean("done")))
            }
        }
    }
}
