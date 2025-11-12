"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Target, Users, MapPin, Search } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface KeywordData {
  keyword: string
  rank: number
  change: number
  volume: number
  difficulty: "Low" | "Medium" | "High"
}

export default function SEOTrackerPage() {
  const [keywords, setKeywords] = useState<KeywordData[]>([
    { keyword: "coffee shop near me", rank: 5, change: 3, volume: 12000, difficulty: "Medium" },
    { keyword: "best cafe downtown", rank: 12, change: -1, volume: 8000, difficulty: "High" },
    { keyword: "organic coffee beans", rank: 8, change: 5, volume: 5000, difficulty: "Low" },
  ])

  const [newKeyword, setNewKeyword] = useState("")

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setKeywords([
        ...keywords,
        {
          keyword: newKeyword,
          rank: Math.floor(Math.random() * 50) + 1,
          change: Math.floor(Math.random() * 10) - 5,
          volume: Math.floor(Math.random() * 2000) + 500,
          difficulty: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as "Low" | "Medium" | "High",
        },
      ])
      setNewKeyword("")
    }
  }

  const seoOptions = [
    {
      title: "AI Keyword Suggestions",
      description: "Get AI-powered keyword recommendations",
      icon: Search,
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Competitor Analysis",
      description: "See what your competitors are ranking for",
      icon: Users,
      color: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Local Audit",
      description: "Check your local citations & listings",
      icon: MapPin,
      color: "bg-green-50",
      textColor: "text-green-600",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Local SEO Tracker</h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 mt-2">Monitor your local search rankings and optimize visibility</p>
          <Button className="bg-blue-600 hover:bg-blue-700">+ Add Keyword</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {seoOptions.map((option, idx) => {
          const Icon = option.icon
          return (
            <div
              key={idx}
              className={`${option.color} border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow`}
            >
              <Icon className={`w-8 h-8 ${option.textColor} mb-3`} />
              <h3 className="font-semibold text-gray-900">{option.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{option.description}</p>
            </div>
          )
        })}
      </div>

      {/* Add Keyword */}
      <Card>
        <CardHeader>
          <CardTitle>Track New Keyword</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter keyword to track (e.g., 'best coffee near me')"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
            />
            <Button onClick={handleAddKeyword} className="bg-blue-600 hover:bg-blue-700">
              <Target className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tracked Keywords Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tracked Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr className="text-gray-600">
                  <th className="text-left py-3 px-4 font-semibold">KEYWORD</th>
                  <th className="text-left py-3 px-4 font-semibold">CURRENT RANK</th>
                  <th className="text-left py-3 px-4 font-semibold">CHANGE</th>
                  <th className="text-left py-3 px-4 font-semibold">SEARCH VOLUME</th>
                  <th className="text-left py-3 px-4 font-semibold">DIFFICULTY</th>
                  <th className="text-left py-3 px-4 font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.keyword}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-700">#{item.rank}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className={item.change >= 0 ? "text-green-600" : "text-red-600"}>
                        {item.change >= 0 ? "↑" : "↓"} {Math.abs(item.change)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.volume.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          item.difficulty === "Low"
                            ? "bg-green-100 text-green-700"
                            : item.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }
                      >
                        {item.difficulty}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="link" size="sm" className="text-blue-600">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Ranking Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Your Ranking Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { week: "Week 1", rank: 25 },
                { week: "Week 2", rank: 22 },
                { week: "Week 3", rank: 18 },
                { week: "Week 4", rank: 12 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis reversed />
              <Tooltip />
              <Line type="monotone" dataKey="rank" stroke="#3b82f6" strokeWidth={2} name="Average Rank" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
