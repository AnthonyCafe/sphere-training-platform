import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pillar, section, feedbackType, feedback, url, timestamp } = body

    // Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: 'Training Platform <feedback@spherepay.co>',
          to: 'anthony@spherepay.co',
          subject: `[Training Feedback] ${feedbackType}: ${pillar} - ${section}`,
          html: `
            <h2>Training Platform Feedback</h2>
            <p><strong>Type:</strong> ${feedbackType}</p>
            <p><strong>Pillar:</strong> ${pillar}</p>
            <p><strong>Section:</strong> ${section}</p>
            <p><strong>URL:</strong> <a href="${url}">${url}</a></p>
            <p><strong>Time:</strong> ${new Date(timestamp).toLocaleString()}</p>
            <hr />
            <h3>Feedback:</h3>
            <p>${feedback.replace(/\n/g, '<br>')}</p>
          `
        })
      })
    } else {
      // Fallback: Log to console if no email service configured
      console.log('=== FEEDBACK RECEIVED ===')
      console.log('Pillar:', pillar)
      console.log('Section:', section)
      console.log('Type:', feedbackType)
      console.log('Feedback:', feedback)
      console.log('URL:', url)
      console.log('Time:', timestamp)
      console.log('========================')

      // You can also store in a database here
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Feedback API error:', error)
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
  }
}
