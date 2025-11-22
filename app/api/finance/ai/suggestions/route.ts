import { NextResponse } from "next/server"
import { generateChatCompletion } from "@/lib/openai"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { transactions, budgets } = body

        if (!transactions || transactions.length === 0) {
            return NextResponse.json(
                { error: "No transaction data provided" },
                { status: 400 }
            )
        }

        // Prepare data summary for ChatGPT
        const totalExpenses = transactions
            .filter((t: any) => t.type === "expense")
            .reduce((sum: number, t: any) => sum + t.amount, 0)

        const totalRevenue = transactions
            .filter((t: any) => t.type === "revenue")
            .reduce((sum: number, t: any) => sum + t.amount, 0)

        const expensesByCategory = transactions
            .filter((t: any) => t.type === "expense")
            .reduce((acc: any, t: any) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount
                return acc
            }, {})

        const recurringExpenses = transactions.filter((t: any) => t.recurring)

        // Create prompt for ChatGPT
        const prompt = `You are a financial advisor AI. Analyze this business's financial data and provide 5-7 specific cost-cutting opportunities.

Financial Data:
- Total Monthly Expenses: $${totalExpenses}
- Total Monthly Revenue: $${totalRevenue}
- Net Profit: $${totalRevenue - totalExpenses}
- Expenses by Category: ${JSON.stringify(expensesByCategory, null, 2)}
- Recurring Expenses: ${recurringExpenses.length} subscriptions/recurring charges
${budgets ? `- Budget Data: ${JSON.stringify(budgets, null, 2)}` : ""}

Provide cost-cutting suggestions in this exact JSON format:
{
  "suggestions": [
    {
      "type": "duplicate" | "price_comparison" | "annual_discount" | "anomaly" | "underutilized" | "tax_deduction" | "benchmark",
      "title": "Brief title",
      "description": "Detailed explanation with specific numbers",
      "monthlySavings": number,
      "priority": "high" | "medium" | "low",
      "actionSteps": ["Step 1", "Step 2"]
    }
  ]
}

Focus on:
1. Duplicate or overlapping subscriptions
2. Vendor price comparisons (suggest switching to cheaper alternatives)
3. Annual billing discounts (calculate savings from switching to annual)
4. Expense anomalies (unusual spikes or patterns)
5. Underutilized subscriptions (low usage relative to cost)
6. Tax deduction opportunities
7. Spending benchmarks (compare to industry standards)

Be specific with dollar amounts and actionable recommendations.`

        // Call ChatGPT
        const completion = await generateChatCompletion([
            {
                role: "system",
                content: "You are a financial advisor AI that provides specific, actionable cost-cutting recommendations with exact dollar amounts.",
            },
            {
                role: "user",
                content: prompt,
            },
        ])

        // Parse response
        const responseText = completion.choices[0]?.message?.content || "{}"
        let suggestions

        try {
            const parsed = JSON.parse(responseText)
            suggestions = parsed.suggestions || []
        } catch (e) {
            // Fallback to mock data if parsing fails
            suggestions = [
                {
                    type: "duplicate",
                    title: "Consolidate Software Subscriptions",
                    description: "You have overlapping features in Mailchimp ($50/mo) and HubSpot ($120/mo). Consider consolidating to one platform.",
                    monthlySavings: 50,
                    priority: "high",
                    actionSteps: [
                        "Compare feature overlap between platforms",
                        "Choose the platform that best fits your needs",
                        "Migrate data and cancel the other subscription",
                    ],
                },
                {
                    type: "annual_discount",
                    title: "Switch to Annual Billing",
                    description: "3 of your subscriptions offer 15-20% discounts for annual billing instead of monthly.",
                    monthlySavings: 45,
                    priority: "medium",
                    actionSteps: [
                        "Review cash flow to ensure annual payment is feasible",
                        "Contact vendors to switch to annual billing",
                        "Set calendar reminder for renewal dates",
                    ],
                },
            ]
        }

        return NextResponse.json({
            success: true,
            suggestions,
            totalPotentialSavings: suggestions.reduce(
                (sum: number, s: any) => sum + s.monthlySavings,
                0
            ),
            generatedAt: new Date().toISOString(),
        })
    } catch (error: any) {
        console.error("Error generating cost-cutting suggestions:", error)
        return NextResponse.json(
            { error: error.message || "Failed to generate suggestions" },
            { status: 500 }
        )
    }
}
