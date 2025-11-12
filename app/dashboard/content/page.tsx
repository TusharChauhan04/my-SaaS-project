"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, BarChart3, Calendar } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  type: "Blog Post" | "Instagram Reel" | "Twitter Thread" | "YouTube Video"
  engagement: string
  difficulty: "Easy" | "Medium" | "Hard"
  icon: React.ReactNode
}

export default function ContentPage() {
  const contentMetrics = [
    { label: "Scheduled Posts", value: "24", color: "#ec4899" },
    { label: "Trending Hashtags", value: "156", color: "#3b82f6" },
    { label: "Video Ideas Ready", value: "8", color: "#8b5cf6" },
  ]

  const aiGeneratedIdeas: ContentItem[] = [
    {
      id: "1",
      title: "10 Ways to Brew the Perfect Cup of Coffee at Home",
      type: "Blog Post",
      engagement: "High Engagement",
      difficulty: "Easy",
      icon: "📝",
    },
    {
      id: "2",
      title: "Behind-the-Scenes: How We Source Organic Beans",
      type: "Instagram Reel",
      engagement: "Very High Engagement",
      difficulty: "Medium",
      icon: "🎥",
    },
    {
      id: "3",
      title: "The Science of Coffee Roasting (5-part series)",
      type: "Twitter Thread",
      engagement: "Medium Engagement",
      difficulty: "Easy",
      icon: "#️⃣",
    },
    {
      id: "4",
      title: "Coffee Shop Tour: Meet Our Baristas",
      type: "YouTube Video",
      engagement: "High Engagement",
      difficulty: "Hard",
      icon: "▶️",
    },
  ]

  const trendingHashtags = [
    "#CoffeeLovers",
    "#SpecialtyCoffee",
    "#BaristaLife",
    "#CoffeeAddict",
    "#CoffeeCulture",
    "#ThirdWaveCoffee",
    "#CoffeeShop",
    "#LocalCoffee",
    "#OrganicCoffee",
    "#CoffeeCommunity",
    "#LatteArt",
    "#CoffeeTime",
  ]

  const contentPerformance = [
    { type: "Blog Posts", published: 12, engagement: 8500, reach: 25000, rate: "34.0%" },
    { type: "Social Media", published: 45, engagement: 15000, reach: 50000, rate: "30.0%" },
    { type: "Videos", published: 8, engagement: 12000, reach: 35000, rate: "34.3%" },
    { type: "Newsletters", published: 4, engagement: 3500, reach: 8000, rate: "43.8%" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Content Planner</h1>
          <p className="text-gray-500 mt-2">Plan, schedule, and optimize your content strategy</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Content Ideas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contentMetrics.map((metric, idx) => {
          const Icon =
            metric.label === "Scheduled Posts" ? Calendar : metric.label === "Trending Hashtags" ? Sparkles : BarChart3
          return (
            <div
              key={idx}
              style={{
                backgroundColor: metric.color,
                color: "white",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">{metric.label}</p>
                  <div className="text-4xl font-bold mt-2">{metric.value}</div>
                </div>
                <Icon className="w-8 h-8 opacity-50" />
              </div>
            </div>
          )
        })}
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI-Generated Content Ideas
          </CardTitle>
          <Button variant="link" size="sm">
            Regenerate
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiGeneratedIdeas.map((idea) => (
              <div
                key={idea.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{idea.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{idea.title}</h4>
                        <Badge variant="outline">{idea.type}</Badge>
                        {idea.difficulty === "Easy" && (
                          <Badge className="bg-green-100 text-green-700">Difficulty: Easy</Badge>
                        )}
                        {idea.difficulty === "Medium" && (
                          <Badge className="bg-yellow-100 text-yellow-700">Difficulty: Medium</Badge>
                        )}
                        {idea.difficulty === "Hard" && (
                          <Badge className="bg-red-100 text-red-700">Difficulty: Hard</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{idea.engagement}</p>
                    </div>
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap">Use This</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trending Hashtags in Your Niche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map((hashtag, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="bg-purple-50 text-purple-700 cursor-pointer hover:bg-purple-100"
              >
                {hashtag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr className="text-gray-600">
                  <th className="text-left py-3 px-4 font-semibold">CONTENT TYPE</th>
                  <th className="text-left py-3 px-4 font-semibold">PUBLISHED</th>
                  <th className="text-left py-3 px-4 font-semibold">ENGAGEMENT</th>
                  <th className="text-left py-3 px-4 font-semibold">REACH</th>
                  <th className="text-left py-3 px-4 font-semibold">AVG. RATE</th>
                </tr>
              </thead>
              <tbody>
                {contentPerformance.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.type}</td>
                    <td className="py-3 px-4 text-gray-600">{item.published}</td>
                    <td className="py-3 px-4 text-gray-600">{item.engagement.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600">{item.reach.toLocaleString()}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">{item.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
