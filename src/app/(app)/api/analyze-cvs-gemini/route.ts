import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

interface CVAnalysisRequest {
  jobDescription: string
  cvs: Array<{ id: string; name: string; content: string }>
}

interface CVAnalysisResult {
  candidateName: string
  score: number
  matchPercentage: number
  strengths: string[]
  weaknesses: string[]
  keySkills: string[]
  experience: string
  recommendation: string
  cvId: string
  originalFileName: string
  error?: boolean
  errorMessage?: string
}

const MAX_CVS_PER_REQUEST = 5
const AI_TIMEOUT_MS = 25000 // 25 seconds per CV analysis

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, cvs }: CVAnalysisRequest = await request.json()

    console.log(`🤖 Starting Gemini AI analysis for ${cvs.length} CVs`)
    console.log(`📝 Job description length: ${jobDescription.length} characters`)

    // Validation
    if (!jobDescription || !cvs || cvs.length === 0) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    // Limit batch size to prevent timeouts
    if (cvs.length > MAX_CVS_PER_REQUEST) {
      return NextResponse.json(
        {
          error: `Too many CVs. Please analyze maximum ${MAX_CVS_PER_REQUEST} CVs at once.`,
          suggestion: "Split your CVs into smaller batches",
        },
        { status: 400 }
      )
    }

    // Check API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("❌ Google AI Studio API key not found in environment variables")
      return NextResponse.json(
        {
          error:
            "Google AI analysis is not configured. Please add your Google AI Studio API key to environment variables.",
          suggestion: "Add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local file",
        },
        { status: 500 }
      )
    }

    console.log("✅ Google AI Studio API key found, starting parallel analysis...")

    // Initialize Google Generative AI
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    })

    // Process all CVs in parallel
    const analysisPromises = cvs.map(async (cv, index) => {
      return analyzeSingleCV(cv, index, cvs.length, jobDescription, google)
    })

    // Wait for all analyses to complete
    const analysis = await Promise.all(analysisPromises)

    console.log("✅ All Gemini analyses complete")

    // Calculate summary statistics
    const successfulAnalyses = analysis.filter((a) => !a.error)
    const failedAnalyses = analysis.filter((a) => a.error)

    const summary = {
      totalCandidates: cvs.length,
      successfulAnalyses: successfulAnalyses.length,
      failedAnalyses: failedAnalyses.length,
      averageScore:
        successfulAnalyses.length > 0
          ? Math.round((successfulAnalyses.reduce((sum, a) => sum + a.score, 0) / successfulAnalyses.length) * 10) / 10
          : 0,
      topCandidates: successfulAnalyses.filter((a) => a.score >= 4).length,
      averageMatch:
        successfulAnalyses.length > 0
          ? Math.round(successfulAnalyses.reduce((sum, a) => sum + a.matchPercentage, 0) / successfulAnalyses.length)
          : 0,
    }

    console.log(`✅ Gemini analysis complete: ${summary.successfulAnalyses}/${summary.totalCandidates} successful`)

    return NextResponse.json({
      analysis,
      summary,
      timestamp: new Date().toISOString(),
      analysisType: "gemini-ai",
    })
  } catch (error) {
    console.error("❌ Gemini CV analysis error:", error)
    return NextResponse.json(
      {
        error: "Gemini AI analysis failed. Please check your configuration and try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

async function analyzeSingleCV(
  cv: { id: string; name: string; content: string },
  index: number,
  total: number,
  jobDescription: string,
  google: ReturnType<typeof createGoogleGenerativeAI>
): Promise<CVAnalysisResult> {
  console.log(`🔍 Analyzing CV ${index + 1}/${total}: ${cv.name}`)

  const prompt = `You are an expert HR recruiter and talent acquisition specialist. Analyze this candidate's CV against the provided job description.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE CV:
${cv.content}

Please provide a comprehensive assessment in the following JSON format (respond with valid JSON only, no additional text):

{
  "candidateName": "Extract the candidate's full name from the CV, or use filename if name not found",
  "score": 4,
  "matchPercentage": 85,
  "strengths": ["Specific strength 1", "Specific strength 2", "Specific strength 3"],
  "weaknesses": ["Specific weakness 1", "Specific weakness 2"],
  "keySkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
  "experience": "Brief summary of candidate's experience level and years",
  "recommendation": "2-3 sentence hiring recommendation with specific reasoning"
}

EVALUATION CRITERIA:
- Technical skills alignment with job requirements (40%)
- Experience level and relevance (30%)
- Education and certifications (15%)
- Soft skills and cultural fit indicators (15%)

Rate score from 1-5 where:
- 5 = Perfect match, highly recommended
- 4 = Excellent match, strongly recommended  
- 3 = Good match, recommended for interview
- 2 = Fair match, consider with reservations
- 1 = Poor match, not recommended

Be specific, objective, and focus only on job-relevant qualifications.`

  try {
    console.log(`🚀 Sending request to Google Gemini for ${cv.name}...`)

    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Analysis timeout after ${AI_TIMEOUT_MS / 1000} seconds`)), AI_TIMEOUT_MS)
    })

    // Create API call promise
    const generatePromise = generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt,
      temperature: 0.1,
      maxTokens: 2000,
    })

    // Race between API call and timeout
    const { text } = await Promise.race([generatePromise, timeoutPromise])

    console.log(`📥 Response received for ${cv.name}, length: ${text?.length || 0}`)

    // Validate response
    if (!text || text.trim().length === 0) {
      throw new Error("Empty response from Gemini API")
    }

    const trimmedText = text.trim()

    // Check for error responses
    if (
      trimmedText.startsWith("An error") ||
      trimmedText.startsWith("Error:") ||
      trimmedText.startsWith('{"error"')
    ) {
      throw new Error(`API Error: ${trimmedText.substring(0, 200)}`)
    }

    // Parse JSON response
    const jsonData = parseGeminiResponse(trimmedText, cv.name)

    // Validate and sanitize the response
    const result: CVAnalysisResult = {
      candidateName: jsonData.candidateName || cv.name.replace(/\.[^/.]+$/, ""),
      score: Math.min(Math.max(Number(jsonData.score) || 1, 1), 5),
      matchPercentage: Math.min(Math.max(Number(jsonData.matchPercentage) || 0, 0), 100),
      strengths: Array.isArray(jsonData.strengths) ? jsonData.strengths.slice(0, 5) : ["Strong candidate profile"],
      weaknesses: Array.isArray(jsonData.weaknesses) ? jsonData.weaknesses.slice(0, 4) : ["Areas for development"],
      keySkills: Array.isArray(jsonData.keySkills) ? jsonData.keySkills.slice(0, 8) : ["Various relevant skills"],
      experience: jsonData.experience || "Experience details available in CV",
      recommendation: jsonData.recommendation || "Candidate shows good potential for the role",
      cvId: cv.id,
      originalFileName: cv.name,
    }

    console.log(`✅ Successfully analyzed ${cv.name}`)
    return result
  } catch (error) {
    console.error(`❌ Analysis failed for CV ${cv.name}:`, error)

    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    // Return error result
    return {
      candidateName: cv.name.replace(/\.[^/.]+$/, ""),
      score: 0,
      matchPercentage: 0,
      strengths: [],
      weaknesses: [],
      keySkills: [],
      experience: "Analysis unavailable",
      recommendation: "Manual review required - AI analysis failed",
      cvId: cv.id,
      originalFileName: cv.name,
      error: true,
      errorMessage: errorMessage,
    }
  }
}

function parseGeminiResponse(text: string, cvName: string): any {
  try {
    // Remove markdown code blocks if present
    const cleanedText = text.replace(/```json\s*|\s*```/g, "").trim()

    // Try to parse the entire cleaned response
    return JSON.parse(cleanedText)
  } catch (parseError) {
    // If that fails, try to extract JSON object from the text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0])
      } catch {
        throw new Error(`Failed to parse JSON from response for ${cvName}`)
      }
    } else {
      throw new Error(`No valid JSON found in response for ${cvName}`)
    }
  }
}