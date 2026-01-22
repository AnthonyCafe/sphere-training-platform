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

Provide feedback in this EXACT format (use the exact icons shown):

**Score: X/10**

**Strengths:**
- ✅ [Specific strength - what they did well]
- ✅ [Another specific strength]

**Needs Improvement:**
- ⚠️ [Specific area that could be better, with suggestion]
- ⚠️ [Another improvement area]

**Errors (if any):**
- ❌ [Factual error or significant mistake - only include if actually wrong]

**Key Tip:** [One actionable suggestion for next time]

**Model Answer:**
[MANDATORY if score is 8/10 or below - Write a comprehensive, perfect example response that would score 10/10. This should demonstrate exactly what an ideal answer looks like, covering all the criteria. Make it detailed and educational so the trainee can learn from it. If score is 9/10 or 10/10, write "Great job! No model answer needed for scores above 80%."]

CRITICAL INSTRUCTIONS:
1. Use ✅ for strengths, ⚠️ for areas needing improvement, and ❌ only for factual errors
2. Be encouraging but honest
3. Score fairly based on criteria met
4. YOU MUST ALWAYS INCLUDE THE MODEL ANSWER SECTION - if score is 8/10 or below, provide a full example answer; if 9/10 or above, just note that no model is needed`
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

Provide evaluation in this EXACT format (use the exact icons shown):

${body.responses?.map((_: any, i: number) => `**Question ${i + 1} Score: X/10**
- ✅ Strengths: [What they did well]
- ⚠️ Needs improvement: [What could be better]
- ❌ Errors: [Only if factually wrong - omit this line if no errors]
- Verdict: ✅ Pass / ⚠️ Needs Work / ❌ Insufficient

**Model Answer for Question ${i + 1}:**
[MANDATORY if score is 8/10 or below - Write a perfect example response. If score is 9/10 or 10/10, write "Score above 80% - no model answer needed."]
`).join('\n')}

**OVERALL WRITTEN SCORE: X/10**

**Summary:**
- ✅ [Key strength across responses]
- ⚠️ [Key area to focus on]

**OVERALL ASSESSMENT:** [2-3 sentence summary of readiness level and key recommendations]

CRITICAL INSTRUCTIONS:
1. Use ✅ for strengths/pass, ⚠️ for needs improvement, and ❌ only for factual errors or insufficient responses
2. YOU MUST ALWAYS INCLUDE A MODEL ANSWER SECTION FOR EACH QUESTION - if score is 8/10 or below, provide a full example; if 9/10 or above, just note that no model is needed
3. Be thorough in your model answers - they should teach the trainee exactly what a perfect response looks like`
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
