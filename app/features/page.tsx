import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, FileText, CheckCircle, ArrowLeft } from "lucide-react"

export default function FeaturesPage() {
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
            <Link href="/features" className="text-purple-600 font-medium">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 font-medium">
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Powerful Features Built for Growth</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover how AI Analyzer helps you manage every aspect of your business with intelligent insights and
            automation.
          </p>
        </div>
      </section>

      {/* Feature 1: SEO Tracker */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Local SEO Tracker</h2>
              <p className="text-lg text-gray-600 mb-6">
                Track your keyword rankings across search engines in real-time. Monitor your competitors, identify
                opportunities, and get AI-powered recommendations to improve your local search visibility. Never miss a
                ranking change again.
              </p>
              <ul className="space-y-3">
                {[
                  "Real-time keyword tracking",
                  "Competitor analysis",
                  "Local citation audits",
                  "AI-powered optimization tips",
                  "Search volume insights",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg h-64 flex items-center justify-center">
              <TrendingUp className="w-32 h-32 text-blue-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Financial Management */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg h-64 flex items-center justify-center md:order-last">
              <DollarSign className="w-32 h-32 text-green-300" />
            </div>
            <div className="md:order-first">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Financial Management</h2>
              <p className="text-lg text-gray-600 mb-6">
                Take complete control of your business finances. Track expenses, manage income, and discover
                AI-identified cost-cutting opportunities. Get insights into your financial health with beautiful
                visualizations and actionable recommendations.
              </p>
              <ul className="space-y-3">
                {[
                  "Expense tracking by category",
                  "Income and revenue management",
                  "Financial health scoring",
                  "AI cost-cutting opportunities",
                  "Revenue vs expense analytics",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Content Planner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Content Planner</h2>
              <p className="text-lg text-gray-600 mb-6">
                Plan your content strategy with intelligence. Get AI-generated content ideas based on trending topics in
                your industry. Schedule posts across platforms and measure engagement with detailed performance metrics.
              </p>
              <ul className="space-y-3">
                {[
                  "AI-generated content ideas",
                  "Trending topic detection",
                  "Content calendar management",
                  "Performance analytics",
                  "Multi-platform scheduling",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg h-64 flex items-center justify-center">
              <FileText className="w-32 h-32 text-purple-300" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to explore all features?</h2>
          <p className="text-xl text-purple-100 mb-8">Start your free trial and experience the power of AI Analyzer.</p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Get Started Free
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
