import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  let prompt = ''
  
  if (body.type === 'exercise') {
    prompt = `You are a training instructor for Sphere's UAE engagement program. Evaluate this exercise response.

**Section**: ${body.section}
**Exercise**: ${body.prompt}
**Criteria**: ${body.criteria?.join(', ')}

**Trainee Response**:
${body.answer}

Provide brief, constructive feedback:
1. **Strengths** (1-2 key points done well)
2. **Areas for Improvement** (1-2 specific suggestions)
3. **Score**: X/${body.criteria?.length || 4} criteria met
4. **Key Tip** (one actionable suggestion for next time)

Keep feedback concise and encouraging.`
  } else if (body.type === 'mastery') {
    prompt = `You are a senior training evaluator for Sphere's UAE engagement program. Evaluate these mastery assessment responses.

**Assessment**: ${body.title}
**Scenario**: ${body.scenario}

**Written Responses to Evaluate**:
${body.responses?.map((r: any, i: number) => `
---
**Question ${i + 1}**: ${r.question}
**Rubric Criteria**: ${r.rubric?.join(', ')}
**Trainee Response**: ${r.answer}
`).join('\n')}

For EACH written response, provide:
1. **Score**: X/10
2. **Strengths**: Key points done well
3. **Gaps**: Missing elements
4. **Verdict**: ✅ Pass / ⚠️ Needs Work / ❌ Insufficient

Then provide:
**OVERALL WRITTEN SCORE**: X/10
**OVERALL ASSESSMENT**: Brief summary of readiness level`
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const data = await response.json()
    const feedback = data.content?.[0]?.text || 'Unable to get feedback.'
    
    return NextResponse.json({ feedback })
  } catch (error) {
    console.error('AI API error:', error)
    return NextResponse.json({ feedback: 'Error getting AI feedback. Please try again.' }, { status: 500 })
  }
}
