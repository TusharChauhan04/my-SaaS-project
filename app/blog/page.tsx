import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "How to Improve Your Local SEO Ranking",
      excerpt: "Learn the best practices for boosting your local search visibility and attracting more customers.",
      date: "Dec 15, 2024",
      category: "SEO",
    },
    {
      id: 2,
      title: "5 AI Cost-Cutting Strategies for 2025",
      excerpt: "Discover how AI can help you identify and eliminate unnecessary business expenses.",
      date: "Dec 10, 2024",
      category: "Finance",
    },
    {
      id: 3,
      title: "Content Calendar Best Practices",
      excerpt: "Master the art of planning and scheduling content that resonates with your audience.",
      date: "Dec 5, 2024",
      category: "Content",
    },
    {
      id: 4,
      title: "Understanding AI-Powered Analytics",
      excerpt: "Get insights into how machine learning helps you make better business decisions.",
      date: "Nov 28, 2024",
      category: "AI",
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
            <Link href="/blog" className="text-purple-600 font-medium">
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">AI Analyzer Blog</h1>
          <p className="text-xl text-gray-600 mb-8">
            Insights, tips, and strategies to help you grow your business with AI.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {post.category}
                      </div>
                      <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                    Read More →
                  </Link>
                </CardContent>
              </Card>
            ))}
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
