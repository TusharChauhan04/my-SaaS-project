"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Users, Target, Download, Globe, Zap, AlertCircle } from "lucide-react"

interface DashboardData {
  seoRanking: number
  monthlySavings: number
  contentReach: number
  aiCredits: number
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    // Mock data - in production, fetch from API
    setData({
      seoRanking: 5,
      monthlySavings: 1240,
      contentReach: 118000,
      aiCredits: 850,
    })
  }, [])

  const expensesData = [
    { category: "Rent", value: 4200 },
    { category: "Supplies", value: 1800 },
    { category: "Marketing", value: 2500 },
    { category: "Utilities", value: 800 },
    { category: "Salaries", value: 5200 },
  ]

  const connectedAccounts = [
    { name: "Google Business Profile", status: "Connected", icon: Globe },
    { name: "Instagram", status: "Connected", icon: Users },
    { name: "Facebook Page", status: "Connect", icon: Users },
    { name: "Twitter/X", status: "Connect", icon: Users },
  ]

  const teamMembers = [
    { name: "John Doe", email: "john@techstartup.com", role: "Owner" },
    { name: "Jane Smith", email: "jane@techstartup.com", role: "Admin" },
    { name: "Mike Johnson", email: "mike@techstartup.com", role: "Member" },
  ]

  const aiInsights = [
    {
      icon: TrendingUp,
      title: "SEO Opportunity Detected",
      description:
        "The keyword 'best coffee shop near me' has 40% less competition. Consider optimizing your Google Business Profile.",
      color: "#3b82f6",
    },
    {
      icon: DollarSign,
      title: "Cost Savings Identified",
      description:
        "You're paying for 3 subscriptions with overlapping features. Consolidating could save you $180/month.",
      color: "#10b981",
    },
    {
      icon: AlertCircle,
      title: "Content Trending Now",
      description: "'Behind-the-scenes' reels are getting 3x more engagement in your industry. Post yours today!",
      color: "#8b5cf6",
    },
  ]

  const handleExportReport = () => {
    const report = `
Business Dashboard Report
Generated: ${new Date().toLocaleDateString()}

Key Metrics:
- SEO Ranking: #${data?.seoRanking}
- Monthly Savings: $${data?.monthlySavings.toLocaleString()}
- Content Reach: ${(data?.contentReach || 0).toLocaleString()}
- AI Credits Remaining: ${data?.aiCredits}
    `
    const blob = new Blob([report], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dashboard-report-${new Date().toISOString().split("T")[0]}.txt`
    a.click()
  }

  if (!data) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="p-8 space-y-8">
      {/* Header with Export Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        </div>
        <Button onClick={handleExportReport} className="bg-purple-600 hover:bg-purple-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Blue - SEO Ranking */}
        <div
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">SEO Ranking</p>
              <div className="text-4xl font-bold mt-2">#{data.seoRanking}</div>
              <p className="text-xs opacity-75 mt-3">↑ 3 positions this month</p>
            </div>
            <Target className="w-8 h-8 opacity-50" />
          </div>
        </div>

        {/* Green - Monthly Savings */}
        <div
          style={{
            backgroundColor: "#10b981",
            color: "white",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Monthly Savings</p>
              <div className="text-4xl font-bold mt-2">${(data.monthlySavings / 1000).toFixed(1)}K</div>
              <p className="text-xs opacity-75 mt-3">↑ 18% vs last month</p>
            </div>
            <DollarSign className="w-8 h-8 opacity-50" />
          </div>
        </div>

        {/* Purple - Content Reach */}
        <div
          style={{
            backgroundColor: "#8b5cf6",
            color: "white",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Content Reach</p>
              <div className="text-4xl font-bold mt-2">{(data.contentReach / 1000).toFixed(0)}K</div>
              <p className="text-xs opacity-75 mt-3">↑ 25% engagement rate</p>
            </div>
            <TrendingUp className="w-8 h-8 opacity-50" />
          </div>
        </div>

        {/* Orange - AI Credits */}
        <div
          style={{
            backgroundColor: "#f97316",
            color: "white",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">AI Credits</p>
              <div className="text-4xl font-bold mt-2">{data.aiCredits}</div>
              <p className="text-xs opacity-75 mt-3">Remaining this month</p>
            </div>
            <Zap className="w-8 h-8 opacity-50" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiInsights.map((insight, idx) => {
            const Icon = insight.icon
            return (
              <div
                key={idx}
                className="p-4 rounded-lg border-l-4 flex gap-3"
                style={{ borderLeftColor: insight.color, backgroundColor: `${insight.color}15` }}
              >
                <Icon className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: insight.color }} />
                <div>
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {connectedAccounts.map((account, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-gray-600" />
                  </div>
                  <p className="font-medium text-gray-900">{account.name}</p>
                </div>
                <Button
                  variant={account.status === "Connected" ? "outline" : "default"}
                  size="sm"
                  className={account.status === "Connected" ? "text-green-600 border-green-600" : ""}
                >
                  {account.status}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  {member.role}
                </Button>
              </div>
            ))}
            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">+ Invite Team Member</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
