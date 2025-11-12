"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Upload, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface CostSavingOpportunity {
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  savings: number
}

export default function FinancePage() {
  const [expenseAmount, setExpenseAmount] = useState("")
  const [expenseCategory, setExpenseCategory] = useState("")
  const [incomeAmount, setIncomeAmount] = useState("")
  const [incomeSource, setIncomeSource] = useState("")

  const costSavings: CostSavingOpportunity[] = [
    {
      title: "Negotiate Supplier Contract",
      description: "Your office supplies vendor has 15% higher prices than market average",
      priority: "High",
      savings: 450,
    },
    {
      title: "Consolidate Software Subscriptions",
      description: "Mailchimp + HubSpot have overlapping features. Consider switching to one platform",
      priority: "Medium",
      savings: 180,
    },
    {
      title: "Optimize Energy Usage",
      description: "Install motion sensors for lighting. Payback period: 8 months",
      priority: "Low",
      savings: 120,
    },
    {
      title: "Review Marketing ROI",
      description: "Facebook ads campaign has 0.8% CTR (industry avg: 2.5%). Reallocate budget",
      priority: "High",
      savings: 490,
    },
  ]

  const revenueExpensesData = [
    { month: "Jan", revenue: 12000, expenses: 8500 },
    { month: "Feb", revenue: 14000, expenses: 8200 },
    { month: "Mar", revenue: 15000, expenses: 8500 },
    { month: "Apr", revenue: 16000, expenses: 9000 },
  ]

  const expensesData = [
    { category: "Rent", value: 4200 },
    { category: "Supplies", value: 1800 },
    { category: "Marketing", value: 2500 },
    { category: "Utilities", value: 800 },
    { category: "Salaries", value: 5200 },
  ]

  const handleAddExpense = () => {
    if (expenseAmount && expenseCategory) {
      console.log("Adding expense:", { category: expenseCategory, amount: expenseAmount })
      setExpenseAmount("")
      setExpenseCategory("")
    }
  }

  const handleAddIncome = () => {
    if (incomeAmount && incomeSource) {
      console.log("Adding income:", { source: incomeSource, amount: incomeAmount })
      setIncomeAmount("")
      setIncomeSource("")
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Low":
        return "bg-blue-100 text-blue-700"
      default:
        return ""
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Financial Management</h1>
          <p className="text-gray-500 mt-2">Track expenses, revenue, and optimize your finances</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <Upload className="w-4 h-4 mr-2" />
            Import Expenses
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Cost-Saving Opportunities Summary */}
      <div
        style={{
          backgroundColor: "#f0fdf4",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          border: "1px solid #dcfce7",
        }}
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">Cost-Saving Opportunities</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              <li>✓ Negotiate software licenses - Save up to $150/month</li>
              <li>✓ Consolidate vendors - 3 suppliers can be merged</li>
              <li>✓ Review utility contracts - Current plan 15% above market</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$8,600</div>
            <p className="text-xs text-gray-600 mt-2">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recurring Monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$7,800</div>
            <p className="text-xs text-gray-600 mt-2">Estimated annual: $93,600</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">82%</div>
            <p className="text-xs text-green-600 mt-2">Good financial health</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueExpensesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Expense Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expensesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" name="Amount ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Add Expense Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Category (e.g., Rent, Supplies)"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
            />
            <Input
              placeholder="Amount"
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={handleAddExpense} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Income / Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Income Source (e.g., Sales, Services)"
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
            />
            <Input
              placeholder="Amount"
              type="number"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={handleAddIncome} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-green-600" />
            AI Cost-Cutting Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {costSavings.map((opportunity, idx) => (
              <div key={idx} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{opportunity.title}</h4>
                      <Badge className={getPriorityColor(opportunity.priority)}>{opportunity.priority} Priority</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{opportunity.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">${opportunity.savings}/mo</p>
                    <Button variant="link" size="sm" className="text-blue-600 mt-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
