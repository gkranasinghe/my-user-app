import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  const { name, email } = await request.json()

  try {
    // Insert data into Vercel Postgres
    await sql`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
    `

    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error inserting user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}