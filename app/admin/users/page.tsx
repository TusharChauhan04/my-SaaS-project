"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Edit, Trash2 } from "lucide-react"

interface UserData {
  id: string
  name: string
  email: string
  company: string
  plan: "free" | "pro" | "enterprise"
  joinDate: string
  status: "active" | "inactive"
  usage: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@techstartup.com",
      company: "TechStartup Inc",
      plan: "pro",
      joinDate: "2023-11-15",
      status: "active",
      usage: 87,
    },
    {
      id: "2",
      name: "Sarah Smith",
      email: "sarah@localcafe.com",
      company: "Local Cafe Co",
      plan: "free",
      joinDate: "2024-01-20",
      status: "active",
      usage: 45,
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@design.co",
      company: "Design Studio",
      plan: "enterprise",
      joinDate: "2023-08-10",
      status: "active",
      usage: 95,
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma@marketing.net",
      company: "Marketing Pro",
      plan: "pro",
      joinDate: "2024-02-01",
      status: "inactive",
      usage: 23,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<string>("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPlan = selectedPlan === "all" || user.plan === selectedPlan

    return matchesSearch && matchesPlan
  })

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "free":
        return "secondary"
      case "pro":
        return "default"
      case "enterprise":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "text-green-600" : "text-gray-400"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500 mt-2">Manage platform users and subscriptions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-gray-600">
                  <th className="text-left py-3 px-4 font-semibold">User</th>
                  <th className="text-left py-3 px-4 font-semibold">Company</th>
                  <th className="text-left py-3 px-4 font-semibold">Plan</th>
                  <th className="text-left py-3 px-4 font-semibold">Join Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Usage</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{user.company}</td>
                    <td className="py-4 px-4">
                      <Badge variant={getPlanColor(user.plan) as any}>{user.plan.toUpperCase()}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{user.joinDate}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded h-2 max-w-xs">
                          <div className="bg-blue-600 h-2 rounded" style={{ width: `${user.usage}%` }}></div>
                        </div>
                        <span className="text-xs font-medium">{user.usage}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
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
