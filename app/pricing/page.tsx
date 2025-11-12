import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-bold text-xl text-gray-900">AI Analyzer</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-gray-700 hover:text-purple-600 font-medium">
              Features
            </Link>
            <Link href="/pricing" className="text-purple-600 font-medium">
              Plans & Pricing
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-purple-600 font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium">
              About us
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium">
              Sign In
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your business. Start free and upgrade anytime as you grow.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <p className="text-2xl font-bold text-gray-900 mt-2">$0</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {["3 keywords tracked", "Basic analytics", "5 content posts/month", "Community support"].map(
                    (feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
                <Link href="/auth/signup" className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  $29<span className="text-lg text-gray-600">/mo</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {["5 Keywords tracked", "Basic expense tracking", "10 content posts/month", "Email support"].map(
                    (feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
                <Link href="/auth/signup" className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan - Highlighted */}
            <Card className="border-2 border-purple-600 relative md:row-span-1">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  $79<span className="text-lg text-gray-600">/mo</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "50 Keywords tracked",
                    "Advanced analytics",
                    "Unlimited content posts",
                    "Priority support",
                    "AI insights",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Custom Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Custom</CardTitle>
                <p className="text-2xl font-bold text-gray-900 mt-2">Bespoke</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Unlimited keywords",
                    "Custom integrations",
                    "Dedicated support",
                    "White-label options",
                    "Custom features",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 AI Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
