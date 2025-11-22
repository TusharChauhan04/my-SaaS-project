import { NextResponse } from "next/server"
import { generateChatCompletion } from "@/lib/openai"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { description, amount, vendor } = body

        if (!description) {
            return NextResponse.json(
                { error: "Description is required for categorization" },
                { status: 400 }
            )
        }

        // Create prompt for ChatGPT
        const prompt = `Categorize this business expense into one of these categories:
- Rent
- Utilities
- Supplies
- Marketing
- Salaries
- Software/Subscriptions
- Travel
- Meals & Entertainment
- Professional Services
- Insurance
- Taxes
- Equipment
- Maintenance
- Other

Expense details:
- Description: "${description}"
${amount ? `- Amount: $${amount}` : ""}
${vendor ? `- Vendor: ${vendor}` : ""}

Respond with ONLY the category name, nothing else.`

        // Call ChatGPT
        const completion = await generateChatCompletion([
            {
                role: "system",
                content: "You are an expense categorization AI. Respond with only the category name.",
            },
            {
                role: "user",
                content: prompt,
            },
        ])

        const category = completion.choices[0]?.message?.content?.trim() || "Other"

        // Also check if it's tax deductible
        const taxPrompt = `Is this business expense typically tax-deductible in the US?
Description: "${description}"
Category: ${category}

Respond with ONLY "yes" or "no".`

        const taxCompletion = await generateChatCompletion([
            {
                role: "system",
                content: "You are a tax advisor AI. Respond with only 'yes' or 'no'.",
            },
            {
                role: "user",
                content: taxPrompt,
            },
        ])

        const taxDeductible = taxCompletion.choices[0]?.message?.content?.toLowerCase().includes("yes")

        return NextResponse.json({
            success: true,
            category,
            taxDeductible,
            confidence: "high",
        })
    } catch (error: any) {
        console.error("Error categorizing expense:", error)

        // Fallback to simple keyword matching
        const desc = body.description?.toLowerCase() || ""
        let category = "Other"

        if (desc.includes("rent") || desc.includes("lease")) category = "Rent"
        else if (desc.includes("electric") || desc.includes("water") || desc.includes("gas") || desc.includes("utility")) category = "Utilities"
        else if (desc.includes("office") || desc.includes("supplies") || desc.includes("paper")) category = "Supplies"
        else if (desc.includes("ad") || desc.includes("marketing") || desc.includes("social media")) category = "Marketing"
        else if (desc.includes("salary") || desc.includes("payroll") || desc.includes("wage")) category = "Salaries"
        else if (desc.includes("software") || desc.includes("subscription") || desc.includes("saas")) category = "Software/Subscriptions"
        else if (desc.includes("travel") || desc.includes("flight") || desc.includes("hotel")) category = "Travel"
        else if (desc.includes("meal") || desc.includes("restaurant") || desc.includes("lunch") || desc.includes("dinner")) category = "Meals & Entertainment"

        return NextResponse.json({
            success: true,
            category,
            taxDeductible: true,
            confidence: "medium",
        })
    }
}
