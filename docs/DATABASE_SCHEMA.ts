// TypeScript Types for Database Schema

export interface User {
  id: string
  email: string
  password: string
  name: string
  companyId: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface Company {
  id: string
  name: string
  businessType: "agency" | "local"
  businessField: string
  country: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export interface TeamMember {
  id: string
  companyId: string
  userId: string
  role: "owner" | "admin" | "member"
  createdAt: Date
}

export interface SEOKeyword {
  id: string
  companyId: string
  keyword: string
  currentRank: number | null
  previousRank: number | null
  searchVolume: number | null
  difficulty: "Low" | "Medium" | "High" | null
  changeDirection: "up" | "down" | "neutral"
  trackedAt: Date
}

export interface Expense {
  id: string
  companyId: string
  category: string
  amount: number
  description?: string
  date: Date
  createdAt: Date
}

export interface Income {
  id: string
  companyId: string
  source: string
  amount: number
  description?: string
  date: Date
  createdAt: Date
}

export interface ContentPost {
  id: string
  companyId: string
  title: string
  contentType: "blog" | "instagram" | "facebook" | "twitter" | "youtube"
  scheduledDate?: Date
  engagement: number
  reach: number
  status: "draft" | "scheduled" | "published" | "archived"
  createdAt: Date
}

export interface AIInsight {
  id: string
  companyId: string
  insightType: "seo_opportunity" | "cost_saving" | "content_trend"
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  potentialValue?: number
  createdAt: Date
}

export interface Subscription {
  id: string
  companyId: string
  plan: "starter" | "pro" | "enterprise"
  status: "active" | "paused" | "cancelled"
  monthlyPrice: number
  startDate: Date
  endDate?: Date
  nextBillingDate?: Date
  createdAt: Date
}
