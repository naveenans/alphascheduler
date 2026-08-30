package com.alphaplanner.app.data

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification

class BankNotificationListener : NotificationListenerService() {
    override fun onCreate() {
        super.onCreate()
        FinanceStore.init(applicationContext)
    }

    override fun onNotificationPosted(sbn: StatusBarNotification?) {
        val n = sbn?.notification ?: return
        val extras = n.extras
        val title = extras.getCharSequence("android.title")?.toString()
        val text = extras.getCharSequence("android.text")?.toString()
        val tx = TransactionParser.parse(sbn.packageName, title, text) ?: return
        FinanceStore.add(tx)
    }
}
