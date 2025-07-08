"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function AboutUsPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">About Evalurez</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We&apos;re on a mission to help professionals create outstanding resumes that get noticed by employers.
        </p>
      </div>

      {/* Our Story */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Users className="w-6 h-6" />
            Our Story
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Evalurez was born from a simple observation: too many talented professionals were being overlooked because
            their resumes didn&apos;t effectively showcase their skills and achievements.
          </p>
          <p>
            Founded in 2024, we set out to democratize access to professional resume optimization tools. Our AI-powered
            platform analyzes resumes against industry standards and provides actionable feedback to help job seekers
            stand out in competitive markets.
          </p>
          <p>
            We empower professionals and students to enhance their resumes and accelerate their careers. Whether you&apos;re a recent graduate or a seasoned executive
            our tools are designed to adapt to every career stage and industry, helping you stand out and succeed.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}