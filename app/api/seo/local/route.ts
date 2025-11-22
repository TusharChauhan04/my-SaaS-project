import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { companyName, industry, location } = body

        // Validate required fields
        if (!companyName || !industry || !location) {
            return NextResponse.json(
                { error: 'Company name, industry, and location are required' },
                { status: 400 }
            )
        }

        // Mock Local SEO Audit data
        const mockResult = {
            success: true,
            data: {
                businessInfo: {
                    companyName,
                    industry,
                    location,
                },
                localAudit: {
                    googleMyBusiness: {
                        status: "Needs Optimization",
                        score: 65,
                        issues: [
                            "Business hours not updated",
                            "Missing business description",
                            "Only 3 photos uploaded (recommend 10+)",
                            "No posts in last 30 days",
                        ],
                        recommendations: [
                            "Complete all GMB profile sections",
                            "Add high-quality photos (products, team, location)",
                            "Post weekly updates and offers",
                            "Respond to all reviews within 24 hours",
                            "Add business attributes and services",
                        ],
                    },
                    localCitations: {
                        found: 12,
                        recommended: 50,
                        topDirectories: [
                            { name: "Yelp", status: "Listed", accuracy: "90%" },
                            { name: "Yellow Pages", status: "Listed", accuracy: "85%" },
                            { name: "Facebook", status: "Listed", accuracy: "95%" },
                            { name: "Bing Places", status: "Missing", accuracy: "0%" },
                            { name: "Apple Maps", status: "Missing", accuracy: "0%" },
                        ],
                        recommendations: [
                            `Submit to top 50 ${location} business directories`,
                            "Ensure NAP (Name, Address, Phone) consistency",
                            "Claim and verify all directory listings",
                            "Remove duplicate listings",
                        ],
                    },
                    localBacklinks: {
                        current: 8,
                        recommended: 30,
                        opportunities: [
                            `Local ${location} news websites`,
                            `${location} Chamber of Commerce`,
                            `Local ${industry} associations`,
                            `${location} event sponsorships`,
                            `Local bloggers and influencers`,
                        ],
                    },
                    reviews: {
                        totalReviews: 24,
                        averageRating: 4.2,
                        platforms: [
                            { name: "Google", reviews: 15, rating: 4.3 },
                            { name: "Yelp", reviews: 6, rating: 4.0 },
                            { name: "Facebook", reviews: 3, rating: 4.5 },
                        ],
                        recommendations: [
                            "Aim for 50+ Google reviews",
                            "Respond to all reviews (positive and negative)",
                            "Ask satisfied customers for reviews",
                            "Create a review generation strategy",
                        ],
                    },
                    localKeywordRankings: {
                        tracked: 5,
                        topRankings: [
                            { keyword: `${industry} ${location}`, position: 8, change: "+2" },
                            { keyword: `${companyName}`, position: 1, change: "0" },
                            { keyword: `${industry} near me`, position: 15, change: "+5" },
                        ],
                        recommendations: [
                            `Target "${industry} ${location}" for top 3`,
                            `Create location-specific content`,
                            `Build local backlinks to improve rankings`,
                        ],
                    },
                },
                priorityActions: [
                    "Complete and optimize Google My Business profile",
                    "Build citations on top 20 local directories",
                    "Generate 25+ Google reviews in next 3 months",
                    "Create location-specific landing pages",
                    "Build 15+ local backlinks",
                    "Post weekly GMB updates",
                ],
                generatedAt: new Date().toISOString(),
            }
        }

        return NextResponse.json(mockResult)
    } catch (error: any) {
        console.error('Local Audit API Error:', error)
        return NextResponse.json(
            {
                error: 'Failed to generate local audit',
                details: error.message
            },
            { status: 500 }
        )
    }
}
