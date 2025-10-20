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
}

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, cvs }: CVAnalysisRequest = await request.json()

    console.log(`🤖 Starting Gemini AI analysis for ${cvs.length} CVs`)
    console.log(`📝 Job description length: ${jobDescription.length} characters`)

    if (!jobDescription || !cvs || cvs.length === 0) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    // Check if Google AI Studio API key is available
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("❌ Google AI Studio API key not found in environment variables")
      return NextResponse.json(
        {
          error:
            "Google AI analysis is not configured. Please add your Google AI Studio API key to environment variables.",
          suggestion: "Add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local file",
        },
        { status: 500 },
      )
    }

    console.log("✅ Google AI Studio API key found, starting analysis...")

    // Initialize Google Generative AI
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    })

    const analysisPromises = cvs.map(async (cv, index) => {
      console.log(`🔍 Analyzing CV ${index + 1}/${cvs.length}: ${cv.name}`)

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

        const { text } = await generateText({
          model: google("gemini-2.5-pro"),
          prompt,
          temperature: 0.1,
          maxTokens: 4000,
        })

        console.log(`[v0] Full response object:`, { text, length: text?.length })
        console.log(`📥 Raw Gemini response for ${cv.name}:`, text?.substring(0, 300) || "EMPTY RESPONSE")

        if (!text || text.trim().length === 0) {
          throw new Error("Gemini returned an empty response. This may be due to content filtering or API issues.")
        }

        // Try to extract JSON from the response
        let jsonData
        try {
          // Clean the response text
          const cleanedText = text.trim().replace(/```json\s*|\s*```/g, "")

          // First try to parse the entire response as JSON
          jsonData = JSON.parse(cleanedText)
        } catch {
          // If that fails, try to extract JSON from the text
          const jsonMatch = text.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            jsonData = JSON.parse(jsonMatch[0])
          } else {
            throw new Error("No valid JSON found in response")
          }
        }

        console.log(`✅ Parsed JSON for ${cv.name}:`, jsonData)

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

        console.log(`✅ Final result for ${cv.name}:`, result)
        return result
      } catch (error) {
        console.error(`❌ Analysis failed for CV ${cv.name}:`, error)
        console.error(`❌ Error details:`, {
          message: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        })

        // Return a more informative error result
        return {
          candidateName: cv.name.replace(/\.[^/.]+$/, ""),
          score: 0,
          matchPercentage: 0,
          strengths: [`Gemini AI analysis error: ${error instanceof Error ? error.message : "Unknown error"}`],
          weaknesses: ["Could not complete automated analysis"],
          keySkills: [],
          experience: "Analysis unavailable",
          recommendation: "Manual review required - AI analysis failed",
          cvId: cv.id,
          originalFileName: cv.name,
          error: true,
        } as CVAnalysisResult & { error: boolean }
      }
    })

    console.log("⏳ Waiting for all Gemini analyses to complete...")
    const analysis = await Promise.all(analysisPromises)

    // Filter out failed analyses for summary calculation
    const successfulAnalyses = analysis.filter((a) => !("error" in a))

    const summary = {
      totalCandidates: cvs.length,
      successfulAnalyses: successfulAnalyses.length,
      failedAnalyses: analysis.length - successfulAnalyses.length,
      averageScore:
        successfulAnalyses.length > 0
          ? successfulAnalyses.reduce((sum, a) => sum + a.score, 0) / successfulAnalyses.length
          : 0,
      topCandidates: successfulAnalyses.filter((a) => a.score >= 4).length,
      averageMatch:
        successfulAnalyses.length > 0
          ? successfulAnalyses.reduce((sum, a) => sum + a.matchPercentage, 0) / successfulAnalyses.length
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
        error: "Gemini AI analysis failed. Please check your Google AI Studio API key and try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
