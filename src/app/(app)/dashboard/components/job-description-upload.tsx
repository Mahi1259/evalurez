"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"

interface JobDescriptionUploadProps {
  onJobDescriptionChange: (description: string) => void
  jobDescription: string
}

export function JobDescriptionUpload({ onJobDescriptionChange, jobDescription }: JobDescriptionUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadStatus("idle")
    setErrorMessage("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/extract-text-pdf2json", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to extract text")
      }

      if (data.text && data.text.trim()) {
        onJobDescriptionChange(data.text.trim())
        setUploadStatus("success")
        console.log(`Text extracted using ${data.method}:`, {
          originalLength: data.originalLength,
          cleanedLength: data.cleanedLength,
        })
      } else {
        throw new Error("No text content found in the file")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setIsUploading(false)
      // Reset file input
      event.target.value = ""
    }
  }

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case "success":
        return "File uploaded and text extracted successfully!"
      case "error":
        return errorMessage || "Upload failed. Please try again."
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Job Description
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled={isUploading} className="relative bg-transparent">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
                aria-label="Upload job description file"
                title="Upload PDF, DOCX, or TXT file"
              />
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Processing..." : "Upload File"}
            </Button>
            <span className="text-sm text-gray-500">Supports PDF, DOCX, and TXT files</span>
          </div>

          {uploadStatus !== "idle" && (
            <div
              className={`flex items-center gap-2 text-sm ${
                uploadStatus === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {getStatusIcon()}
              {getStatusMessage()}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Or paste job description text:</label>
          <Textarea
            placeholder="Paste the job description here or upload a file above..."
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            className="min-h-[200px] resize-y"
          />
        </div>

        {jobDescription && <div className="text-sm text-gray-600">Character count: {jobDescription.length}</div>}
      </CardContent>
    </Card>
  )
}
