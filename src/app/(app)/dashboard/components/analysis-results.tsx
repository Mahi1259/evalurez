"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, User, Award, TrendingUp, Filter } from "lucide-react"
import { motion } from "framer-motion"

interface AnalysisResult {
  candidateName: string
  score: number
  strengths: string[]
  weaknesses: string[]
  keySkills: string[]
  experience: string
  recommendation: string
  matchPercentage: number
}

interface AnalysisResultsProps {
  results: AnalysisResult[]
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const [sortBy, setSortBy] = useState<"score" | "name">("score")
  const [filterScore, setFilterScore] = useState<number>(0)

  const sortedResults = [...results]
    .filter((result) => result.score >= filterScore)
    .sort((a, b) => {
      if (sortBy === "score") {
        return b.score - a.score
      }
      return a.candidateName.localeCompare(b.candidateName)
    })

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600 bg-green-100 dark:bg-green-900/40"
    if (score >= 3.5) return "text-blue-600 bg-blue-100 dark:bg-blue-900/40"
    if (score >= 2.5) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40"
    return "text-red-600 bg-red-100 dark:bg-red-900/40"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 4.5) return "Excellent Match"
    if (score >= 3.5) return "Good Match"
    if (score >= 2.5) return "Fair Match"
    return "Poor Match"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analysis Results</h2>
          <p className="text-muted-foreground">{sortedResults.length} candidates analyzed and ranked</p>
        </div>
        <div className="flex gap-2">
          <Button variant={sortBy === "score" ? "default" : "outline"} size="sm" onClick={() => setSortBy("score")}>
            <TrendingUp className="h-4 w-4 mr-1" />
            Sort by Score
          </Button>
          <Button variant={sortBy === "name" ? "default" : "outline"} size="sm" onClick={() => setSortBy("name")}>
            <User className="h-4 w-4 mr-1" />
            Sort by Name
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <Card className="dark:bg-gray-800/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Minimum Score:</label>
            <div className="flex gap-2">
              {[0, 2, 3, 4].map((score) => (
                <Button
                  key={score}
                  variant={filterScore === score ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterScore(score)}
                >
                  {score === 0 ? "All" : `${score}+`}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid gap-6">
        {sortedResults.map((result, index) => (
          <motion.div
            key={`${result.candidateName}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg dark:hover:shadow-gray-900/20 transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{result.candidateName}</CardTitle>
                      <CardDescription>{result.experience}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold">{result.score.toFixed(1)}</span>
                    </div>
                    <Badge className={getScoreColor(result.score)}>{getScoreLabel(result.score)}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Match Percentage</span>
                    <span className="text-sm text-muted-foreground">{result.matchPercentage}%</span>
                  </div>
                  <Progress value={result.matchPercentage} className="h-2" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-600 mb-2 flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      Strengths
                    </h4>
                    <ul className="text-sm space-y-1">
                      {result.strengths.map((strength, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-green-500 mt-1">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-600 mb-2">Areas for Improvement</h4>
                    <ul className="text-sm space-y-1">
                      {result.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-orange-500 mt-1">•</span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keySkills.map((skill, i) => (
                      <Badge key={i} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">AI Recommendation</h4>
                  <p className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 dark:text-gray-200 p-3 rounded border dark:border-gray-600">
                    {result.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {sortedResults.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No candidates match the current filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
