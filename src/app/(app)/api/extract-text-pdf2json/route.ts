import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import { v4 as uuidv4 } from "uuid"
import PDFParser from "pdf2json"
import path from "path"
import os from "os"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const fileType = file.type
    const fileName = file.name.toLowerCase()

    // Handle different file types
    if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
      return await extractPDFText(file)
    } else if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".docx")
    ) {
      return await extractWordText(file)
    } else if (fileType === "text/plain" || fileName.endsWith(".txt")) {
      return await extractTextFile(file)
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload PDF, DOCX, or TXT files." },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error extracting text:", error)
    return NextResponse.json({ error: "Failed to extract text from file" }, { status: 500 })
  }
}

async function extractPDFText(file: File): Promise<NextResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const fileName = uuidv4()
      const tempFilePath = path.join(os.tmpdir(), `${fileName}.pdf`)

      // Write file to temporary location - fix Buffer type issue
      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)
      await fs.writeFile(tempFilePath, uint8Array)

      // Create PDF parser instance
      const pdfParser = new (PDFParser as any)(null, 1)

      let parsedText = ""

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        console.error("PDF parsing error:", errData.parserError)
        // Clean up temp file
        fs.unlink(tempFilePath).catch(console.error)
        resolve(NextResponse.json({ error: "Failed to parse PDF file" }, { status: 500 }))
      })

      pdfParser.on("pdfParser_dataReady", () => {
        try {
          // Get raw text content
          parsedText = (pdfParser as any).getRawTextContent()

          // Clean up temp file
          fs.unlink(tempFilePath).catch(console.error)

          // Clean and format the text
          const cleanedText = cleanPDFText(parsedText)

          resolve(
            NextResponse.json({
              text: cleanedText,
              method: "pdf2json",
              originalLength: parsedText.length,
              cleanedLength: cleanedText.length,
            }),
          )
        } catch (error) {
          console.error("Error processing PDF text:", error)
          fs.unlink(tempFilePath).catch(console.error)
          resolve(NextResponse.json({ error: "Failed to process PDF text" }, { status: 500 }))
        }
      })

      // Load the PDF
      pdfParser.loadPDF(tempFilePath)
    } catch (error) {
      console.error("Error in PDF extraction:", error)
      reject(NextResponse.json({ error: "Failed to extract text from PDF" }, { status: 500 }))
    }
  })
}

async function extractWordText(file: File): Promise<NextResponse> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    // Simple DOCX text extraction (basic implementation)
    const text = await extractDocxText(uint8Array)

    return NextResponse.json({
      text: text,
      method: "docx-basic",
    })
  } catch (error) {
    console.error("Error extracting Word text:", error)
    return NextResponse.json({ error: "Failed to extract text from Word document" }, { status: 500 })
  }
}

async function extractTextFile(file: File): Promise<NextResponse> {
  try {
    const text = await file.text()
    return NextResponse.json({
      text: text,
      method: "plain-text",
    })
  } catch (error) {
    console.error("Error reading text file:", error)
    return NextResponse.json({ error: "Failed to read text file" }, { status: 500 })
  }
}

function cleanPDFText(text: string): string {
  if (!text) return ""

  // Remove excessive whitespace and normalize line breaks
  let cleaned = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()

  // Remove common PDF artifacts
  cleaned = cleaned
    .replace(/^\s*Page \d+\s*$/gm, "") // Remove page numbers
    .replace(/^\s*\d+\s*$/gm, "") // Remove standalone numbers
    .trim()

  return cleaned
}

async function extractDocxText(uint8Array: Uint8Array): Promise<string> {
  // Basic DOCX text extraction - you might want to use a proper library like 'docx' for better results
  try {
    const text = Buffer.from(uint8Array).toString("utf8")
    // Very basic extraction - look for text between XML tags
    const matches = text.match(/<w:t[^>]*>([^<]*)<\/w:t>/g)
    if (matches) {
      return matches
        .map((match) => match.replace(/<[^>]*>/g, ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()
    }
    return "Could not extract text from Word document"
  } catch (error) {
    console.error("Error in basic DOCX extraction:", error)
    return "Error extracting text from Word document"
  }
}
