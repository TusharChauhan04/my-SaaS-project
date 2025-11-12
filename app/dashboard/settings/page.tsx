"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("Tech Startup Inc")
  const [industry, setIndustry] = useState("Technology")
  const [location, setLocation] = useState("San Francisco, CA")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
      </div>

      {/* Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Business Name</label>
            <Input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter business name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Retail</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />
          </div>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 w-full">
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-gray-900">Pro Plan</h3>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold text-purple-600">$999</span>
              <span className="text-gray-600">/month</span>
            </div>
            <p className="text-sm text-gray-600 mt-3">Next billing: Dec 1, 2024</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Upgrade to Enterprise</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Dec 1, 2024", amount: "$999", status: "Paid" },
              { date: "Nov 1, 2024", amount: "$999", status: "Paid" },
              { date: "Oct 1, 2024", amount: "$999", status: "Paid" },
            ].map((bill, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{bill.date}</p>
                  <p className="text-sm text-gray-500">Invoice</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{bill.amount}</p>
                  <p className="text-xs text-green-600">{bill.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-900 mb-2">API Key</label>
            <div className="flex gap-2">
              <Input value="sk_live_••••••••••••••••" readOnly className="bg-white" />
              <Button variant="outline">Copy</Button>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Generate New API Key
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
