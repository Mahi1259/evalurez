"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, BarChart3, Users, Sparkles } from "lucide-react"
import { JobDescriptionUpload } from "./components/job-description-upload"
import { CVUpload } from "./components/cv-upload"
import { AnalysisResults } from "./components/analysis-results"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [jobDescription, setJobDescription] = useState<string>("")
  const [cvs, setCvs] = useState<Array<{ id: string; name: string; content: string }>>([])
  const [analysisResults, setAnalysisResults] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to results when analysis is complete
  useEffect(() => {
    if (analysisResults.length > 0 && resultsRef.current) {
      // Small delay to ensure the results are rendered
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
      }, 100)
    }
  }, [analysisResults])

  const handleAnalysis = async () => {
    if (!jobDescription || cvs.length === 0) {
      alert("Please upload a job description and at least one CV")
      return
    }

    setIsAnalyzing(true)
    try {
      console.log(`Starting Gemini AI analysis for ${cvs.length} CVs...`)

      const response = await fetch("/api/analyze-cvs-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          cvs: cvs.map((cv) => ({ id: cv.id, name: cv.name, content: cv.content })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Analysis failed")
      }

      const results = await response.json()
      console.log(`Gemini AI analysis completed:`, results.summary)

      setAnalysisResults(results.analysis)

      // Show success message with summary
      if (results.summary.failedAnalyses > 0) {
        alert(
          `Analysis completed! ${results.summary.successfulAnalyses}/${results.summary.totalCandidates} CVs analyzed successfully. ${results.summary.failedAnalyses} failed - check results for details.`,
        )
      }
    } catch (error) {
      console.error("Analysis error:", error)
      alert(
        `Gemini AI Analysis failed: ${error instanceof Error ? error.message : "Unknown error"}. Please check your Google AI Studio API key and try again.`,
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="h-full overflow-auto bg-background dark:bg-gray-950">
      <div className="p-4 space-y-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">CV Analysis Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Upload job descriptions and CVs to get AI-powered matching insights
              </p>
            </div>
          </div>
        </motion.div>

        {/* Compact Stats Cards */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4 dark:bg-gray-900/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Job Descriptions</p>
                <p className="text-2xl font-bold">{jobDescription ? 1 : 0}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
          <Card className="p-4 dark:bg-gray-900/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CVs Uploaded</p>
                <p className="text-2xl font-bold">{cvs.length}</p>
              </div>
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
          <Card className="p-4 dark:bg-gray-900/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Analyses Complete</p>
                <p className="text-2xl font-bold">{analysisResults.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
          <Card className="p-4 dark:bg-gray-900/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Matches</p>
                <p className="text-2xl font-bold">{analysisResults.filter((r) => r.score >= 4).length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Compact Upload Section */}
        <div className="grid gap-4 lg:grid-cols-2">
          <JobDescriptionUpload onJobDescriptionChange={setJobDescription} jobDescription={jobDescription} />
          <CVUpload onCVsChange={setCvs} cvs={cvs} />
        </div>

        {/* Single Gemini AI Analysis Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleAnalysis}
            disabled={!jobDescription || cvs.length === 0 || isAnalyzing}
            size="lg"
            className="px-8"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                AI Analyzing CVs...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze with AI ({cvs.length} CVs)
              </>
            )}
          </Button>
        </div>

        {/* Results Section with ref for auto-scroll */}
        {analysisResults.length > 0 && (
          <div ref={resultsRef} className="space-y-4 scroll-mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Sparkles className="h-4 w-4" />
              Results from AI Analysis
            </motion.div>
            <AnalysisResults results={analysisResults} />
          </div>
        )}
      </div>
    </div>
  )
}
