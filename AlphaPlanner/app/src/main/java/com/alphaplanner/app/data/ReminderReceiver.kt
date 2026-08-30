package com.alphaplanner.app.data

import android.app.*
import android.content.*
import android.os.Build
import androidx.core.app.NotificationCompat
import com.alphaplanner.app.MainActivity

class ReminderReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val channelId = "alpha_finance_reminders"
        val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            nm.createNotificationChannel(NotificationChannel(channelId, "Finance reminders", NotificationManager.IMPORTANCE_DEFAULT))
        }
        val title = intent.getStringExtra("title") ?: "Alpha Planner reminder"
        val amount = intent.getDoubleExtra("amount", 0.0)
        val contentIntent = PendingIntent.getActivity(context, 0, Intent(context, MainActivity::class.java), PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        val notification = NotificationCompat.Builder(context, channelId)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(if (amount > 0) "₹%,.0f is due. Tap to review.".format(amount) else "Tap to review your finance plan.")
            .setAutoCancel(true)
            .setContentIntent(contentIntent)
            .build()
        nm.notify((System.currentTimeMillis() % Int.MAX_VALUE).toInt(), notification)
    }
}

object ReminderScheduler {
    fun schedule(context: Context, item: PlannerStore.PlanItem) {
        if (item.dueEpoch <= System.currentTimeMillis()) return
        val intent = Intent(context, ReminderReceiver::class.java).apply {
            putExtra("title", item.title); putExtra("amount", item.amount)
        }
        val pi = PendingIntent.getBroadcast(context, (item.id % Int.MAX_VALUE).toInt(), intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        val alarm = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        alarm.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, item.dueEpoch, pi)
    }
}
