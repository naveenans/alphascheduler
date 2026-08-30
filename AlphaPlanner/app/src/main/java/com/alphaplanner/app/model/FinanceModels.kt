package com.alphaplanner.app.model

enum class TransactionType { CREDIT, DEBIT, INVESTMENT, TRANSFER }

enum class FinanceCategory {
    SALARY, GROCERY, FUEL, MISCELLANEOUS, FOOD_DINING, INVESTMENT,
    LIC, HEALTH_INSURANCE, VEHICLE, GOVERNMENT, NPS, PF, RENT,
    UTILITIES, SHOPPING, MEDICAL, EDUCATION, EMI, SUBSCRIPTION
}

data class FinanceTransaction(
    val id: Long,
    val merchant: String,
    val bank: String,
    val amount: Double,
    val type: TransactionType,
    val category: FinanceCategory,
    val timestampLabel: String
)

data class DashboardSnapshot(
    val income: Double,
    val expenses: Double,
    val savings: Double,
    val investments: Double,
    val healthScore: Int,
    val savingsRate: Int
)
