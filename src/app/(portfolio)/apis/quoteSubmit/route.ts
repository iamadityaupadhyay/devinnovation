import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/util";
import QuoteRequest from "@/app/(portfolio)/model/Quote";
import nodemailer from 'nodemailer';

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: process.env.EMAIL_SERVICE || 'gmail',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.OTP_EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASSWORD,
  },
});

// Email template for client confirmation
// Utility function to truncate text and add "read more" functionality
const truncateText = (text: string, maxLength: number = 400) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Utility function to format long text with proper line breaks
const formatProjectInfo = (text: string) => {
  // Replace multiple spaces with single space and trim
  const cleaned = text.replace(/\s+/g, ' ').trim();
  
  // Add line breaks for better readability (every ~80 characters at word boundaries)
  const words = cleaned.split(' ');
  let formatted = '';
  let currentLine = '';
  
  words.forEach(word => {
    if ((currentLine + word).length > 80) {
      formatted += currentLine.trim() + '<br>';
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  formatted += currentLine.trim();
  
  return formatted;
};

// OPTION 1: Enhanced Client Email with Collapsible Section
const generateClientConfirmationEmail = (name: string, projectInfo: string) => {
  const truncatedInfo = truncateText(projectInfo, 150);
  const isLongText = projectInfo.length > 150;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 10px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 20px; background-color: #fff; }
        .project-info { 
          background-color: #f9f9f9; 
          padding: 15px; 
          border-radius: 6px; 
          border-left: 4px solid #007bff;
          margin: 15px 0;
        }
        .project-info h4 { 
          margin-top: 0; 
          color: #007bff; 
          font-size: 16px;
        }
        .project-text { 
          font-style: italic; 
          color: #555;
          max-height: ${isLongText ? '100px' : 'auto'};
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .read-more-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          margin-top: 10px;
        }
        .footer { 
          margin-top: 20px; 
          padding: 15px; 
          text-align: center; 
          font-size: 12px; 
          color: #777; 
          background-color: #f8f9fa;
          border-radius: 0 0 8px 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>✅ Thank You for Your Quote Request</h2>
        </div>
        <div class="content">
          <p>Dear <strong>${name}</strong>,</p>
          <p>We've received your request for a quote. Here's a summary of your project:</p>
          
          <div class="project-info">
            <h4>🎯 Project Overview</h4>
            <div class="project-text" id="projectText">
              ${formatProjectInfo(isLongText ? truncatedInfo : projectInfo)}
            </div>
            ${isLongText ? `
              <div class="project-text" id="fullProjectText" style="display: none;">
                ${formatProjectInfo(projectInfo)}
              </div>
              <button class="read-more-btn" onclick="toggleProjectInfo()">Read More</button>
            ` : ''}
          </div>
          
          <p>📋 <strong>Next Steps:</strong></p>
          <ul>
            <li>Our team will review your requirements carefully</li>
            <li>We'll prepare a detailed quote within 24 hours</li>
            <li>You'll receive a follow-up email with pricing and timeline</li>
          </ul>
          
          <p>If you have any immediate questions, feel free to reply to this email.</p>
        </div>
        <div class="footer">
          <p><strong>Best regards,</strong><br>Trackode Team</p>
          <p>📧 trackode.ai@gmail.com | 📞 +91 8840250583</p>
        </div>
      </div>
      
      ${isLongText ? `
        <script>
          function toggleProjectInfo() {
            const shortText = document.getElementById('projectText');
            const fullText = document.getElementById('fullProjectText');
            const btn = event.target;
            
            if (fullText.style.display === 'none') {
              shortText.style.display = 'none';
              fullText.style.display = 'block';
              btn.textContent = 'Read Less';
            } else {
              shortText.style.display = 'block';
              fullText.style.display = 'none';
              btn.textContent = 'Read More';
            }
          }
        </script>
      ` : ''}
    </body>
    </html>
  `;
};

// OPTION 2: Enhanced Admin Email with Better Formatting
const generateAdminNotificationEmail = (formData: any) => {
  const truncatedInfo = truncateText(formData.projectInfo, 300);
  const isLongText = formData.projectInfo.length > 300;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
        .container {  margin: 0 auto;  }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 10px; 
          text-align: center; 
          border-radius: 10px 10px 0 0;
        }
        .content { background-color: #fff; }
        .info-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 20px; 
          margin: 20px 0; 
        }
        .info-card {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #28a745;
        }
        .info-card h4 {
          margin: 0 0 10px 0;
          color: #28a745;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .info-card p {
          margin: 0;
          font-weight: 600;
          color: #333;
        }
        .project-section {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .project-section h3 {
          margin-top: 0;
          color: #856404;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .project-content {
          background-color: white;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #ffc107;
          max-height: ${isLongText ? '200px' : 'auto'};
          overflow-y: ${isLongText ? 'auto' : 'visible'};
          font-family: 'Courier New', monospace;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .priority-badge {
          background-color: #dc3545;
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          display: inline-block;
          margin-bottom: 15px;
        }
        .footer { 
          margin-top: 20px; 
          padding: 15px; 
          text-align: center; 
          font-size: 12px; 
          color: #777; 
          background-color: #e9ecef;
          border-radius: 0 0 10px 10px;
        }
        .action-buttons {
          text-align: center;
          margin: 25px 0;
        }
        .btn {
          display: inline-block;
          padding: 12px 24px;
          margin: 0 10px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          font-size: 14px;
        }
        .btn-primary {
          background-color: #007bff;
          color: white;
        }
        .btn-success {
          background-color: #28a745;
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🔔 New Quote Request Received</h2>
          <p style="margin: 0; opacity: 0.9;">Priority: Follow up within 24 hours</p>
        </div>
        <div class="content">
          <div class="priority-badge">⚡ NEW REQUEST</div>
          
          <div class="info-grid">
            <div class="info-card">
              <h4>👤 Client Name</h4>
              <p>${formData.fullName}</p>
            </div>
            <div class="info-card">
              <h4>📧 Email</h4>
              <p>${formData.email}</p>
            </div>
            <div class="info-card">
              <h4>📱 Phone</h4>
              <p>${formData.countryCode} ${formData.mobile}</p>
            </div>
            <div class="info-card">
              <h4>💰 Budget</h4>
              <p>${formData.budget}</p>
            </div>
          </div>
          
          <div class="project-section">
            <h3>📋 Project Requirements</h3>
            <div class="project-content">${formatProjectInfo(isLongText ? truncatedInfo : formData.projectInfo)}${isLongText ? '\n\n--- TRUNCATED FOR EMAIL ---\nFull details available in admin panel' : ''}</div>
          </div>
          
          <div class="action-buttons">
            <a href="mailto:${formData.email}" class="btn btn-primary">📧 Reply to Client</a>
            <a href="tel:${formData.countryCode}${formData.mobile}" class="btn btn-success">📞 Call Client</a>
          </div>
          
          <p><strong>⏰ Action Required:</strong> Please follow up with the client as soon as possible. Response time is crucial for conversion.</p>
        </div>
        <div class="footer">
          <p>📅 Request received: ${new Date().toLocaleString()}</p>
          <p>This is an automated notification. Do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};


export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    // Save to database
    const quote = new QuoteRequest({
      fullName: body.fullName,
      email: body.email,
      countryCode: body.countryCode,
      mobile: body.mobile,
      budget: body.budget,
      projectInfo: body.projectInfo,
    });
    await quote.save();

    // Send confirmation email to client
    const clientMailOptions = {
      from: `"Trackode" <${process.env.OTP_EMAIL_USER}>`,
      to: body.email,
      subject: "Thank You for Your Quote Request",
      html: generateClientConfirmationEmail(body.fullName, body.projectInfo),
    };

    // Send notification email to admin
    const adminMailOptions = {
      from: `"Quote Request System" <${process.env.OTP_EMAIL_USER}>`,
      to: process.env.OTP_EMAIL_USER || 'admin@yourcompany.com',
      subject: `New Quote Request from ${body.fullName}`,
      html: generateAdminNotificationEmail(body),
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(clientMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    return NextResponse.json(
      { message: "Quote request submitted successfully" },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error processing quote request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}