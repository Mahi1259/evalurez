"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, User, AlertCircle, CheckCircle } from "lucide-react"

interface CV {
  id: string
  name: string
  content: string
}

interface CVUploadProps {
  onCVsChange: (cvs: CV[]) => void
  cvs: CV[]
}

export function CVUpload({ onCVsChange, cvs }: CVUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadErrors, setUploadErrors] = useState<string[]>([])
  const [uploadSuccess, setUploadSuccess] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadErrors([])
    setUploadSuccess("")

    try {
      const newCVs: CV[] = []
      const errors: string[] = []
      let successCount = 0

      for (const file of Array.from(files)) {
        try {
          console.log("Processing CV file:", file.name, file.type, file.size)

          const formData = new FormData()
          formData.append("file", file)

          const response = await fetch("/api/extract-text-pdf2json", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            const errorData = await response.json()
            errors.push(`${file.name}: ${errorData.error}`)
            continue
          }

          const data = await response.json()
          if (data.text && data.text.trim()) {
            newCVs.push({
              id: Math.random().toString(36).substr(2, 9),
              name: file.name,
              content: data.text.trim(),
            })
            successCount++
            console.log(`✅ CV extracted using ${data.method}:`, {
              file: file.name,
              originalLength: data.originalLength,
              cleanedLength: data.cleanedLength,
            })
          } else {
            errors.push(`${file.name}: No text content found`)
          }
        } catch (fileError) {
          console.error(`Error processing ${file.name}:`, fileError)
          errors.push(`${file.name}: Network error`)
        }
      }

      onCVsChange([...cvs, ...newCVs])
      setUploadErrors(errors)

      if (successCount > 0) {
        const cvText = successCount > 1 ? "CVs" : "CV"
        setUploadSuccess(`Successfully processed ${successCount} ${cvText}`)
        setTimeout(() => setUploadSuccess(""), 3000)
      }
    } catch (error) {
      console.error("Error uploading files:", error)
      setUploadErrors(["Network error. Please check your connection and try again."])
    } finally {
      setIsUploading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const removeCV = (id: string) => {
    onCVsChange(cvs.filter((cv) => cv.id !== id))
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-4 w-4" />
          Candidate CVs
        </CardTitle>
        <CardDescription className="text-xs">
          Upload multiple PDF, Word, or text files (bulk upload with reliable extraction)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Success Message */}
        {uploadSuccess && (
          <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-700 dark:text-green-300">
              <p className="font-medium">{uploadSuccess}</p>
            </div>
          </div>
        )}

        {/* Error Messages */}
        {uploadErrors.length > 0 && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-700 dark:text-red-300">
              <p className="font-medium">Some files couldn&apos;t be processed:</p>
              <ul className="text-xs mt-1 space-y-1">
                {uploadErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div
          onClick={handleUploadClick}
          className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
        >
          <label htmlFor="cv-upload-input" className="sr-only">
            Upload CV files
          </label>
          <input
            id="cv-upload-input"
            ref={fileInputRef}
            type="file"
            accept=".txt,.pdf,.docx,.doc"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            title="Upload CV files"
          />
          <Upload className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-400 mb-2" />
          {isUploading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-600 dark:text-gray-200">Processing CV files...</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">This may take a moment for large files</p>
            </div>
          ) : (
            <div>
              <p className="font-medium text-gray-500 dark:text-gray-300 mb-1">Click to upload CV files</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                PDF, Word (.docx/.doc), TXT • Multiple files • Reliable extraction
              </p>
            </div>
          )}
        </div>

        {cvs.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-300">Uploaded CVs ({cvs.length})</h4>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className="flex items-center justify-between p-2 bg-gray-100 dark:!bg-gray-900 rounded border border-gray-300 dark:!border-gray-400"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs truncate text-gray-900 dark:!text-white">{cv.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCV(cv.id)}
                    className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <X className="h-3 w-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
