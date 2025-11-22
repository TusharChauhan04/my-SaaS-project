import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export interface SEOAnalysisRequest {
    companyName: string
    industry: string
    location: string
    websiteUrl?: string
    competitorUrls?: string[]
}

export async function generateSEOAnalysis(data: SEOAnalysisRequest) {
    const prompt = `You are an expert SEO analyst. Analyze the following business and provide comprehensive SEO recommendations.

Business Details:
- Company Name: ${data.companyName}
- Industry: ${data.industry}
- Location: ${data.location}
${data.websiteUrl ? `- Website: ${data.websiteUrl}` : ''}
${data.competitorUrls?.length ? `- Competitors: ${data.competitorUrls.join(', ')}` : ''}

Provide a detailed SEO analysis with the following sections:

1. BUSINESS OVERVIEW
- Brief business summary
- Market positioning
- Target audience

2. KEYWORD RESEARCH
Generate 20 primary keywords and 20 long-tail keywords with:
- Keyword
- Estimated search volume (High/Medium/Low)
- Competition level (High/Medium/Low)
- Search intent (Informational/Commercial/Transactional/Navigational)
- Content ideas

3. LOCAL SEO KEYWORDS
Generate 15 geo-targeted keywords including:
- Location-based keywords
- "Near me" variations
- Local service keywords

4. LOCAL MARKETING STRATEGY
- Google My Business optimization tips
- Local backlink opportunities
- Citation websites to target
- Geo-targeted content ideas
- Community engagement strategies

5. CONTENT STRATEGY
- Topic clusters
- Content calendar suggestions
- Blog post ideas
- Video content ideas

6. PRIORITY ACTION CHECKLIST
List top 10 actions to take first, ordered by priority

Format the response as JSON with clear sections. Be specific and actionable.`

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert SEO consultant with deep knowledge of local SEO, keyword research, and digital marketing strategies. Provide data-backed, actionable recommendations.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 4000,
        })

        return completion.choices[0].message.content
    } catch (error) {
        console.error('OpenAI API Error:', error)
        throw new Error('Failed to generate SEO analysis')
    }
}

export async function analyzeWebsite(websiteUrl: string) {
    const prompt = `Perform a comprehensive SEO audit for the website: ${websiteUrl}

Analyze and provide detailed findings for:

1. ON-PAGE SEO ISSUES
- Page titles and meta descriptions
- Header structure (H1, H2, H3)
- Internal linking
- Keyword density
- Image alt-texts
- Content quality and readability
- Canonical issues

2. TECHNICAL SEO ISSUES
- Page speed score estimate
- Mobile responsiveness
- Sitemap.xml presence
- Robots.txt configuration
- Core Web Vitals concerns
- Potential broken links
- Schema markup opportunities
- Indexing issues

For each issue found, provide:
- Issue description
- How to fix it
- Priority level (High/Medium/Low)
- Estimated impact

Format as JSON with clear sections and actionable steps.`

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                {
                    role: 'system',
                    content: 'You are a technical SEO expert specializing in website audits and optimization.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.5,
            max_tokens: 3000,
        })

        return completion.choices[0].message.content
    } catch (error) {
        console.error('OpenAI API Error:', error)
        throw new Error('Failed to analyze website')
    }
}

// Generic chat completion function for Finance and other features
export async function generateChatCompletion(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    options?: {
        model?: string
        temperature?: number
        maxTokens?: number
    }
) {
    try {
        const completion = await openai.chat.completions.create({
            model: options?.model || 'gpt-4-turbo-preview',
            messages,
            temperature: options?.temperature || 0.7,
            max_tokens: options?.maxTokens || 2000,
        })

        return completion
    } catch (error) {
        console.error('OpenAI API Error:', error)
        throw new Error('Failed to generate chat completion')
    }
}

export default openai
