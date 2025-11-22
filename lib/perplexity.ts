export interface PerplexityRequest {
    query: string
}

export async function searchPerplexity(query: string) {
    const apiKey = process.env.PERPLEXITY_API_KEY

    if (!apiKey) {
        throw new Error('Perplexity API key not configured')
    }

    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-sonar-small-128k-online',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a market research expert. Provide accurate, up-to-date information about businesses, competitors, and market trends.'
                    },
                    {
                        role: 'user',
                        content: query
                    }
                ],
                temperature: 0.2,
                max_tokens: 2000,
            }),
        })

        if (!response.ok) {
            throw new Error(`Perplexity API error: ${response.statusText}`)
        }

        const data = await response.json()
        return data.choices[0].message.content
    } catch (error) {
        console.error('Perplexity API Error:', error)
        throw new Error('Failed to fetch competitor data')
    }
}

export async function getCompetitorAnalysis(companyName: string, industry: string, location: string) {
    const query = `Identify the top 5 direct competitors for ${companyName} in the ${industry} industry located in ${location}. 
  
  For each competitor, provide:
  1. Company name
  2. Website URL
  3. Estimated monthly traffic
  4. Top 3 ranking keywords
  5. Key strengths
  6. Key weaknesses
  7. Market positioning
  
  Also provide a GAP analysis showing what ${companyName} is missing compared to competitors.
  
  Format the response as structured JSON.`

    return await searchPerplexity(query)
}

export async function getMarketTrends(industry: string, location: string) {
    const query = `Analyze the current market trends and demand for the ${industry} industry in ${location}.
  
  Provide:
  1. Market size and growth rate
  2. Current trends (2024-2025)
  3. Consumer behavior insights
  4. Emerging opportunities
  5. Challenges and threats
  6. Future predictions
  
  Format as structured JSON with data-backed insights.`

    return await searchPerplexity(query)
}

export async function getLocalMarketingIdeas(location: string, industry: string) {
    const query = `Suggest specific local marketing strategies for a ${industry} business in ${location}.
  
  Include:
  1. Local events and sponsorship opportunities
  2. Community partnerships
  3. Local influencers and bloggers
  4. Geo-targeted advertising platforms
  5. Local PR opportunities
  6. Neighborhood-specific tactics
  
  Provide actionable, location-specific recommendations.`

    return await searchPerplexity(query)
}
