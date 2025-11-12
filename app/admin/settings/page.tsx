"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Save, AlertCircle } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    platformName: "BusinessZen",
    supportEmail: "support@businesszen.com",
    maxUsers: 1000,
    maintenanceMode: false,
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">Configure platform settings</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Platform Name</label>
            <Input
              value={settings.platformName}
              onChange={(e) => handleChange("platformName", e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Support Email</label>
            <Input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleChange("supportEmail", e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Max Users</label>
            <Input
              type="number"
              value={settings.maxUsers}
              onChange={(e) => handleChange("maxUsers", Number.parseInt(e.target.value))}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Maintenance Mode</p>
              <p className="text-xs text-gray-500 mt-1">Disable platform access for maintenance</p>
            </div>
            <button
              onClick={() => handleChange("maintenanceMode", !settings.maintenanceMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.maintenanceMode ? "bg-red-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.maintenanceMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>

          {saved && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Settings saved successfully
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Public Key</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-mono text-gray-700 bg-white p-2 rounded border">
                  pk_live_51234567890
                </code>
                <Button variant="outline" size="sm">
                  Copy
                </Button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Secret Key</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-mono text-gray-700 bg-white p-2 rounded border">
                  sk_live_••••••••••••••••
                </code>
                <Button variant="outline" size="sm">
                  Show
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-xs text-gray-600 mt-1">Enabled for all admin users</p>
            </div>
            <Badge>Enabled</Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <p className="font-medium text-gray-900">SSL Certificate</p>
              <p className="text-xs text-gray-600 mt-1">Valid until Dec 31, 2025</p>
            </div>
            <Badge>Valid</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
