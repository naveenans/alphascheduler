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
        if (listOf("otp", "one time password", "verification code").any(lower::contains)) return null
        val amount = amountRegex.find(body)?.groupValues?.getOrNull(1)?.replace(",", "")?.toDoubleOrNull() ?: return null
        val type = when {
            listOf("reversal", "reversed").any(lower::contains) -> TransactionType.REVERSAL
            listOf("refund", "refunded").any(lower::contains) -> TransactionType.REFUND
            listOf("credited", "received", "deposited", "salary credit").any(lower::contains) -> TransactionType.CREDIT
            listOf("debited", "spent", "paid", "purchase", "withdrawn", "sent", "txn of").any(lower::contains) -> TransactionType.DEBIT
            else -> return null
        }
        val bank = detectBank(lower, packageName)
        val category = classify(lower, type)
        val merchant = extractMerchant(body, bank)
        val now = System.currentTimeMillis()
        return FinanceTransaction(
            id = (now * 31L + body.hashCode()).let { if (it < 0) -it else it },
            merchant = merchant,
            bank = bank,
            amount = amount,
            type = type,
            category = category,
            timestampLabel = "Captured now",
            timestampEpoch = now
        )
    }

    private fun detectBank(text: String, packageName: String): String = when {
        "hdfc" in text -> "HDFC Bank"
        "icici" in text -> "ICICI Bank"
        "sbi" in text || "state bank" in text -> "SBI"
        "axis" in text -> "Axis Bank"
        "kotak" in text -> "Kotak Mahindra Bank"
        "indian bank" in text -> "Indian Bank"
        "canara" in text -> "Canara Bank"
        "union bank" in text -> "Union Bank of India"
        "bank of baroda" in text || "bob" in text -> "Bank of Baroda"
        "pnb" in text || "punjab national" in text -> "Punjab National Bank"
        "idfc" in text -> "IDFC FIRST Bank"
        "indusind" in text -> "IndusInd Bank"
        "yes bank" in text -> "YES Bank"
        "federal bank" in text -> "Federal Bank"
        "rbl" in text -> "RBL Bank"
        "bank of india" in text -> "Bank of India"
        "phonepe" in text -> "PhonePe"
        "gpay" in text || "google pay" in text -> "Google Pay"
        "paytm" in text -> "Paytm"
        "amazon pay" in text -> "Amazon Pay"
        else -> packageName.substringAfterLast('.').replaceFirstChar { it.uppercase() }
    }

    private fun classify(text: String, type: TransactionType): FinanceCategory = when {
        "salary" in text || "payroll" in text -> FinanceCategory.SALARY
        "nps" in text -> FinanceCategory.NPS
        "provident fund" in text || " epf" in text || " pf " in text -> FinanceCategory.PF
        "income tax" in text || "gst" in text || "tax payment" in text -> FinanceCategory.TAX
        "lic" in text -> FinanceCategory.LIC
        "term insurance" in text -> FinanceCategory.TERM_INSURANCE
        "vehicle insurance" in text || "motor insurance" in text -> FinanceCategory.VEHICLE_INSURANCE
        "insurance" in text -> FinanceCategory.HEALTH_INSURANCE
        "emi" in text || "loan" in text -> FinanceCategory.EMI
        listOf("petrol", "diesel", "fuel", "hpcl", "bpcl", "iocl", "indian oil").any(text::contains) -> FinanceCategory.FUEL
        listOf("swiggy", "zomato", "restaurant", "cafe", "dominos", "mcdonald").any(text::contains) -> FinanceCategory.FOOD_DINING
        listOf("grocery", "supermarket", "dmart", "bigbasket", "zepto", "blinkit", "jiomart").any(text::contains) -> FinanceCategory.GROCERY
        listOf("amazon", "flipkart", "myntra", "ajio", "shopping").any(text::contains) -> FinanceCategory.SHOPPING
        listOf("electricity", "water bill", "gas bill", "recharge", "broadband", "airtel", "jio").any(text::contains) -> FinanceCategory.UTILITIES
        listOf("mutual fund", "sip", "zerodha", "groww", "upstox", "investment", "etf").any(text::contains) -> FinanceCategory.INVESTMENT
        listOf("hospital", "pharmacy", "apollo", "medical", "doctor").any(text::contains) -> FinanceCategory.MEDICAL
        listOf("school", "college", "tuition", "education", "course").any(text::contains) -> FinanceCategory.EDUCATION
        listOf("netflix", "spotify", "hotstar", "prime video", "subscription").any(text::contains) -> FinanceCategory.SUBSCRIPTION
        listOf("uber", "ola", "irctc", "airlines", "flight", "travel").any(text::contains) -> FinanceCategory.TRAVEL
        listOf("cinema", "movie", "bookmyshow", "entertainment").any(text::contains) -> FinanceCategory.ENTERTAINMENT
        listOf("atm", "cash withdrawal").any(text::contains) -> FinanceCategory.ATM
        listOf("rent", "landlord").any(text::contains) -> FinanceCategory.RENT
        listOf("government", "treasury", "challan").any(text::contains) -> FinanceCategory.GOVERNMENT
        type == TransactionType.TRANSFER -> FinanceCategory.TRANSFER
        else -> FinanceCategory.MISCELLANEOUS
    }

    private fun extractMerchant(body: String, fallback: String): String {
        listOf(" at ", " to ", " from ", " towards ").forEach { token ->
            val idx = body.lowercase().indexOf(token)
            if (idx >= 0) {
                val part = body.substring(idx + token.length).take(42).trim().trim('.', ',', ';', ':')
                if (part.length >= 2) return part
            }
        }
        return fallback
    }
}
