import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { companyName, industry, location, websiteUrl } = body

        // Validate required fields
        if (!companyName || !industry || !location) {
            return NextResponse.json(
                { error: 'Company name, industry, and location are required' },
                { status: 400 }
            )
        }

        // Mock AI Keyword Suggestions data
        const mockResult = {
            success: true,
            data: {
                businessInfo: {
                    companyName,
                    industry,
                    location,
                    websiteUrl: websiteUrl || null,
                },
                keywordAnalysis: {
                    primaryKeywords: [
                        { keyword: `${industry} ${location}`, volume: "High (10K-50K)", competition: "Medium", intent: "Commercial" },
                        { keyword: `best ${industry} in ${location}`, volume: "High (5K-20K)", competition: "High", intent: "Commercial" },
                        { keyword: `${industry} near me`, volume: "Very High (50K+)", competition: "High", intent: "Transactional" },
                        { keyword: `top ${industry} ${location}`, volume: "Medium (2K-10K)", competition: "Medium", intent: "Informational" },
                        { keyword: `${companyName} ${location}`, volume: "Low (500-2K)", competition: "Low", intent: "Navigational" },
                    ],
                    longTailKeywords: [
                        { keyword: `affordable ${industry} in ${location}`, volume: "Medium (1K-5K)", competition: "Low", intent: "Commercial" },
                        { keyword: `${industry} ${location} reviews`, volume: "Medium (2K-5K)", competition: "Medium", intent: "Informational" },
                        { keyword: `${industry} ${location} open now`, volume: "Medium (1K-3K)", competition: "Low", intent: "Transactional" },
                        { keyword: `best rated ${industry} ${location}`, volume: "Low (500-1K)", competition: "Low", intent: "Commercial" },
                        { keyword: `${industry} delivery ${location}`, volume: "Medium (2K-5K)", competition: "Medium", intent: "Transactional" },
                    ],
                    localKeywords: [
                        `${industry} in ${location}`,
                        `${industry} near ${location}`,
                        `${location} ${industry} services`,
                        `${industry} ${location} downtown`,
                        `local ${industry} ${location}`,
                    ],
                    contentIdeas: [
                        `Top 10 ${industry} Tips for ${location} Residents`,
                        `Why ${companyName} is the Best ${industry} in ${location}`,
                        `${industry} Trends in ${location} for 2024`,
                        `How to Choose the Right ${industry} in ${location}`,
                        `${companyName} Customer Success Stories`,
                    ],
                },
                recommendations: [
                    `Focus on local keywords with "${location}" modifier`,
                    `Create content targeting "near me" searches`,
                    `Optimize for mobile search (70% of local searches)`,
                    `Build location-specific landing pages`,
                    `Target long-tail keywords with lower competition`,
                ],
                generatedAt: new Date().toISOString(),
            }
        }

        return NextResponse.json(mockResult)
    } catch (error: any) {
        console.error('Keywords API Error:', error)
        return NextResponse.json(
            {
                error: 'Failed to generate keyword analysis',
                details: error.message
            },
            { status: 500 }
        )
    }
}
