import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      description: "AI expert with 10+ years in machine learning and business automation.",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      description: "Full-stack engineer passionate about building scalable solutions.",
    },
    {
      name: "Emily Johnson",
      role: "Head of Product",
      description: "Product strategist focused on user experience and market fit.",
    },
  ]

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
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 font-medium">
              Plans & Pricing
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-purple-600 font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-purple-600 font-medium">
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About AI Analyzer</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're on a mission to democratize AI-powered business intelligence for companies of all sizes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            AI Analyzer was founded with a simple belief: every business, regardless of size, deserves access to
            enterprise-grade AI tools. We created a platform that combines the power of artificial intelligence with
            beautiful, intuitive design.
          </p>
          <p className="text-lg text-gray-600">
            Our goal is to help businesses make smarter decisions, reduce costs, and grow faster through actionable
            AI-driven insights.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We continuously push the boundaries of what's possible with AI technology to solve real business
                  problems.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe in clear communication and honest relationships with our customers and team members.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Enterprise-grade tools should be affordable and easy to use for businesses of all sizes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-purple-600 font-medium text-sm">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join us on our journey</h2>
          <p className="text-xl text-purple-100 mb-8">Start using AI Analyzer today and transform your business.</p>
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
