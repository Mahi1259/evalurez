import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

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

    console.log(`🤖 Starting AI analysis for ${cvs.length} CVs`)

    if (!jobDescription || !cvs || cvs.length === 0) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OpenAI API key not found")
      return NextResponse.json(
        {
          error: "AI analysis is not configured. Please add your OpenAI API key to environment variables.",
          suggestion: "Add OPENAI_API_KEY to your .env.local file",
        },
        { status: 500 },
      )
    }

    const analysisPromises = cvs.map(async (cv, index) => {
      console.log(`🔍 Analyzing CV ${index + 1}/${cvs.length}: ${cv.name}`)

      const prompt = `
        You are an expert HR recruiter and talent acquisition specialist. Analyze this candidate's CV against the provided job description with precision and objectivity.

        JOB DESCRIPTION:
        ${jobDescription}

        CANDIDATE CV:
        ${cv.content}

        ANALYSIS REQUIREMENTS:
        Provide a comprehensive assessment in valid JSON format with these exact fields:

        {
          "candidateName": "Extract the candidate's full name from the CV. If not found, use filename without extension",
          "score": [Rate from 1-5 where 5=perfect match, 4=excellent, 3=good, 2=fair, 1=poor],
          "matchPercentage": [Percentage from 0-100 based on job requirements alignment],
          "strengths": [Array of 3-5 specific strengths relevant to this job],
          "weaknesses": [Array of 2-4 specific areas where candidate falls short of job requirements],
          "keySkills": [Array of 5-8 most relevant technical and soft skills from CV],
          "experience": "Brief summary of years and type of experience",
          "recommendation": "2-3 sentence hiring recommendation with specific reasoning"
        }

        EVALUATION CRITERIA:
        - Technical skills match (40%)
        - Experience level and relevance (30%)
        - Education and certifications (15%)
        - Soft skills and cultural fit indicators (15%)

        Be specific, objective, and provide actionable insights. Focus on job-relevant qualifications only.
      `

      try {
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt,
          temperature: 0.2, // Lower temperature for more consistent results
          maxTokens: 1000,
        })

        console.log(`✅ AI analysis completed for ${cv.name}`)

        // Extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0])

          // Validate and sanitize the response
          return {
            candidateName: analysis.candidateName || cv.name.replace(/\.[^/.]+$/, ""),
            score: Math.min(Math.max(Number(analysis.score) || 0, 1), 5),
            matchPercentage: Math.min(Math.max(Number(analysis.matchPercentage) || 0, 0), 100),
            strengths: Array.isArray(analysis.strengths) ? analysis.strengths.slice(0, 5) : ["Analysis incomplete"],
            weaknesses: Array.isArray(analysis.weaknesses) ? analysis.weaknesses.slice(0, 4) : ["Analysis incomplete"],
            keySkills: Array.isArray(analysis.keySkills) ? analysis.keySkills.slice(0, 8) : [],
            experience: analysis.experience || "Experience details not available",
            recommendation: analysis.recommendation || "Requires manual review",
            cvId: cv.id,
            originalFileName: cv.name,
          } as CVAnalysisResult
        } else {
          throw new Error("Invalid JSON response from AI")
        }
      } catch (error) {
        console.error(`❌ Analysis failed for CV ${cv.name}:`, error)

        // Return error result instead of failing completely
        return {
          candidateName: cv.name.replace(/\.[^/.]+$/, ""),
          score: 0,
          matchPercentage: 0,
          strengths: ["AI analysis failed - manual review required"],
          weaknesses: ["Could not complete automated analysis"],
          keySkills: [],
          experience: "Analysis unavailable",
          recommendation: "Manual review required due to analysis error",
          cvId: cv.id,
          originalFileName: cv.name,
          error: true,
        } as CVAnalysisResult & { error: boolean }
      }
    })

    console.log("⏳ Waiting for all analyses to complete...")
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

    console.log(`✅ Analysis complete: ${summary.successfulAnalyses}/${summary.totalCandidates} successful`)

    return NextResponse.json({
      analysis,
      summary,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ CV analysis error:", error)
    return NextResponse.json(
      {
        error: "AI analysis failed. Please check your OpenAI API key and try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
