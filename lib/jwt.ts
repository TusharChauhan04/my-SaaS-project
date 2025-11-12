import { SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-key-change-in-production")

export async function jwtSign(payload: any): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("30d").sign(JWT_SECRET)
}
