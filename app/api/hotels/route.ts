import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  const { name, bb_single, bb_double, bb_triple, hb_single, hb_double, hb_triple, fb_single, fb_double, fb_triple } =
    await request.json()

  try {
    await sql`
      INSERT INTO hotels (name, bb_single, bb_double, bb_triple, hb_single, hb_double, hb_triple, fb_single, fb_double, fb_triple)
      VALUES (${name}, ${bb_single}, ${bb_double}, ${bb_triple}, ${hb_single}, ${hb_double}, ${hb_triple}, ${fb_single}, ${fb_double}, ${fb_triple})
    `
    return NextResponse.json({ message: "Hotel created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error inserting hotel:", error)
    return NextResponse.json({ error: "Failed to create hotel" }, { status: 500 })
  }
}

