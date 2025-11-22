"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Search, Users, MapPin, Loader2, AlertCircle, Target, Zap, BarChart3,
  TrendingUp, FileText, Globe, ChevronDown, ChevronUp, Clock, Download,
  Lightbulb, Activity, CheckCircle2, Eye, Trash2
} from "lucide-react"

type FeatureType = "keywords" | "competitors" | "local" | null

interface AnalysisResult {
  businessInfo: {
    companyName: string
    industry: string
    location: string
  }
  data: any
  generatedAt: string
}

interface AnalysisHistory {
  id: string
  type: "keywords" | "competitors" | "local"
  companyName: string
  industry: string
  location: string
  timestamp: string
  result: any
}

export default function SEOTrackerPage() {
  const [activeFeature, setActiveFeature] = useState<FeatureType>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistory[]>([])
  const [selectedHistory, setSelectedHistory] = useState<AnalysisHistory | null>(null)
  const [showExportMenu, setShowExportMenu] = useState(false)

  // Export handlers
  const handleExportPDF = () => {
    if (!analysisResult) {
      alert("No analysis data to export. Please run an analysis first.")
      return
    }

    // Create PDF export (simplified version)
    const dataStr = JSON.stringify(analysisResult, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `SEO-Analysis-${analysisResult.businessInfo.companyName}-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
    setShowExportMenu(false)
    alert("Analysis exported! (Note: Full PDF export will be available in the next update)")
  }

  const handleExportWord = () => {
    if (!analysisResult) {
      alert("No analysis data to export. Please run an analysis first.")
      return
    }

    // Create Word document export (simplified version)
    const dataStr = JSON.stringify(analysisResult, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `SEO-Analysis-${analysisResult.businessInfo.companyName}-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
    setShowExportMenu(false)
    alert("Analysis exported! (Note: Full Word export will be available in the next update)")
  }

  const handleExportExcel = () => {
    if (!analysisResult) {
      alert("No analysis data to export. Please run an analysis first.")
      return
    }

    // Create Excel export (simplified version)
    const dataStr = JSON.stringify(analysisResult, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `SEO-Analysis-${analysisResult.businessInfo.companyName}-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
    setShowExportMenu(false)
    alert("Analysis exported! (Note: Full Excel export will be available in the next update)")
  }

  // Form data for each feature
  const [keywordsForm, setKeywordsForm] = useState({
    companyName: "",
    industry: "",
    location: "",
    websiteUrl: "",
  })

  const [competitorsForm, setCompetitorsForm] = useState({
    companyName: "",
    industry: "",
    location: "",
    competitorUrls: "",
  })

  const [localForm, setLocalForm] = useState({
    companyName: "",
    industry: "",
    location: "",
  })

  // Load analysis history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("seo_analysis_history")
    if (savedHistory) {
      try {
        setAnalysisHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Failed to load history:", e)
      }
    }
  }, [])

  // Save analysis to history
  const saveToHistory = (type: "keywords" | "competitors" | "local", businessInfo: any, result: any) => {
    const newHistory: AnalysisHistory = {
      id: Date.now().toString(),
      type,
      companyName: businessInfo.companyName,
      industry: businessInfo.industry,
      location: businessInfo.location,
      timestamp: new Date().toISOString(),
      result,
    }

    const updatedHistory = [newHistory, ...analysisHistory].slice(0, 50) // Keep last 50
    setAnalysisHistory(updatedHistory)
    localStorage.setItem("seo_analysis_history", JSON.stringify(updatedHistory))
  }

  const handleFeatureClick = (feature: FeatureType) => {
    if (activeFeature === feature) {
      setActiveFeature(null)
    } else {
      setActiveFeature(feature)
      setAnalysisResult(null)
      setSelectedHistory(null)
      setError("")
    }
  }

  const handleKeywordsAnalysis = async () => {
    if (!keywordsForm.companyName || !keywordsForm.industry || !keywordsForm.location) {
      setError("Please fill in company name, industry, and location")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/seo/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(keywordsForm),
      })

      if (!response.ok) throw new Error("Failed to generate analysis")

      const data = await response.json()
      setAnalysisResult(data.data)
      saveToHistory("keywords", keywordsForm, data.data)
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis")
    } finally {
      setLoading(false)
    }
  }

  const handleCompetitorsAnalysis = async () => {
    if (!competitorsForm.companyName || !competitorsForm.industry || !competitorsForm.location) {
      setError("Please fill in company name, industry, and location")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/seo/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(competitorsForm),
      })

      if (!response.ok) throw new Error("Failed to generate analysis")

      const data = await response.json()
      setAnalysisResult(data.data)
      saveToHistory("competitors", competitorsForm, data.data)
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis")
    } finally {
      setLoading(false)
    }
  }

  const handleLocalAnalysis = async () => {
    if (!localForm.companyName || !localForm.industry || !localForm.location) {
      setError("Please fill in company name, industry, and location")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/seo/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localForm),
      })

      if (!response.ok) throw new Error("Failed to generate analysis")

      const data = await response.json()
      setAnalysisResult(data.data)
      saveToHistory("local", localForm, data.data)
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis")
    } finally {
      setLoading(false)
    }
  }

  const viewHistoryItem = (item: AnalysisHistory) => {
    setSelectedHistory(item)
    setAnalysisResult({
      businessInfo: {
        companyName: item.companyName,
        industry: item.industry,
        location: item.location,
      },
      data: item.result,
      generatedAt: item.timestamp,
    })
    setActiveFeature(null)
  }

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all analysis history?")) {
      setAnalysisHistory([])
      localStorage.removeItem("seo_analysis_history")
    }
  }

  // Calculate SEO Health Score based on recent analyses
  const calculateHealthScore = () => {
    if (analysisHistory.length === 0) {
      return {
        overall: 0,
        onPage: 0,
        technical: 0,
        local: 0,
        content: 0,
        backlinks: 0,
      }
    }

    // Simple scoring based on number of analyses and types
    const keywordAnalyses = analysisHistory.filter(h => h.type === "keywords").length
    const competitorAnalyses = analysisHistory.filter(h => h.type === "competitors").length
    const localAnalyses = analysisHistory.filter(h => h.type === "local").length

    const onPage = Math.min(keywordAnalyses * 20, 100)
    const technical = Math.min(localAnalyses * 15, 100)
    const local = Math.min(localAnalyses * 25, 100)
    const content = Math.min(keywordAnalyses * 15, 100)
    const backlinks = Math.min(competitorAnalyses * 20, 100)
    const overall = Math.round((onPage + technical + local + content + backlinks) / 5)

    return { overall, onPage, technical, local, content, backlinks }
  }

  const healthScore = calculateHealthScore()

  const seoFeatures = [
    {
      id: "keywords" as FeatureType,
      title: "AI Keyword Suggestions",
      description: "Get AI-powered keyword recommendations",
      icon: Search,
      color: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      id: "competitors" as FeatureType,
      title: "Competitor Analysis",
      description: "See what your competitors are ranking for",
      icon: Users,
      color: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      id: "local" as FeatureType,
      title: "Local Audit",
      description: "Check your local citations & listings",
      icon: MapPin,
      color: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
  ]

  const quickActions = [
    {
      title: "Track Keywords",
      description: "Monitor keyword rankings",
      icon: Search,
      color: "bg-blue-50 hover:bg-blue-100",
      textColor: "text-blue-600",
      action: () => handleFeatureClick("keywords"),
    },
    {
      title: "Analyze Competitors",
      description: "Check competitor strategies",
      icon: Users,
      color: "bg-purple-50 hover:bg-purple-100",
      textColor: "text-purple-600",
      action: () => handleFeatureClick("competitors"),
    },
    {
      title: "Local SEO Audit",
      description: "Optimize local presence",
      icon: MapPin,
      color: "bg-green-50 hover:bg-green-100",
      textColor: "text-green-600",
      action: () => handleFeatureClick("local"),
    },
    {
      title: "SEO Tips",
      description: "Best practices & guides",
      icon: Lightbulb,
      color: "bg-yellow-50 hover:bg-yellow-100",
      textColor: "text-yellow-600",
      action: () => alert("SEO Tips: Focus on quality content, build local citations, optimize for mobile, and monitor your rankings regularly!"),
    },
  ]

  return (
    <div className="space-y-8 p-8">
      {/* Header with Export Button */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Local SEO Tracker</h1>
          <p className="text-gray-500 mt-2">
            AI-powered SEO analysis and optimization recommendations
          </p>
        </div>

        {/* Export Dropdown Button */}
        <div className="relative">
          <Button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center gap-2"
            disabled={!analysisResult}
          >
            <Download className="w-4 h-4" />
            Export Analysis
            <ChevronDown className="w-4 h-4" />
          </Button>

          {/* Dropdown Menu */}
          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                <button
                  onClick={handleExportPDF}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-red-600" />
                  Export as PDF
                </button>
                <button
                  onClick={handleExportWord}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  Export as Word Document
                </button>
                <button
                  onClick={handleExportExcel}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  Export as Excel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {seoFeatures.map((feature) => {
          const Icon = feature.icon
          const isActive = activeFeature === feature.id
          return (
            <div key={feature.id}>
              <div
                onClick={() => handleFeatureClick(feature.id)}
                className={`${feature.color} border-2 ${isActive ? feature.borderColor + ' shadow-lg' : 'border-gray-200'} rounded-lg p-6 cursor-pointer hover:shadow-md transition-all`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Icon className={`w-8 h-8 ${feature.textColor} mb-3`} />
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
                  </div>
                  {isActive ? (
                    <ChevronUp className={`w-5 h-5 ${feature.textColor}`} />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Keyword Suggestions Form */}
      {activeFeature === "keywords" && (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Generate Comprehensive SEO Analysis
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kw-company">Company Name *</Label>
                <Input
                  id="kw-company"
                  placeholder="e.g., Coffee Paradise"
                  value={keywordsForm.companyName}
                  onChange={(e) => setKeywordsForm({ ...keywordsForm, companyName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="kw-industry">Industry / Niche *</Label>
                <Input
                  id="kw-industry"
                  placeholder="e.g., Coffee Shop & Cafe"
                  value={keywordsForm.industry}
                  onChange={(e) => setKeywordsForm({ ...keywordsForm, industry: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="kw-location">Location (City, Country) *</Label>
                <Input
                  id="kw-location"
                  placeholder="e.g., New York, USA"
                  value={keywordsForm.location}
                  onChange={(e) => setKeywordsForm({ ...keywordsForm, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="kw-website">Website URL (Optional)</Label>
                <Input
                  id="kw-website"
                  placeholder="https://example.com"
                  value={keywordsForm.websiteUrl}
                  onChange={(e) => setKeywordsForm({ ...keywordsForm, websiteUrl: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              onClick={handleKeywordsAnalysis}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Keywords...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Generate SEO Analysis
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Competitor Analysis Form */}
      {activeFeature === "competitors" && (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Generate Comprehensive SEO Analysis
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="comp-company">Company Name *</Label>
                <Input
                  id="comp-company"
                  placeholder="e.g., Coffee Paradise"
                  value={competitorsForm.companyName}
                  onChange={(e) => setCompetitorsForm({ ...competitorsForm, companyName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="comp-industry">Industry / Niche *</Label>
                <Input
                  id="comp-industry"
                  placeholder="e.g., Coffee Shop & Cafe"
                  value={competitorsForm.industry}
                  onChange={(e) => setCompetitorsForm({ ...competitorsForm, industry: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="comp-location">Location (City, Country) *</Label>
                <Input
                  id="comp-location"
                  placeholder="e.g., New York, USA"
                  value={competitorsForm.location}
                  onChange={(e) => setCompetitorsForm({ ...competitorsForm, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="comp-urls">Competitor URLs (Optional, comma-separated)</Label>
                <Input
                  id="comp-urls"
                  placeholder="https://competitor1.com, https://competitor2.com"
                  value={competitorsForm.competitorUrls}
                  onChange={(e) => setCompetitorsForm({ ...competitorsForm, competitorUrls: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              onClick={handleCompetitorsAnalysis}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Competitors...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Generate SEO Analysis
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Local Audit Form */}
      {activeFeature === "local" && (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Generate Comprehensive SEO Analysis
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="local-company">Company Name *</Label>
                <Input
                  id="local-company"
                  placeholder="e.g., Coffee Paradise"
                  value={localForm.companyName}
                  onChange={(e) => setLocalForm({ ...localForm, companyName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="local-industry">Industry / Niche *</Label>
                <Input
                  id="local-industry"
                  placeholder="e.g., Coffee Shop & Cafe"
                  value={localForm.industry}
                  onChange={(e) => setLocalForm({ ...localForm, industry: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="local-location">Location (City, Country) *</Label>
                <Input
                  id="local-location"
                  placeholder="e.g., New York, USA"
                  value={localForm.location}
                  onChange={(e) => setLocalForm({ ...localForm, location: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              onClick={handleLocalAnalysis}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Local Audit...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Generate SEO Analysis
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Analysis Results
              </span>
              <Badge className="bg-green-100 text-green-700">
                Generated {new Date(analysisResult.generatedAt).toLocaleString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-[600px]">
                {JSON.stringify(analysisResult, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhancement Sections - 2 Rows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* SEO Health Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-purple-600" />
              SEO Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={healthScore.overall >= 70 ? "#10b981" : healthScore.overall >= 40 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(healthScore.overall / 100) * 351.86} 351.86`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{healthScore.overall}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Overall Score</p>
            </div>

            <div className="space-y-3">
              {[
                { label: "On-Page SEO", value: healthScore.onPage },
                { label: "Technical SEO", value: healthScore.technical },
                { label: "Local SEO", value: healthScore.local },
                { label: "Content Quality", value: healthScore.content },
                { label: "Backlink Profile", value: healthScore.backlinks },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-900">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.value >= 70 ? "bg-green-500" : item.value >= 40 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {analysisHistory.length === 0 && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Run analyses to see your SEO health score
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Analyses History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Recent Analyses
              </span>
              {analysisHistory.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysisHistory.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                No analyses yet. Run your first analysis to see history here.
              </p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {analysisHistory.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => viewHistoryItem(item)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {item.type === "keywords" && <Search className="w-4 h-4 text-blue-600" />}
                          {item.type === "competitors" && <Users className="w-4 h-4 text-purple-600" />}
                          {item.type === "local" && <MapPin className="w-4 h-4 text-green-600" />}
                          <span className="font-semibold text-sm text-gray-900">{item.companyName}</span>
                        </div>
                        <p className="text-xs text-gray-600">{item.industry} • {item.location}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Eye className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Technical SEO Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Technical SEO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { item: "SSL Certificate", status: "pass", score: "Secure" },
                { item: "Mobile Responsive", status: "pass", score: "Yes" },
                { item: "Page Speed", status: "warning", score: "65/100" },
                { item: "Sitemap.xml", status: "fail", score: "Missing" },
                { item: "Robots.txt", status: "pass", score: "Found" },
                { item: "Schema Markup", status: "warning", score: "Partial" },
                { item: "Meta Tags", status: "pass", score: "Optimized" },
              ].map((check) => (
                <div key={check.item} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    {check.status === "pass" && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                    {check.status === "warning" && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                    {check.status === "fail" && <AlertCircle className="w-4 h-4 text-red-600" />}
                    <span className="text-sm text-gray-700">{check.item}</span>
                  </div>
                  <span className={`text-xs font-medium ${check.status === "pass" ? "text-green-600" :
                    check.status === "warning" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                    {check.score}
                  </span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
              Run Technical Audit
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Second Row of Enhancement Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Keyword Rank Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Keyword Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { keyword: "coffee shop near me", position: 3, change: "+2" },
                { keyword: "best cafe in city", position: 7, change: "-1" },
                { keyword: "artisan coffee", position: 12, change: "+5" },
                { keyword: "local coffee roaster", position: 15, change: "0" },
                { keyword: "specialty coffee", position: 8, change: "+3" },
              ].map((kw) => (
                <div key={kw.keyword} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 truncate">{kw.keyword}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">#{kw.position}</span>
                    <span className={`text-xs font-medium ${kw.change.startsWith("+") ? "text-green-600" :
                      kw.change.startsWith("-") ? "text-red-600" :
                        "text-gray-400"
                      }`}>
                      {kw.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              + Add Keyword
            </Button>
          </CardContent>
        </Card>

        {/* Review Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="w-5 h-5 text-yellow-600" />
              Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900">4.2</div>
              <div className="text-sm text-gray-500">Average Rating</div>
              <div className="text-xs text-gray-400 mt-1">24 total reviews</div>
            </div>

            <div className="space-y-2 mb-4">
              {[
                { platform: "Google", count: 15, rating: 4.3 },
                { platform: "Yelp", count: 6, rating: 4.0 },
                { platform: "Facebook", count: 3, rating: 4.5 },
              ].map((platform) => (
                <div key={platform.platform} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{platform.platform}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium">{platform.rating}</span>
                    <span className="text-gray-400">({platform.count})</span>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full" variant="outline">
              Respond to Reviews
            </Button>
          </CardContent>
        </Card>

        {/* SEO Task Manager */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-orange-600" />
              SEO Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: "Fix missing sitemap.xml", priority: "high", done: false },
                { task: "Add 10 local citations", priority: "medium", done: false },
                { task: "Optimize page speed", priority: "high", done: false },
                { task: "Update meta descriptions", priority: "medium", done: true },
                { task: "Build 5 backlinks", priority: "low", done: false },
              ].map((task, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={task.done}
                    className="mt-1"
                    readOnly
                  />
                  <div className="flex-1">
                    <p className={`text-sm ${task.done ? "line-through text-gray-400" : "text-gray-700"}`}>
                      {task.task}
                    </p>
                    <Badge className={`text-xs mt-1 ${task.priority === "high" ? "bg-red-100 text-red-700" :
                      task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              + Add Task
            </Button>
          </CardContent>
        </Card>

        {/* Backlink Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-purple-600" />
              Backlink Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { site: "Yelp Business", difficulty: "Easy", type: "Directory" },
                { site: "Yellow Pages", difficulty: "Easy", type: "Directory" },
                { site: "Local Chamber", difficulty: "Medium", type: "Association" },
                { site: "Industry Blog", difficulty: "Hard", type: "Content" },
                { site: "Local News Site", difficulty: "Medium", type: "Editorial" },
              ].map((opp, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{opp.site}</p>
                    <p className="text-xs text-gray-400">{opp.type}</p>
                  </div>
                  <Badge className={`text-xs ${opp.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                    opp.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                    {opp.difficulty}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">
              Start Building Links
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
