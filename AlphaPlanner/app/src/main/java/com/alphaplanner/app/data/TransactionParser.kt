package com.alphaplanner.app.data

import com.alphaplanner.app.model.FinanceCategory
import com.alphaplanner.app.model.FinanceTransaction
import com.alphaplanner.app.model.TransactionType

object TransactionParser {
    private val amountRegex = Regex("(?:₹|INR|Rs\\.?)[\\s:]*(\\d[\\d,]*(?:\\.\\d{1,2})?)", RegexOption.IGNORE_CASE)

    fun parse(packageName: String, title: String?, text: String?): FinanceTransaction? {
        val body = listOfNotNull(title, text).joinToString(" ").trim()
        if (body.isBlank()) return null
        val lower = body.lowercase()
        val amount = amountRegex.find(body)?.groupValues?.getOrNull(1)?.replace(",", "")?.toDoubleOrNull() ?: return null
        val type = when {
            listOf("credited", "received", "deposited", "refund", "salary").any(lower::contains) -> TransactionType.CREDIT
            listOf("debited", "spent", "paid", "purchase", "withdrawn", "sent").any(lower::contains) -> TransactionType.DEBIT
            else -> return null
        }
        val bank = when {
            lower.contains("hdfc") -> "HDFC Bank"
            lower.contains("icici") -> "ICICI Bank"
            lower.contains("sbi") || lower.contains("state bank") -> "SBI"
            lower.contains("axis") -> "Axis Bank"
            lower.contains("kotak") -> "Kotak Mahindra Bank"
            lower.contains("indian bank") -> "Indian Bank"
            lower.contains("canara") -> "Canara Bank"
            lower.contains("phonepe") -> "PhonePe"
            lower.contains("gpay") || lower.contains("google pay") -> "Google Pay"
            lower.contains("paytm") -> "Paytm"
            else -> packageName.substringAfterLast('.').replaceFirstChar { it.uppercase() }
        }
        val category = classify(lower, type)
        val merchant = extractMerchant(body, bank)
        return FinanceTransaction(
            id = (System.currentTimeMillis() * 31L + body.hashCode()).let { if (it < 0) -it else it },
            merchant = merchant,
            bank = bank,
            amount = amount,
            type = type,
            category = category,
            timestampLabel = "Captured now"
        )
    }

    private fun classify(text: String, type: TransactionType): FinanceCategory = when {
        text.contains("salary") -> FinanceCategory.SALARY
        text.contains("nps") -> FinanceCategory.NPS
        text.contains("provident fund") || text.contains(" epf") || text.contains(" pf ") -> FinanceCategory.PF
        text.contains("lic") -> FinanceCategory.LIC
        text.contains("insurance") -> FinanceCategory.HEALTH_INSURANCE
        text.contains("emi") || text.contains("loan") -> FinanceCategory.EMI
        listOf("petrol", "diesel", "fuel", "hpcl", "bpcl", "iocl").any(text::contains) -> FinanceCategory.FUEL
        listOf("swiggy", "zomato", "restaurant", "cafe", "hotel").any(text::contains) -> FinanceCategory.FOOD_DINING
        listOf("grocery", "supermarket", "mart", "bigbasket", "zepto", "blinkit").any(text::contains) -> FinanceCategory.GROCERY
        listOf("amazon", "flipkart", "myntra", "shopping").any(text::contains) -> FinanceCategory.SHOPPING
        listOf("electricity", "water bill", "gas bill", "recharge", "broadband").any(text::contains) -> FinanceCategory.UTILITIES
        listOf("mutual fund", "sip", "zerodha", "groww", "investment").any(text::contains) -> FinanceCategory.INVESTMENT
        type == TransactionType.CREDIT -> FinanceCategory.MISCELLANEOUS
        else -> FinanceCategory.MISCELLANEOUS
    }

    private fun extractMerchant(body: String, fallback: String): String {
        val candidates = listOf(" at ", " to ", " from ")
        candidates.forEach { token ->
            val idx = body.lowercase().indexOf(token)
            if (idx >= 0) {
                val part = body.substring(idx + token.length).take(35).trim().trim('.', ',', ';', ':')
                if (part.length >= 2) return part
            }
        }
        return fallback
    }
}
