import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { put } from "@vercel/blob"

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get("name") as string
  const bb_single = formData.get("bb_single") as string
  const bb_double = formData.get("bb_double") as string
  const bb_triple = formData.get("bb_triple") as string
  const hb_single = formData.get("hb_single") as string
  const hb_double = formData.get("hb_double") as string
  const hb_triple = formData.get("hb_triple") as string
  const fb_single = formData.get("fb_single") as string
  const fb_double = formData.get("fb_double") as string
  const fb_triple = formData.get("fb_triple") as string
  const file = formData.get("file") as File | null

  let pdfUrl = null

  if (file) {
    const blob = await put(`hotels/${name}-${Date.now()}.pdf`, file, {
      access: "public",
    })
    pdfUrl = blob.url
  }

  try {
    await sql`
      INSERT INTO hotels (name, bb_single, bb_double, bb_triple, hb_single, hb_double, hb_triple, fb_single, fb_double, fb_triple, pdf_url)
      VALUES (${name}, ${bb_single}, ${bb_double}, ${bb_triple}, ${hb_single}, ${hb_double}, ${hb_triple}, ${fb_single}, ${fb_double}, ${fb_triple}, ${pdfUrl})
    `
    return NextResponse.json({ message: "Hotel created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error inserting hotel:", error)
    return NextResponse.json({ error: "Failed to create hotel" }, { status: 500 })
  }
}

