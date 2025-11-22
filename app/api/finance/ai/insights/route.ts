import { NextResponse } from "next/server"
import { generateChatCompletion } from "@/lib/openai"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { transactions, period = "month" } = body

        if (!transactions || transactions.length === 0) {
            return NextResponse.json(
                { error: "No transaction data provided" },
                { status: 400 }
            )
        }

        // Calculate key metrics
        const expenses = transactions.filter((t: any) => t.type === "expense")
        const revenues = transactions.filter((t: any) => t.type === "revenue")

        const totalExpenses = expenses.reduce((sum: number, t: any) => sum + t.amount, 0)
        const totalRevenue = revenues.reduce((sum: number, t: any) => sum + t.amount, 0)
        const netProfit = totalRevenue - totalExpenses
        const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0

        // Category breakdown
        const expensesByCategory = expenses.reduce((acc: any, t: any) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount
            return acc
        }, {})

        // Create prompt for ChatGPT
        const prompt = `You are a financial insights AI. Analyze this business's financial data and provide 4-6 key insights in plain language.

Financial Data for this ${period}:
- Total Revenue: $${totalRevenue}
- Total Expenses: $${totalExpenses}
- Net Profit: $${netProfit}
- Profit Margin: ${profitMargin}%
- Top Expense Categories: ${JSON.stringify(expensesByCategory, null, 2)}
- Number of Transactions: ${transactions.length}

Provide insights in this exact JSON format:
{
  "insights": [
    {
      "type": "positive" | "warning" | "neutral" | "goal",
      "icon": "✓" | "⚠️" | "📊" | "🎯" | "💰",
      "message": "Brief, actionable insight with specific numbers"
    }
  ]
}

Focus on:
1. Revenue trends (increases/decreases with percentages)
2. Expense efficiency (spending patterns, ROI concerns)
3. Profit margin comparisons (vs industry average if possible)
4. Potential savings opportunities
5. Goal progress or recommendations
6. Notable patterns or anomalies

Be specific, use exact dollar amounts and percentages. Keep messages concise (1-2 sentences max).`

        // Call ChatGPT
        const completion = await generateChatCompletion([
            {
                role: "system",
                content: "You are a financial insights AI that provides clear, actionable insights with specific numbers.",
            },
            {
                role: "user",
                content: prompt,
            },
        ])

        // Parse response
        const responseText = completion.choices[0]?.message?.content || "{}"
        let insights

        try {
            const parsed = JSON.parse(responseText)
            insights = parsed.insights || []
        } catch (e) {
            // Fallback to calculated insights
            insights = [
                {
                    type: netProfit > 0 ? "positive" : "warning",
                    icon: netProfit > 0 ? "✓" : "⚠️",
                    message: `Net profit this ${period}: $${netProfit.toFixed(2)} (${profitMargin}% margin)`,
                },
                {
                    type: "neutral",
                    icon: "📊",
                    message: `Total expenses: $${totalExpenses.toFixed(2)} across ${Object.keys(expensesByCategory).length} categories`,
                },
            ]

            // Add revenue trend if positive
            if (totalRevenue > 0) {
                insights.unshift({
                    type: "positive",
                    icon: "💰",
                    message: `Revenue this ${period}: $${totalRevenue.toFixed(2)}`,
                })
            }

            // Add top expense category
            const topCategory = Object.entries(expensesByCategory).sort(
                ([, a]: any, [, b]: any) => b - a
            )[0]
            if (topCategory) {
                insights.push({
                    type: "neutral",
                    icon: "📊",
                    message: `Highest expense: ${topCategory[0]} ($${(topCategory[1] as number).toFixed(2)})`,
                })
            }
        }

        return NextResponse.json({
            success: true,
            insights,
            summary: {
                totalRevenue,
                totalExpenses,
                netProfit,
                profitMargin: parseFloat(profitMargin as string),
            },
            generatedAt: new Date().toISOString(),
        })
    } catch (error: any) {
        console.error("Error generating insights:", error)
        return NextResponse.json(
            { error: error.message || "Failed to generate insights" },
            { status: 500 }
        )
    }
}
