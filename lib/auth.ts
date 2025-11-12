import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-key-change-in-production")

export interface Session {
  user: {
    id: string
    email: string
    name: string
    company: string
    role: "user" | "admin"
  }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as unknown as Session
  } catch (err) {
    return null
  }
}

export async function setSessionCookie(session: Session) {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}
