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
    prompt = `You are a supportive training coach for Sphere's UAE engagement program. Your role is to help trainees learn and build confidence while providing constructive guidance.

**SCORING PHILOSOPHY** (IMPORTANT - read before evaluating):
- This is a LEARNING environment, not a high-stakes exam
- Be ENCOURAGING and recognize effort and understanding
- Score generously - if they show understanding of the core concepts, that's the foundation of a good score
- 10/10 = Exceptional, comprehensive, could teach others
- 9/10 = Excellent understanding, minor additions possible
- 8/10 = Good solid response, demonstrates competence
- 7/10 = Adequate understanding, covers the basics well
- 6/10 = Shows effort and partial understanding
- Below 6 = Only for responses that miss the point entirely or have major errors

Most reasonable responses that show effort and basic understanding should score 7-8. Reserve 6 or below for responses that truly miss key concepts.

**Section**: ${body.section}
**Exercise**: ${body.prompt}
**Criteria**: ${body.criteria?.join(', ') || 'Clear explanation, accuracy, completeness'}

**Trainee Response**:
${body.answer}

Provide feedback in this EXACT format (use the exact icons shown):

**Score: X/10**

**Strengths:**
- ✅ [Specific strength - what they did well - find at least 2 positives]
- ✅ [Another specific strength - be generous in recognizing understanding]

**Suggestions for Enhancement:**
- 💡 [Helpful suggestion framed positively - "Consider also..." or "You could strengthen this by..."]
- 💡 [Another suggestion if applicable]

**Corrections (only if factually incorrect):**
- ⚠️ [Only include if there's an actual factual error - many responses won't need this section]

**Great Insight:** [Highlight something specific they said that shows good thinking]

**Model Answer:**
[Only provide if score is 6/10 or below. For scores 7/10 and above, write: "Your response demonstrates solid understanding! For additional depth, you might explore [one brief suggestion]."]

REMEMBER: Be supportive and developmental. The goal is to build confidence while guiding improvement.`
  } else if (body.type === 'quiz') {
    prompt = `You are a supportive training coach. The trainee completed a quiz with these results:

**Section**: ${body.section}
**Score**: ${body.correctAnswers}/${body.totalQuestions} correct (${body.percentage}%)

**Questions Missed**:
${body.missedQuestions?.map((q: any) => `- ${q.question}\n  Their answer: ${q.theirAnswer}\n  Correct answer: ${q.correctAnswer}`).join('\n') || 'None - perfect score!'}

Provide brief, encouraging feedback in this EXACT format:

**Quiz Score: ${body.correctAnswers}/${body.totalQuestions} (${body.percentage}%)**

**Feedback:**
[2-3 sentences - be encouraging! If they missed questions, frame it as a learning opportunity, not a failure. Acknowledge what they got right before addressing what to review.]

**Next Steps:** [Positive framing - "To strengthen your knowledge..." or "You're ready to move forward!"]`
  } else if (body.type === 'mastery') {
    prompt = `You are a senior training coach for Sphere's UAE engagement program. Your role is to provide developmental feedback that builds confidence while identifying growth areas.

**SCORING PHILOSOPHY** (IMPORTANT - read before evaluating):
- This is a LEARNING environment - be supportive and recognize effort
- Score generously - if they demonstrate understanding of core concepts, that merits a solid score
- 10/10 = Exceptional, could serve as a model answer
- 9/10 = Excellent, comprehensive understanding
- 8/10 = Good, solid grasp of the material
- 7/10 = Adequate, covers the key points
- 6/10 = Shows effort and partial understanding
- Below 6 = Only for responses that fundamentally miss the point

Most thoughtful responses should score 7-9. Reserve 6 or below for responses that miss essential concepts.

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
- ✅ Strengths: [What they did well - find positives first]
- 💡 Enhancement: [Framed as opportunity, not criticism]
- ⚠️ Correction: [Only if factually wrong - omit if no actual errors]
- Verdict: ✅ Pass / 💡 Good with room to grow

**Model Answer for Question ${i + 1}:**
[Only if score is 6/10 or below. For 7/10 and above, write: "Your response shows solid understanding. For additional depth, consider [one brief enhancement]."]
`).join('\n')}

**OVERALL WRITTEN SCORE: X/10**

**Summary:**
- ✅ [Key strength - what they're doing well overall]
- 💡 [One growth area framed positively]

**OVERALL ASSESSMENT:** [2-3 sentences - be encouraging! Acknowledge their effort and understanding. Frame any gaps as opportunities for continued learning, not deficiencies.]

REMEMBER: The goal is to develop confident, capable team members. Lead with what's working before suggesting improvements.`
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
