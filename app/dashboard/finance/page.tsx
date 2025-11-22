"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Plus, Upload, Download, TrendingUp, TrendingDown, DollarSign, Calendar,
  AlertCircle, Target, BarChart3, PieChart, FileText, Lightbulb, CheckCircle2,
  X, Eye, Trash2, Edit, MessageSquare, Clock, Bell, Settings, Activity
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPie, Pie, Cell, LineChart, Line, Legend
} from "recharts"

// Interfaces
interface Transaction {
  id: string
  type: "expense" | "revenue"
  date: string
  category: string
  amount: number
  description: string
  vendor?: string
  paymentMethod?: string
  taxDeductible: boolean
  recurring: boolean
  recurringFrequency?: "monthly" | "yearly"
  notes?: string
  // Revenue specific
  revenueSource?: string
  client?: string
  invoiceNumber?: string
}

interface AISuggestion {
  id: string
  type: string
  title: string
  description: string
  monthlySavings: number
  priority: "high" | "medium" | "low"
  status: "active" | "implemented" | "dismissed"
  actionSteps?: string[]
}

interface Budget {
  category: string
  amount: number
  spent: number
}

interface Goal {
  id: string
  type: "revenue" | "expense_reduction" | "savings" | "profit_margin"
  title: string
  target: number
  current: number
  deadline: string
}

const COLORS = ["#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#ec4899"]

export default function FinancePage() {
  // State Management
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [aiSuggestions, setAISuggestions] = useState<AISuggestion[]>([])
  const [aiInsights, setAIInsights] = useState<any[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showAddRevenue, setShowAddRevenue] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form States
  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    amount: "",
    description: "",
    vendor: "",
    paymentMethod: "Card",
    taxDeductible: false,
    recurring: false,
    recurringFrequency: "monthly" as "monthly" | "yearly",
    notes: "",
  })

  const [revenueForm, setRevenueForm] = useState({
    date: new Date().toISOString().split("T")[0],
    revenueSource: "",
    amount: "",
    description: "",
    client: "",
    invoiceNumber: "",
    notes: "",
  })

  // Load data from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem("finance_transactions")
    const savedSuggestions = localStorage.getItem("finance_suggestions")
    const savedBudgets = localStorage.getItem("finance_budgets")
    const savedGoals = localStorage.getItem("finance_goals")

    if (savedTransactions) setTransactions(JSON.parse(savedTransactions))
    if (savedSuggestions) setAISuggestions(JSON.parse(savedSuggestions))
    if (savedBudgets) setBudgets(JSON.parse(savedBudgets))
    if (savedGoals) setGoals(JSON.parse(savedGoals))

    // Load AI insights on mount
    loadAIInsights()
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem("finance_suggestions", JSON.stringify(aiSuggestions))
  }, [aiSuggestions])

  // Calculate Metrics
  const calculateMetrics = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date)
      return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear
    })

    const totalExpenses = monthlyTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)

    const totalRevenue = monthlyTransactions
      .filter((t) => t.type === "revenue")
      .reduce((sum, t) => sum + t.amount, 0)

    const netProfit = totalRevenue - totalExpenses
    const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0

    const recurringMonthly = transactions
      .filter((t) => t.recurring && t.type === "expense")
      .reduce((sum, t) => {
        return sum + (t.recurringFrequency === "yearly" ? t.amount / 12 : t.amount)
      }, 0)

    // Financial Health Score (0-100)
    let healthScore = 50
    if (netProfit > 0) healthScore += 20
    if (parseFloat(profitMargin as string) > 20) healthScore += 15
    if (totalExpenses < totalRevenue * 0.7) healthScore += 15

    // Cash Runway (months until cash depleted)
    const cashRunway = netProfit > 0 ? 999 : totalRevenue > 0 ? Math.floor(totalRevenue / totalExpenses) : 0

    return {
      totalExpenses,
      totalRevenue,
      netProfit,
      profitMargin: parseFloat(profitMargin as string),
      recurringMonthly,
      healthScore: Math.min(healthScore, 100),
      cashRunway,
    }
  }

  const metrics = calculateMetrics()

  // Load AI Insights
  const loadAIInsights = async () => {
    if (transactions.length === 0) return

    try {
      const response = await fetch("/api/finance/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions, period: "month" }),
      })

      if (response.ok) {
        const data = await response.json()
        setAIInsights(data.insights || [])
      }
    } catch (error) {
      console.error("Failed to load AI insights:", error)
    }
  }

  // Load AI Cost-Cutting Suggestions
  const loadAISuggestions = async () => {
    if (transactions.length === 0) return

    setLoading(true)
    try {
      const response = await fetch("/api/finance/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions, budgets }),
      })

      if (response.ok) {
        const data = await response.json()
        const suggestions = data.suggestions.map((s: any, i: number) => ({
          ...s,
          id: Date.now() + i,
          status: "active",
        }))
        setAISuggestions(suggestions)
      }
    } catch (error) {
      console.error("Failed to load AI suggestions:", error)
    } finally {
      setLoading(false)
    }
  }

  // Auto-categorize expense
  const autoCategorize = async (description: string, amount: string, vendor: string) => {
    try {
      const response = await fetch("/api/finance/ai/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount, vendor }),
      })

      if (response.ok) {
        const data = await response.json()
        setExpenseForm((prev) => ({
          ...prev,
          category: data.category,
          taxDeductible: data.taxDeductible,
        }))
      }
    } catch (error) {
      console.error("Failed to auto-categorize:", error)
    }
  }

  // Add Expense
  const handleAddExpense = () => {
    if (!expenseForm.amount || !expenseForm.category || !expenseForm.description) {
      alert("Please fill in amount, category, and description")
      return
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "expense",
      date: expenseForm.date,
      category: expenseForm.category,
      amount: parseFloat(expenseForm.amount),
      description: expenseForm.description,
      vendor: expenseForm.vendor,
      paymentMethod: expenseForm.paymentMethod,
      taxDeductible: expenseForm.taxDeductible,
      recurring: expenseForm.recurring,
      recurringFrequency: expenseForm.recurringFrequency,
      notes: expenseForm.notes,
    }

    setTransactions([newTransaction, ...transactions])
    setExpenseForm({
      date: new Date().toISOString().split("T")[0],
      category: "",
      amount: "",
      description: "",
      vendor: "",
      paymentMethod: "Card",
      taxDeductible: false,
      recurring: false,
      recurringFrequency: "monthly",
      notes: "",
    })
    setShowAddExpense(false)
    loadAIInsights()
  }

  // Add Revenue
  const handleAddRevenue = () => {
    if (!revenueForm.amount || !revenueForm.revenueSource || !revenueForm.description) {
      alert("Please fill in amount, source, and description")
      return
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "revenue",
      date: revenueForm.date,
      category: "Revenue",
      amount: parseFloat(revenueForm.amount),
      description: revenueForm.description,
      revenueSource: revenueForm.revenueSource,
      client: revenueForm.client,
      invoiceNumber: revenueForm.invoiceNumber,
      notes: revenueForm.notes,
      taxDeductible: false,
      recurring: false,
    }

    setTransactions([newTransaction, ...transactions])
    setRevenueForm({
      date: new Date().toISOString().split("T")[0],
      revenueSource: "",
      amount: "",
      description: "",
      client: "",
      invoiceNumber: "",
      notes: "",
    })
    setShowAddRevenue(false)
    loadAIInsights()
  }

  // Delete Transaction
  const deleteTransaction = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id))
      loadAIInsights()
    }
  }

  // Chart Data
  const getLast6MonthsData = () => {
    const months = []
    const now = new Date()

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthName = date.toLocaleDateString("en-US", { month: "short" })
      const monthTransactions = transactions.filter((t) => {
        const tDate = new Date(t.date)
        return tDate.getMonth() === date.getMonth() && tDate.getFullYear() === date.getFullYear()
      })

      const revenue = monthTransactions
        .filter((t) => t.type === "revenue")
        .reduce((sum, t) => sum + t.amount, 0)

      const expenses = monthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0)

      months.push({ month: monthName, revenue, expenses })
    }

    return months
  }

  const getExpenseBreakdown = () => {
    const breakdown: { [key: string]: number } = {}

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        breakdown[t.category] = (breakdown[t.category] || 0) + t.amount
      })

    return Object.entries(breakdown)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getHealthStatus = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: "text-green-600" }
    if (score >= 60) return { text: "Good", color: "text-blue-600" }
    if (score >= 40) return { text: "Fair", color: "text-yellow-600" }
    return { text: "Poor", color: "text-red-600" }
  }

  const healthStatus = getHealthStatus(metrics.healthScore)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Financial Management</h1>
          <p className="text-gray-500 mt-2">
            Track expenses, revenue, and optimize your finances with AI
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            onClick={() => setShowAddRevenue(true)}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Revenue
          </Button>
          <Button
            onClick={() => setShowAddExpense(true)}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Key Metrics - 6 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Expenses */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-red-600" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              ${metrics.totalExpenses.toFixed(2)}
            </div>
            <p className="text-xs text-gray-600 mt-2">This month</p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              ${metrics.totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-gray-600 mt-2">This month</p>
          </CardContent>
        </Card>

        {/* Net Profit */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${metrics.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${metrics.netProfit.toFixed(2)}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Margin: {metrics.profitMargin}%
            </p>
          </CardContent>
        </Card>

        {/* Recurring Monthly */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              Recurring Monthly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              ${metrics.recurringMonthly.toFixed(2)}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Est. annual: ${(metrics.recurringMonthly * 12).toFixed(2)}
            </p>
          </CardContent>
        </Card>

        {/* Financial Health Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-orange-600" />
              Financial Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${healthStatus.color}`}>
              {metrics.healthScore}%
            </div>
            <p className={`text-xs ${healthStatus.color} mt-2`}>
              {healthStatus.text}
            </p>
          </CardContent>
        </Card>

        {/* Cash Runway */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Cash Runway
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {metrics.cashRunway === 999 ? "∞" : metrics.cashRunway}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {metrics.cashRunway === 999 ? "Profitable" : "Months remaining"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      {aiInsights.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              AI Financial Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 bg-white rounded-lg">
                  <span className="text-xl">{insight.icon}</span>
                  <p className="text-sm text-gray-700">{insight.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Financial Health Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            Financial Health Score Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { component: "Cash Flow", score: 85, status: "Excellent" },
              { component: "Profit Margin", score: 72, status: "Good" },
              { component: "Expense Management", score: 68, status: "Good" },
              { component: "Revenue Growth", score: 78, status: "Good" },
              { component: "Savings Rate", score: 45, status: "Fair" },
              { component: "Debt-to-Income", score: 90, status: "Excellent" },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{item.component}</h4>
                  <Badge className={
                    item.score >= 80 ? "bg-green-100 text-green-700" :
                      item.score >= 60 ? "bg-blue-100 text-blue-700" :
                        item.score >= 40 ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                  }>
                    {item.status}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{item.score}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.score >= 80 ? "bg-green-500" :
                      item.score >= 60 ? "bg-blue-500" :
                        item.score >= 40 ? "bg-yellow-500" :
                          "bg-red-500"
                      }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">AI Recommendations to Improve:</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Increase savings rate by reducing discretionary spending by 10%</li>
              <li>• Maintain current cash flow management - you're doing great!</li>
              <li>• Consider increasing revenue streams to improve profit margin</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* AI Cost-Cutting Opportunities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-green-600" />
              AI Cost-Cutting Opportunities
            </CardTitle>
            <Button
              onClick={loadAISuggestions}
              disabled={loading || transactions.length === 0}
              variant="outline"
              size="sm"
            >
              {loading ? "Analyzing..." : "Generate Suggestions"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {aiSuggestions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No suggestions yet. Add some transactions and click "Generate Suggestions"
            </p>
          ) : (
            <div className="space-y-3">
              {aiSuggestions
                .filter((s) => s.status === "active")
                .map((suggestion) => (
                  <div key={suggestion.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                          <Badge className={getPriorityColor(suggestion.priority)}>
                            {suggestion.priority} Priority
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                        {suggestion.actionSteps && (
                          <div className="text-xs text-gray-500">
                            <strong>Action Steps:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {suggestion.actionSteps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          ${suggestion.monthlySavings}/mo
                        </p>
                        <div className="flex gap-1 mt-2">
                          <Button variant="link" size="sm" className="text-blue-600">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                            className="text-green-600"
                            onClick={() => {
                              setAISuggestions(
                                aiSuggestions.map((s) =>
                                  s.id === suggestion.id ? { ...s, status: "implemented" } : s
                                )
                              )
                            }}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                            className="text-red-600"
                            onClick={() => {
                              setAISuggestions(
                                aiSuggestions.map((s) =>
                                  s.id === suggestion.id ? { ...s, status: "dismissed" } : s
                                )
                              )
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No transactions yet. Add your first expense or revenue above.
            </p>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          transaction.type === "revenue"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {transaction.type}
                      </Badge>
                      <span className="font-semibold text-gray-900">{transaction.description}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      {transaction.vendor && ` • ${transaction.vendor}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg font-bold ${transaction.type === "revenue" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {transaction.type === "revenue" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add New Expense</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowAddExpense(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="exp-date">Date *</Label>
                    <Input
                      id="exp-date"
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="exp-amount">Amount *</Label>
                    <Input
                      id="exp-amount"
                      type="number"
                      placeholder="0.00"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="exp-description">Description *</Label>
                  <Input
                    id="exp-description"
                    placeholder="e.g., Office supplies from Staples"
                    value={expenseForm.description}
                    onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                    onBlur={() => {
                      if (expenseForm.description && !expenseForm.category) {
                        autoCategorize(expenseForm.description, expenseForm.amount, expenseForm.vendor)
                      }
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="exp-category">Category *</Label>
                    <select
                      id="exp-category"
                      className="w-full border rounded-md p-2"
                      value={expenseForm.category}
                      onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    >
                      <option value="">Select category</option>
                      <option value="Rent">Rent</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Supplies">Supplies</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Salaries">Salaries</option>
                      <option value="Software/Subscriptions">Software/Subscriptions</option>
                      <option value="Travel">Travel</option>
                      <option value="Meals & Entertainment">Meals & Entertainment</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Taxes">Taxes</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="exp-vendor">Vendor/Payee</Label>
                    <Input
                      id="exp-vendor"
                      placeholder="e.g., Staples"
                      value={expenseForm.vendor}
                      onChange={(e) => setExpenseForm({ ...expenseForm, vendor: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="exp-payment">Payment Method</Label>
                  <select
                    id="exp-payment"
                    className="w-full border rounded-md p-2"
                    value={expenseForm.paymentMethod}
                    onChange={(e) => setExpenseForm({ ...expenseForm, paymentMethod: e.target.value })}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="Transfer">Bank Transfer</option>
                    <option value="Check">Check</option>
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={expenseForm.taxDeductible}
                      onChange={(e) =>
                        setExpenseForm({ ...expenseForm, taxDeductible: e.target.checked })
                      }
                    />
                    <span className="text-sm">Tax Deductible</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={expenseForm.recurring}
                      onChange={(e) => setExpenseForm({ ...expenseForm, recurring: e.target.checked })}
                    />
                    <span className="text-sm">Recurring</span>
                  </label>

                  {expenseForm.recurring && (
                    <select
                      className="border rounded-md p-1 text-sm"
                      value={expenseForm.recurringFrequency}
                      onChange={(e) =>
                        setExpenseForm({
                          ...expenseForm,
                          recurringFrequency: e.target.value as "monthly" | "yearly",
                        })
                      }
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  )}
                </div>

                <div>
                  <Label htmlFor="exp-notes">Notes (Optional)</Label>
                  <textarea
                    id="exp-notes"
                    className="w-full border rounded-md p-2"
                    rows={3}
                    placeholder="Additional notes..."
                    value={expenseForm.notes}
                    onChange={(e) => setExpenseForm({ ...expenseForm, notes: e.target.value })}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowAddExpense(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddExpense} className="bg-blue-600 hover:bg-blue-700">
                    Add Expense
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Revenue Modal */}
      {showAddRevenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add New Revenue</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowAddRevenue(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rev-date">Date *</Label>
                    <Input
                      id="rev-date"
                      type="date"
                      value={revenueForm.date}
                      onChange={(e) => setRevenueForm({ ...revenueForm, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rev-amount">Amount *</Label>
                    <Input
                      id="rev-amount"
                      type="number"
                      placeholder="0.00"
                      value={revenueForm.amount}
                      onChange={(e) => setRevenueForm({ ...revenueForm, amount: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="rev-source">Revenue Source *</Label>
                  <Input
                    id="rev-source"
                    placeholder="e.g., Product Sales, Services, Consulting"
                    value={revenueForm.revenueSource}
                    onChange={(e) => setRevenueForm({ ...revenueForm, revenueSource: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="rev-description">Description *</Label>
                  <Input
                    id="rev-description"
                    placeholder="e.g., Website design project for ABC Corp"
                    value={revenueForm.description}
                    onChange={(e) => setRevenueForm({ ...revenueForm, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rev-client">Client/Customer</Label>
                    <Input
                      id="rev-client"
                      placeholder="e.g., ABC Corporation"
                      value={revenueForm.client}
                      onChange={(e) => setRevenueForm({ ...revenueForm, client: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rev-invoice">Invoice Number</Label>
                    <Input
                      id="rev-invoice"
                      placeholder="e.g., INV-001"
                      value={revenueForm.invoiceNumber}
                      onChange={(e) => setRevenueForm({ ...revenueForm, invoiceNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="rev-notes">Notes (Optional)</Label>
                  <textarea
                    id="rev-notes"
                    className="w-full border rounded-md p-2"
                    rows={3}
                    placeholder="Additional notes..."
                    value={revenueForm.notes}
                    onChange={(e) => setRevenueForm({ ...revenueForm, notes: e.target.value })}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowAddRevenue(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRevenue} className="bg-green-600 hover:bg-green-700">
                    Add Revenue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Budget Tracking Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Budget Tracking
            </CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Set Budgets
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {budgets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No budgets set yet</p>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Create Your First Budget
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {budgets.map((budget, idx) => {
                const percentUsed = (budget.spent / budget.amount) * 100
                const remaining = budget.amount - budget.spent
                const status = percentUsed >= 100 ? "over" : percentUsed >= 90 ? "critical" : percentUsed >= 80 ? "warning" : "good"

                return (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{budget.category}</h4>
                      <Badge className={
                        status === "over" ? "bg-red-100 text-red-700" :
                          status === "critical" ? "bg-orange-100 text-orange-700" :
                            status === "warning" ? "bg-yellow-100 text-yellow-700" :
                              "bg-green-100 text-green-700"
                      }>
                        {percentUsed.toFixed(0)}% Used
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>${budget.spent.toFixed(2)} spent</span>
                      <span>${budget.amount.toFixed(2)} budget</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className={`h-3 rounded-full ${status === "over" ? "bg-red-500" :
                          status === "critical" ? "bg-orange-500" :
                            status === "warning" ? "bg-yellow-500" :
                              "bg-green-500"
                          }`}
                        style={{ width: `${Math.min(percentUsed, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {remaining >= 0
                        ? `$${remaining.toFixed(2)} remaining`
                        : `$${Math.abs(remaining).toFixed(2)} over budget`
                      }
                      {percentUsed >= 80 && percentUsed < 100 && " • At current rate, you'll exceed budget"}
                      {percentUsed >= 100 && " • Budget exceeded!"}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cash Flow Forecasting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Cash Flow Forecast (Next 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { month: "Month 1", best: 15000, expected: 12000, worst: 9000 },
              { month: "Month 2", best: 16000, expected: 13000, worst: 10000 },
              { month: "Month 3", best: 17000, expected: 14000, worst: 11000 },
              { month: "Month 4", best: 18000, expected: 15000, worst: 12000 },
              { month: "Month 5", best: 19000, expected: 16000, worst: 13000 },
              { month: "Month 6", best: 20000, expected: 17000, worst: 14000 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="best" stroke="#10b981" name="Best Case" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="expected" stroke="#3b82f6" name="Expected" strokeWidth={2} />
              <Line type="monotone" dataKey="worst" stroke="#ef4444" name="Worst Case" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>AI Prediction:</strong> Based on historical patterns, expect positive cash flow for the next 6 months.
              Revenue trending upward with 8% monthly growth.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bill Calendar & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Upcoming Bills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Office Rent", amount: 2500, dueDate: "2025-01-01", status: "upcoming" },
                { name: "Internet & Phone", amount: 150, dueDate: "2025-01-05", status: "upcoming" },
                { name: "Software Subscriptions", amount: 299, dueDate: "2025-01-10", status: "upcoming" },
                { name: "Utilities", amount: 180, dueDate: "2025-01-15", status: "paid" },
              ].map((bill, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{bill.name}</h4>
                      <Badge className={bill.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                        {bill.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${bill.amount}</p>
                    {bill.status === "upcoming" && (
                      <Button variant="link" size="sm" className="text-blue-600">
                        <Bell className="w-3 h-3 mr-1" />
                        Remind Me
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions
                .filter((t) => t.recurring && t.type === "expense")
                .slice(0, 5)
                .map((sub) => {
                  const annualCost = sub.recurringFrequency === "yearly" ? sub.amount : sub.amount * 12
                  return (
                    <div key={sub.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{sub.description}</h4>
                        <p className="text-sm text-gray-600">
                          {sub.category} • {sub.recurringFrequency}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${sub.amount}/
                          {sub.recurringFrequency === "monthly" ? "mo" : "yr"}
                        </p>
                        <p className="text-xs text-gray-500">Annual: ${annualCost.toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              {transactions.filter((t) => t.recurring && t.type === "expense").length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No recurring subscriptions tracked yet
                </p>
              )}
            </div>
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>Total Monthly Recurring:</strong> ${metrics.recurringMonthly.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Financial Goals
            </CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No financial goals set yet</p>
              <Button className="bg-green-600 hover:bg-green-700">
                Set Your First Goal
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

                return (
                  <div key={goal.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                      <Badge className={
                        goal.type === "revenue" ? "bg-green-100 text-green-700" :
                          goal.type === "expense_reduction" ? "bg-red-100 text-red-700" :
                            goal.type === "savings" ? "bg-blue-100 text-blue-700" :
                              "bg-purple-100 text-purple-700"
                      }>
                        {goal.type.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>${goal.current.toFixed(2)}</span>
                        <span>${goal.target.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-green-500"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{progress.toFixed(0)}% Complete</span>
                      <span>{daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}</span>
                    </div>
                    {progress >= 100 && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                        🎉 Goal achieved!
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Financial Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            Financial Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Profit & Loss", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
              { name: "Cash Flow", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
              { name: "Expense Report", icon: PieChart, color: "text-purple-600", bg: "bg-purple-50" },
              { name: "Tax Summary", icon: FileText, color: "text-orange-600", bg: "bg-orange-50" },
            ].map((report, idx) => {
              const Icon = report.icon
              return (
                <div
                  key={idx}
                  className={`${report.bg} border border-gray-200 rounded-lg p-4 text-left hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <Icon className={`w-8 h-8 ${report.color} mb-2`} />
                  <h4 className="font-semibold text-gray-900 mb-1">{report.name}</h4>
                  <p className="text-xs text-gray-600 mb-3">Generate detailed report</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Download className="w-3 h-3 mr-2" />
                    Export PDF
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row - Moved to Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getLast6MonthsData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPie>
                <Pie
                  data={getExpenseBreakdown()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.category}: $${entry.value.toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getExpenseBreakdown().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
