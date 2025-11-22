import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { companyName, industry, location, competitorUrls } = body

        // Validate required fields
        if (!companyName || !industry || !location) {
            return NextResponse.json(
                { error: 'Company name, industry, and location are required' },
                { status: 400 }
            )
        }

        // Mock Competitor Analysis data
        const mockResult = {
            success: true,
            data: {
                businessInfo: {
                    companyName,
                    industry,
                    location,
                    competitorUrls: competitorUrls ? competitorUrls.split(',').map((url: string) => url.trim()) : [],
                },
                competitorAnalysis: {
                    topCompetitors: [
                        {
                            name: `Premium ${industry} Co`,
                            website: "https://competitor1.com",
                            estimatedTraffic: "50K-100K monthly",
                            domainAuthority: 45,
                            topKeywords: [`best ${industry}`, `${industry} ${location}`, `premium ${industry}`],
                            strengths: ["Strong brand presence", "High-quality content", "Active social media"],
                            weaknesses: ["Higher pricing", "Limited local presence"],
                        },
                        {
                            name: `Local ${industry} Shop`,
                            website: "https://competitor2.com",
                            estimatedTraffic: "20K-50K monthly",
                            domainAuthority: 35,
                            topKeywords: [`${industry} near me`, `local ${industry}`, `${location} ${industry}`],
                            strengths: ["Strong local SEO", "Good reviews", "Community engagement"],
                            weaknesses: ["Limited online presence", "Outdated website"],
                        },
                        {
                            name: `${industry} Express`,
                            website: "https://competitor3.com",
                            estimatedTraffic: "30K-70K monthly",
                            domainAuthority: 40,
                            topKeywords: [`fast ${industry}`, `${industry} delivery`, `${industry} online`],
                            strengths: ["Fast service", "Good UX", "Mobile-friendly"],
                            weaknesses: ["Limited physical locations", "Less personal service"],
                        },
                    ],
                    marketGaps: [
                        `Focus on personalized customer service`,
                        `Target underserved neighborhoods in ${location}`,
                        `Create content about ${industry} sustainability`,
                        `Offer unique services competitors don't provide`,
                    ],
                    competitiveAdvantages: [
                        `Your unique value proposition in ${location}`,
                        `Better customer service than competitors`,
                        `More competitive pricing strategy`,
                        `Stronger local community ties`,
                    ],
                },
                recommendations: [
                    `Analyze competitor backlink profiles`,
                    `Monitor competitor keyword rankings monthly`,
                    `Create better content than top 3 competitors`,
                    `Focus on gaps in competitor offerings`,
                    `Build stronger local citations than competitors`,
                ],
                generatedAt: new Date().toISOString(),
            }
        }

        return NextResponse.json(mockResult)
    } catch (error: any) {
        console.error('Competitors API Error:', error)
        return NextResponse.json(
            {
                error: 'Failed to generate competitor analysis',
                details: error.message
            },
            { status: 500 }
        )
    }
}
