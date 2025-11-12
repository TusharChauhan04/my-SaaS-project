import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, TrendingUp, DollarSign, FileText, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-bold text-xl text-gray-900">AI Analyzer</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-gray-700 hover:text-purple-600 font-medium transition">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 font-medium transition">
              Plans & Pricing
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-purple-600 font-medium transition">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium transition">
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">AI-Powered Business Management</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Track SEO rankings, manage finances, and plan content all in one intelligent platform. Powered by AI to give
            you actionable insights for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* SEO Tracker */}
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Local SEO Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor keyword rankings, analyze competitors, and get AI-powered recommendations to improve your
                  local search visibility.
                </p>
              </CardContent>
            </Card>

            {/* Finance Manager */}
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Financial Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track expenses, manage revenue, and discover AI-identified cost-cutting opportunities to optimize your
                  business finances.
                </p>
              </CardContent>
            </Card>

            {/* Content Planner */}
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Content Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Plan content strategy, get trending ideas, and measure engagement. Let AI suggest what content will
                  resonate with your audience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  $29<span className="text-lg text-gray-600">/mo</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {["5 Keywords tracked", "Basic expense tracking", "10 content posts/month", "Email support"].map(
                    (feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
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
            <Card className="border-2 border-purple-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <p className="text-3xl font-bold text-gray-900 mt-2">
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
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <p className="text-3xl font-bold text-gray-900 mt-2">Custom</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Unlimited keywords",
                    "Custom integrations",
                    "Dedicated support",
                    "White-label options",
                    "Custom reports",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
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

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of businesses using AI Analyzer to grow smarter.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Your Free Trial Today
            </Button>
          </Link>
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
