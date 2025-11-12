"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface BillingData {
  month: string
  mrr: number
  arr: number
  churn: number
  newRevenue: number
}

export default function BillingPage() {
  const billingData: BillingData[] = [
    { month: "Jan", mrr: 18000, arr: 216000, churn: 2, newRevenue: 5000 },
    { month: "Feb", mrr: 21000, arr: 252000, churn: 1, newRevenue: 8000 },
    { month: "Mar", mrr: 24500, arr: 294000, churn: 2, newRevenue: 9500 },
    { month: "Apr", mrr: 28500, arr: 342000, churn: 1, newRevenue: 12000 },
  ]

  const planStats = [
    { plan: "Free", users: 56, revenue: 0, percentage: 23 },
    { plan: "Pro", users: 128, revenue: 12800, percentage: 52 },
    { plan: "Enterprise", users: 61, revenue: 15700, percentage: 25 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing & Revenue</h1>
        <p className="text-gray-500 mt-2">Monitor subscription metrics and revenue</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Monthly Recurring Revenue
              <DollarSign className="w-5 h-5 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$28.5K</div>
            <p className="text-xs text-green-600 mt-2">+20% MoM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Annual Run Rate
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$342K</div>
            <p className="text-xs text-blue-600 mt-2">+58% YoY</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Churn Rate
              <Users className="w-5 h-5 text-red-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0.8%</div>
            <p className="text-xs text-green-600 mt-2">Industry avg: 2.5%</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend (MRR & ARR)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={billingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="mrr" fill="#3b82f6" name="MRR ($)" />
              <Bar yAxisId="right" dataKey="arr" fill="#8b5cf6" name="ARR ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Plan Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {planStats.map((stat, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{stat.plan}</p>
                    <p className="text-xs text-gray-500">{stat.users} users</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${stat.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{stat.percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { user: "John Doe", amount: 99, type: "Subscription Renewal", date: "Today" },
              { user: "Sarah Smith", amount: 29, type: "Monthly Charge", date: "Yesterday" },
              { user: "Mike Johnson", amount: 299, type: "Yearly Plan", date: "2 days ago" },
              { user: "Emma Wilson", amount: 99, type: "Subscription Renewal", date: "3 days ago" },
            ].map((tx, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{tx.user}</p>
                  <p className="text-xs text-gray-500">{tx.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${tx.amount}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
