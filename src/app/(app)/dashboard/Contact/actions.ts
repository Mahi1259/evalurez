"use server"

import nodemailer from "nodemailer"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(formData: FormData) {
  try {
    // Extract form data
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Gmail credentials are not configured")
      return {
        success: false,
        error: "Email service is not configured. Please try again later.",
      }
    }

    // Create transporter (FIXED: createTransport instead of createTransporter)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #7F4AD7; margin: 0;">Evalurez</h1>
          <p style="color: #666; margin: 5px 0;">New Contact Form Submission</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #7F4AD7;">
          <h2 style="color: #333; margin-top: 0; margin-bottom: 20px;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 80px;">Name:</td>
              <td style="padding: 8px 0; color: #333;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0; color: #333;">
                <a href="mailto:${data.email}" style="color: #7F4AD7; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 8px 0; color: #333;">${data.subject}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin: 25px 0;">
          <h3 style="color: #333; margin-bottom: 15px;">Message:</h3>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; line-height: 1.6;">
            ${data.message.replace(/\n/g, "<br>")}
          </div>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            This email was sent from the Evalurez contact form.<br>
            <strong>Reply directly to this email to respond to ${data.name}.</strong>
          </p>
        </div>
      </div>
    `

    // Send email
    const mailOptions = {
      from: `"Evalurez Contact Form" <${process.env.GMAIL_USER}>`,
      to: "evalurez@gmail.com",
      subject: `Contact Form: ${data.subject}`,
      html: htmlContent,
      replyTo: data.email,
    }

    await transporter.sendMail(mailOptions)

    console.log("Email sent successfully via Gmail")

    return {
      success: true,
      message: "Email sent successfully",
    }
  } catch (error) {
    console.error("Error sending contact email:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    }
  }
}
