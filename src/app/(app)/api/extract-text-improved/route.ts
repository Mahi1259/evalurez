import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  console.log("📄 Improved PDF text extraction API called")

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log(`📄 Processing: ${file.name} (${file.type}, ${Math.round(file.size / 1024)}KB)`)

    // File size check
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum size is 15MB." }, { status: 400 })
    }

    const fileName = file.name.toLowerCase()
    const mimeType = file.type.toLowerCase()
    let text = ""

    try {
      // Handle Text Files
      if (fileName.endsWith(".txt") || mimeType === "text/plain") {
        console.log("📝 Processing text file")
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        text = buffer.toString("utf-8")
        console.log(`✅ Text file processed: ${text.length} characters`)
      }

      // Handle PDF Files with improved extraction
      else if (fileName.endsWith(".pdf") || mimeType === "application/pdf") {
        console.log("📄 Processing PDF with improved text extraction...")

        try {
          // Try using pdf-parse library for better text extraction
          const pdfParse = await import("pdf-parse")
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)

          const pdfData = await pdfParse.default(buffer, {
            // PDF parsing options for better text extraction
            max: 0, // Parse all pages
            version: "v1.10.100",
          })

          text = pdfData.text
          console.log(`✅ PDF processed with pdf-parse: ${pdfData.numpages} pages, ${text.length} characters`)

          // If pdf-parse didn't extract much text, try alternative method
          if (!text || text.trim().length < 50) {
            console.log("📄 pdf-parse extracted minimal text, trying alternative method...")
            throw new Error("Minimal text extracted, trying fallback")
          }
        } catch (pdfParseError) {
          console.log("📄 pdf-parse failed, trying manual extraction...")

          // Fallback: Manual PDF text extraction
          try {
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const pdfString = buffer.toString("latin1") // Use latin1 for better character handling

            // Method 1: Extract text between BT and ET markers (text objects)
            const textObjects = pdfString.match(/BT[\s\S]*?ET/g)
            if (textObjects && textObjects.length > 0) {
              let extractedText = ""
              for (const textObj of textObjects) {
                // Look for text in parentheses or brackets
                const textInParens = textObj.match(/$$([^)]+)$$/g)
                const textInBrackets = textObj.match(/\[([^\]]+)\]/g)

                if (textInParens) {
                  extractedText += textInParens.map((t) => t.replace(/[()]/g, "")).join(" ") + " "
                }
                if (textInBrackets) {
                  extractedText += textInBrackets.map((t) => t.replace(/[[\]]/g, "")).join(" ") + " "
                }

                // Also look for Tj commands (show text)
                const tjCommands = textObj.match(/$$([^)]+)$$\s*Tj/g)
                if (tjCommands) {
                  extractedText += tjCommands.map((t) => t.replace(/$$([^)]+)$$\s*Tj/, "$1")).join(" ") + " "
                }
              }

              if (extractedText.trim().length > 20) {
                text = extractedText
                console.log(`✅ PDF text extracted via BT/ET method: ${text.length} characters`)
              }
            }

            // Method 2: If BT/ET didn't work, try stream extraction
            if (!text || text.trim().length < 20) {
              console.log("📄 Trying stream-based extraction...")
              const streams = pdfString.match(/stream\s*\n([\s\S]*?)\nendstream/g)
              if (streams) {
                let streamText = ""
                for (const stream of streams) {
                  const streamContent = stream.replace(/^stream\s*\n/, "").replace(/\nendstream$/, "")

                  // Look for readable text patterns in streams
                  const readableText = streamContent.match(/[a-zA-Z0-9\s,.!?;:'"()-]{10,}/g)
                  if (readableText) {
                    streamText += readableText.filter((t) => t.length > 5).join(" ") + " "
                  }
                }

                if (streamText.trim().length > 20) {
                  text = streamText
                  console.log(`✅ PDF text extracted via stream method: ${text.length} characters`)
                }
              }
            }

            // Method 3: Last resort - look for any readable text
            if (!text || text.trim().length < 20) {
              console.log("📄 Trying general text pattern extraction...")
              const readableText = pdfString.match(/[a-zA-Z][a-zA-Z0-9\s,.!?;:'"()-]{15,}/g)
              if (readableText && readableText.length > 3) {
                text = readableText
                  .filter((t) => t.length > 10)
                  .filter((t) => !/^[0-9\s]+$/.test(t)) // Remove number-only strings
                  .filter((t) => !t.includes("obj")) // Remove PDF object references
                  .join(" ")
                console.log(`✅ PDF text extracted via pattern matching: ${text.length} characters`)
              }
            }

            if (!text || text.trim().length < 20) {
              throw new Error("Could not extract readable text from PDF")
            }
          } catch (manualError) {
            console.error("❌ Manual PDF extraction failed:", manualError)
            return NextResponse.json(
              {
                error: "Failed to extract text from PDF",
                details: "This PDF might be image-based, encrypted, or have complex formatting",
                suggestions: [
                  "Try copying text directly from the PDF and pasting it",
                  "Convert the PDF to text using an online converter",
                  "Save the PDF as text from your PDF reader",
                  "Ensure the PDF contains selectable text (not just images)",
                ],
              },
              { status: 400 },
            )
          }
        }
      }

      // Handle Word Documents
      else if (fileName.endsWith(".docx") || mimeType.includes("wordprocessingml")) {
        console.log("📄 Processing DOCX file...")
        // Use the existing DOCX processing logic
        const yauzl = await import("yauzl")
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const extractedText = await new Promise<string>((resolve, reject) => {
          yauzl.fromBuffer(buffer, { lazyEntries: true }, (err, zipfile) => {
            if (err) {
              reject(err)
              return
            }

            let documentXml = ""
            zipfile!.readEntry()

            zipfile!.on("entry", (entry) => {
              if (entry.fileName === "word/document.xml") {
                zipfile!.openReadStream(entry, (err, readStream) => {
                  if (err) {
                    reject(err)
                    return
                  }

                  const chunks: Uint8Array[] = []
                  readStream!.on("data", (chunk: Buffer) => {
                    chunks.push(new Uint8Array(chunk))
                  })
                  readStream!.on("end", () => {
                    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
                    const combined = new Uint8Array(totalLength)
                    let offset = 0
                    for (const chunk of chunks) {
                      combined.set(chunk, offset)
                      offset += chunk.length
                    }

                    documentXml = Buffer.from(combined).toString("utf-8")
                    const textContent = documentXml
                      .replace(/<[^>]+>/g, " ")
                      .replace(/\s+/g, " ")
                      .trim()

                    resolve(textContent)
                  })
                })
              } else {
                zipfile!.readEntry()
              }
            })

            zipfile!.on("end", () => {
              if (!documentXml) {
                reject(new Error("Could not find document.xml in DOCX file"))
              }
            })
          })
        })

        text = extractedText
        console.log(`✅ DOCX processed: ${text.length} characters`)
      }

      // Handle old DOC files
      else if (fileName.endsWith(".doc") || mimeType.includes("msword")) {
        console.log("📄 Processing DOC file...")
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const docString = buffer.toString("binary")

        const textMatches = docString.match(/[\x20-\x7E]{4,}/g)
        if (textMatches && textMatches.length > 5) {
          text = textMatches
            .filter((match) => match.length > 3)
            .join(" ")
            .replace(/\s+/g, " ")
            .trim()
          console.log(`✅ DOC text extracted: ${text.length} characters`)
        } else {
          throw new Error("Could not extract readable text from DOC file")
        }
      }

      // Unsupported file type
      else {
        return NextResponse.json(
          {
            error: `Unsupported file format: ${fileName.split(".").pop()?.toUpperCase()}`,
            supportedFormats: ["TXT", "PDF", "DOCX", "DOC"],
            suggestion: "Convert your file to one of the supported formats",
          },
          { status: 400 },
        )
      }

      // Clean and validate extracted text
      if (!text || text.trim().length < 10) {
        return NextResponse.json(
          {
            error: "No readable text found in the file",
            suggestions: [
              "The file might be empty or contain only images",
              "Try copying and pasting the text directly",
              "Convert to .txt format for best results",
            ],
          },
          { status: 400 },
        )
      }

      // Advanced text cleaning
      const cleanedText = text
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/\t/g, " ")
        .replace(/\s+/g, " ")
        // Remove PDF artifacts
        .replace(/\b\d+\s+0\s+obj\b/g, "")
        .replace(/\bendobj\b/g, "")
        .replace(/\bstream\b/g, "")
        .replace(/\bendstream\b/g, "")
        .replace(/\bFlateDecode\b/g, "")
        .replace(/\bLength\s+\d+\b/g, "")
        .replace(/\bstartxref\b/g, "")
        .replace(/\bxref\b/g, "")
        .replace(/\b%%EOF\b/g, "")
        // Remove common PDF metadata
        .replace(/\b[A-F0-9]{32}\b/g, "")
        .replace(/\bDecodeParms\b/g, "")
        .replace(/\bPredictor\s+\d+\b/g, "")
        .trim()

      console.log(`✅ Text extraction and cleaning completed: ${cleanedText.length} characters`)

      return NextResponse.json({
        text: cleanedText,
        fileInfo: {
          name: file.name,
          type: file.type,
          size: file.size,
          extractedLength: cleanedText.length,
        },
        success: true,
      })
    } catch (error) {
      console.error("❌ Text extraction error:", error)
      return NextResponse.json(
        {
          error: "Failed to extract text from the file",
          details: error instanceof Error ? error.message : "Unknown error",
          suggestions: [
            "Try copying and pasting the text directly",
            "Convert your file to .txt format",
            "Use the text area below instead of file upload",
          ],
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("❌ File processing error:", error)
    return NextResponse.json(
      {
        error: "Server error while processing file",
        suggestion: "Please try again or use the text area to paste content directly",
      },
      { status: 500 },
    )
  }
}
