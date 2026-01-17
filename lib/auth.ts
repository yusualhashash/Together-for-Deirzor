import { neon } from "@neondatabase/serverless"
import { cookies } from "next/headers"

const sql = neon(process.env.DATABASE_URL!)

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT password FROM admin_users WHERE username = ${username}
    `

    if (result.length === 0) {
      return false
    }

    return password === result[0].password
  } catch (error) {
    console.error("Auth error:", error)
    return false
  }
}

export async function createAdmin(username: string, password: string) {
  await sql`
    INSERT INTO admin_users (username, password) 
    VALUES (${username}, ${password})
  `
}

export async function checkAuth() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("admin_session")

  if (!sessionCookie) {
    return null
  }

  try {
    const username = sessionCookie.value
    const result = await sql`
      SELECT username FROM admin_users WHERE username = ${username}
    `

    if (result.length === 0) {
      return null
    }

    return { username: result[0].username }
  } catch (error) {
    console.error("Session check error:", error)
    return null
  }
}
