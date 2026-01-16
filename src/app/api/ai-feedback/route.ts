import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  const apiKey = process.env.ANTHROPIC_API_KEY
  
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set')
    return NextResponse.json({ 
      feedback: 'AI feedback is not configured. Please contact your administrator.',
      score: null 
    }, { status: 500 })
  }
  
  let prompt = ''
  
  if (body.type === 'exercise') {
    prompt = `You are a training instructor for Sphere's UAE engagement program. Evaluate this exercise response.

**Section**: ${body.section}
**Exercise**: ${body.prompt}
**Criteria**: ${body.criteria?.join(', ') || 'Clear explanation, accuracy, completeness'}

**Trainee Response**:
${body.answer}

Provide feedback in this EXACT format:

**Score: X/10**

**Strengths:**
- [Key point done well]
- [Another strength]

**Areas for Improvement:**
- [Specific suggestion]
- [Another improvement]

**Key Tip:** [One actionable suggestion for next time]

Be encouraging but honest. Score fairly based on criteria met.`
  } else if (body.type === 'quiz') {
    prompt = `You are a training instructor. The trainee completed a quiz with these results:

**Section**: ${body.section}
**Score**: ${body.correctAnswers}/${body.totalQuestions} correct (${body.percentage}%)

**Questions Missed**:
${body.missedQuestions?.map((q: any) => `- ${q.question}\n  Their answer: ${q.theirAnswer}\n  Correct answer: ${q.correctAnswer}`).join('\n') || 'None - perfect score!'}

Provide brief feedback in this EXACT format:

**Quiz Score: ${body.correctAnswers}/${body.totalQuestions} (${body.percentage}%)**

**Feedback:**
[2-3 sentences on performance and what to review if needed]

**Recommendation:** [Pass/Review specific topics]`
  } else if (body.type === 'mastery') {
    prompt = `You are a senior training evaluator for Sphere's UAE engagement program. Evaluate these mastery assessment responses.

**Assessment**: ${body.title}
**Scenario**: ${body.scenario}

**Written Responses to Evaluate**:
${body.responses?.map((r: any, i: number) => `
---
**Question ${i + 1}**: ${r.question}
**Rubric Criteria**: ${r.rubric?.join(', ') || 'Accuracy, completeness, clarity'}
**Trainee Response**: ${r.answer || '[No response provided]'}
`).join('\n')}

Provide evaluation in this EXACT format:

${body.responses?.map((_: any, i: number) => `**Question ${i + 1} Score: X/10**
- Strengths: [Brief strengths]
- Gaps: [Brief gaps]
- Verdict: ✅ Pass / ⚠️ Needs Work / ❌ Insufficient
`).join('\n')}

**OVERALL WRITTEN SCORE: X/10**

**OVERALL ASSESSMENT:** [2-3 sentence summary of readiness level and key recommendations]`
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Anthropic API error:', response.status, errorText)
      return NextResponse.json({ 
        feedback: `AI service error (${response.status}). Please try again later.`,
        score: null 
      }, { status: 500 })
    }

    const data = await response.json()
    const feedback = data.content?.[0]?.text || 'Unable to get feedback.'
    
    // Extract score from feedback
    let score = null
    const scoreMatch = feedback.match(/Score:\s*(\d+)\/10/i)
    if (scoreMatch) {
      score = parseInt(scoreMatch[1]) * 10
    }
    
    return NextResponse.json({ feedback, score })
  } catch (error) {
    console.error('AI API error:', error)
    return NextResponse.json({ 
      feedback: 'Error connecting to AI service. Please check your connection and try again.',
      score: null 
    }, { status: 500 })
  }
}
