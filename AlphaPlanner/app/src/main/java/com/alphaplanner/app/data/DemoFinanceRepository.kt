package com.alphaplanner.app.data

import com.alphaplanner.app.model.*

object DemoFinanceRepository {
    val snapshot = DashboardSnapshot(
        income = 125000.0,
        expenses = 62450.0,
        savings = 37550.0,
        investments = 25000.0,
        healthScore = 82,
        savingsRate = 30
    )

    val transactions = listOf(
        FinanceTransaction(1, "Salary", "HDFC Bank", 125000.0, TransactionType.CREDIT, FinanceCategory.SALARY, "Today • 09:02"),
        FinanceTransaction(2, "Indian Oil", "ICICI Bank", 1850.0, TransactionType.DEBIT, FinanceCategory.FUEL, "Today • 08:15"),
        FinanceTransaction(3, "Swiggy", "HDFC Bank", 620.0, TransactionType.DEBIT, FinanceCategory.FOOD_DINING, "Yesterday • 20:41"),
        FinanceTransaction(4, "SIP", "SBI", 10000.0, TransactionType.INVESTMENT, FinanceCategory.INVESTMENT, "Yesterday • 07:00")
    )
}
