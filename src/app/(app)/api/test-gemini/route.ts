import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    console.log("🧪 Testing Google AI Studio connection...")

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: "Google AI Studio API key not found in environment variables" },
        { status: 500 },
      )
    }

    console.log("✅ API key found, testing connection...")

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: "Say 'Hello, Google AI Studio connection is working!' and nothing else.",
      maxTokens: 50,
    })

    console.log("✅ Google AI Studio response:", text)

    return NextResponse.json({
      success: true,
      message: "Google AI Studio connection is working!",
      response: text,
      model: "gemini-2.5-flash",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Google AI Studio test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: "Check your Google AI Studio API key and network connection",
      },
      { status: 500 },
    )
  }
}
