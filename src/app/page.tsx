'use client'

import { useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import { 
  CheckCircle, ChevronRight, BookOpen, PenTool, Brain, Trophy, 
  Loader2, Send, RefreshCw, Menu, FileText, Bookmark, BookmarkCheck, 
  StickyNote, Award, ClipboardList, AlertCircle, ExternalLink 
} from 'lucide-react'
import { pillarsData } from '@/lib/pillars-data'
import { 
  useProgress, 
  useExercises, 
  useQuizzes, 
  useMasteryScores, 
  useNotes, 
  useBookmarks 
} from '@/lib/hooks'

export default function TrainingPlatform() {
  const { user, isLoaded } = useUser()
  
  // Navigation state
  const [currentPillar, setCurrentPillar] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [currentTab, setCurrentTab] = useState('curriculum')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showMasterQuiz, setShowMasterQuiz] = useState(false)
  const [loading, setLoading] = useState(false)
  const [masterQuizLoading, setMasterQuizLoading] = useState(false)

  // Database hooks
  const { progress, setProgress: updateProgress, loading: progressLoading } = useProgress()
  const { exerciseAnswers, setExerciseAnswer, aiFeedback, setAiFeedback } = useExercises()
  const { quizAnswers, setQuizAnswers, quizSubmitted, submitQuiz } = useQuizzes()
  const { 
    masterQuizAnswers, 
    setMasterQuizAnswers, 
    masterQuizSubmitted, 
    masterQuizFeedback, 
    masterQuizScores, 
    saveMasteryScore,
    resetMasteryScore 
  } = useMasteryScores()
  const { notes, setNote } = useNotes()
  const { bookmarks, toggleBookmark } = useBookmarks()

  // Get current pillar and section
  const pillar = pillarsData[currentPillar] as any
  const section = pillar.sections[currentSection]
  const sectionKey = section.id

  // Calculate progress percentages
  const calculatePillarProgress = (pillarIndex: number) => {
    const p = pillarsData[pillarIndex] as any
    let completed = 0
    p.sections.forEach((s: any) => {
      const sp = progress[s.id] || {}
      if (sp.learn) completed += 0.33
      if (sp.exercise) completed += 0.33
      if (sp.quiz) completed += 0.34
    })
    return Math.round((completed / p.sections.length) * 100)
  }

  const totalProgress = Math.round(
    pillarsData.reduce((acc, _, i) => acc + calculatePillarProgress(i), 0) / pillarsData.length
  )

  // Calculate user score
  const calculateScore = () => {
    let totalQuizzes = 0
    let correctAnswers = 0
    pillarsData.forEach((p: any) => {
      p.sections.forEach((s: any) => {
        if (quizSubmitted[s.id] && progress[s.id]?.quizScore !== undefined) {
          totalQuizzes += s.quiz.length
          correctAnswers += progress[s.id].quizScore
        }
      })
    })
    return { 
      totalQuizzes, 
      correctAnswers, 
      percentage: totalQuizzes > 0 ? Math.round((correctAnswers / totalQuizzes) * 100) : 0 
    }
  }

  const score = calculateScore()

  // Mark learn complete
  const markLearnComplete = () => {
    updateProgress(sectionKey, { learn: true })
  }

  const isBookmarked = bookmarks.includes(`${pillar.id}-${sectionKey}`)

  // Submit exercise with AI feedback
  const submitExercise = async () => {
    if (!exerciseAnswers[sectionKey]?.trim()) return
    setLoading(true)
    try {
      const response = await fetch('/api/ai-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'exercise',
          section: section.title,
          prompt: section.exercise.prompt,
          criteria: section.exercise.criteria,
          answer: exerciseAnswers[sectionKey]
        })
      })
      const data = await response.json()
      setAiFeedback(sectionKey, data.feedback || 'Unable to get feedback.')
      updateProgress(sectionKey, { exercise: true })
    } catch (e) {
      setAiFeedback(sectionKey, 'Error getting feedback. Please try again.')
    }
    setLoading(false)
  }

  // Submit quiz
  const handleSubmitQuiz = () => {
    const answers = quizAnswers[sectionKey] || {}
    const quizScore = section.quiz.reduce((acc: number, q: any, i: number) => 
      answers[i] === q.correct ? acc + 1 : acc, 0
    )
    submitQuiz(sectionKey)
    updateProgress(sectionKey, { quiz: true, quizScore })
  }

  // Submit master quiz
  const handleSubmitMasterQuiz = async (pillarKey: string, masterQuiz: any, answers: any) => {
    setMasterQuizLoading(true)
    
    const mcQuestions = masterQuiz.questions.filter((q: any) => q.type === 'multiple_choice')
    const mcCorrect = mcQuestions.reduce((acc: number, q: any, i: number) => {
      const qKey = `mc-${i}`
      return answers[qKey] === q.correct ? acc + 1 : acc
    }, 0)
    const mcScore = mcQuestions.length > 0 ? Math.round((mcCorrect / mcQuestions.length) * 100) : 100
    
    const writtenQuestions = masterQuiz.questions.filter((q: any) => 
      q.type === 'analysis' || q.type === 'application'
    )
    const writtenResponses = writtenQuestions.map((q: any) => ({
      question: q.question,
      rubric: q.rubric || [],
      answer: answers[`written-${masterQuiz.questions.indexOf(q)}`] || ''
    }))
    
    try {
      const response = await fetch('/api/ai-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'mastery',
          title: masterQuiz.title,
          scenario: masterQuiz.scenario,
          responses: writtenResponses
        })
      })
      const data = await response.json()
      
      const scoreMatch = data.feedback?.match(/OVERALL WRITTEN SCORE[:\s]*(\d+)\/10/i)
      const writtenScore = scoreMatch ? parseInt(scoreMatch[1]) * 10 : 70
      const overallScore = Math.round((mcScore * 0.4) + (writtenScore * 0.6))
      
      const scores = {
        mc: mcScore,
        mcCorrect,
        mcTotal: mcQuestions.length,
        written: writtenScore,
        overall: overallScore,
        passed: overallScore >= masterQuiz.passingScore
      }
      
      saveMasteryScore(pillarKey, answers, scores, data.feedback || '')
    } catch (e) {
      const scores = {
        mc: mcScore,
        mcCorrect,
        mcTotal: mcQuestions.length,
        written: null,
        overall: mcScore,
        passed: mcScore >= masterQuiz.passingScore
      }
      saveMasteryScore(pillarKey, answers, scores, 'Unable to get AI feedback.')
    }
    
    setMasterQuizLoading(false)
  }

  // Color helper
  const getPillarColors = (color: string) => {
    const colors: Record<string, any> = {
      blue: { gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/50', text: 'text-blue-400', solid: 'bg-blue-500' },
      emerald: { gradient: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-500/10', border: 'border-emerald-500/50', text: 'text-emerald-400', solid: 'bg-emerald-500' },
      amber: { gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-500/10', border: 'border-amber-500/50', text: 'text-amber-400', solid: 'bg-amber-500' },
      purple: { gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-500/10', border: 'border-purple-500/50', text: 'text-purple-400', solid: 'bg-purple-500' },
      rose: { gradient: 'from-rose-500 to-rose-600', bg: 'bg-rose-500/10', border: 'border-rose-500/50', text: 'text-rose-400', solid: 'bg-rose-500' },
      cyan: { gradient: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-500/10', border: 'border-cyan-500/50', text: 'text-cyan-400', solid: 'bg-cyan-500' },
    }
    return colors[color] || colors.blue
  }

  const pillarColors = getPillarColors(pillar.color)

  // Markdown renderer
  const renderMarkdown = (text: string) => {
    if (!text) return ''
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-white mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-white mt-8 mb-4">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 text-slate-300 mb-1">• $1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-slate-300 leading-relaxed">')
  }

  if (!isLoaded || progressLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-400">Loading your progress...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">S</div>
            <div>
              <h1 className="font-semibold text-white text-sm">Sphere Training Platform</h1>
              <p className="text-xs text-slate-400">UAE Counterparty Engagement</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium">{score.percentage}%</span>
          </div>

          <a href="https://docs.google.com/document/d/1BHSNW_pYGk0OWELyuxP4Flw1OcHG4asx/edit" target="_blank" className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-sm hidden sm:inline">Glossary</span>
          </a>

          <a href="https://drive.google.com/drive/folders/10JXZPCZRVSO_92nTm7RP8Ax-c1Ax6XKa" target="_blank" className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="text-sm hidden sm:inline">Files</span>
          </a>

          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 bg-slate-800 border-r border-slate-700 overflow-hidden flex-shrink-0 sticky top-14 h-[calc(100vh-56px)]`}>
          <div className="w-72 h-full flex flex-col">
            {/* Progress */}
            <div className="p-4 border-b border-slate-700">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Overall Progress</span>
                <span className="text-blue-400 font-medium">{totalProgress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${totalProgress}%` }} />
              </div>
            </div>

            {/* Pillar Tabs */}
            <div className="flex border-b border-slate-700">
              {pillarsData.map((p: any, i: number) => {
                const colors = getPillarColors(p.color)
                return (
                  <button
                    key={p.id}
                    onClick={() => { setCurrentPillar(i); setCurrentSection(0); setCurrentTab('curriculum'); setShowMasterQuiz(false); }}
                    className={`flex-1 py-3 text-xs font-medium transition relative ${currentPillar === i ? colors.text : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {p.id === 'final-exam' ? '📝' : `P${i + 1}`}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${currentPillar === i ? colors.solid : 'bg-transparent'}`} />
                  </button>
                )
              })}
            </div>

            {/* Pillar Header */}
            <div className={`p-4 ${pillarColors.bg} border-b ${pillarColors.border}`}>
              <h2 className={`font-semibold ${pillarColors.text}`}>{pillar.shortTitle}</h2>
              <p className="text-xs text-slate-400 mt-1">{pillar.sections.length} sections</p>
            </div>

            {/* Section List */}
            <nav className="flex-1 overflow-y-auto p-2">
              {pillar.sections.map((s: any, i: number) => {
                const sp = progress[s.id] || {}
                const isActive = i === currentSection && !showMasterQuiz
                return (
                  <button
                    key={s.id}
                    onClick={() => { setCurrentSection(i); setCurrentTab('curriculum'); setShowMasterQuiz(false); }}
                    className={`w-full text-left p-3 rounded-lg mb-1 transition-all ${isActive ? `${pillarColors.bg} border ${pillarColors.border}` : 'hover:bg-slate-700/50'}`}
                  >
                    <div className="flex items-start gap-2">
                      {sp.learn && sp.exercise && sp.quiz ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${isActive ? pillarColors.border : 'border-slate-600'}`} />
                      )}
                      <span className={`text-sm truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>{s.title}</span>
                    </div>
                  </button>
                )
              })}

              {/* Mastery Assessment */}
              <button
                onClick={() => setShowMasterQuiz(true)}
                className={`w-full text-left p-3 rounded-lg mt-2 border-t border-slate-700 pt-4 ${showMasterQuiz ? `${pillarColors.bg} border ${pillarColors.border}` : 'hover:bg-slate-700/50'}`}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-white">🏆 Mastery Assessment</span>
                </div>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className={`${pillarColors.bg} border-b ${pillarColors.border} px-6 py-4`}>
            <h1 className="text-xl font-bold text-white">
              {showMasterQuiz ? `${pillar.shortTitle} Mastery Assessment` : section.title}
            </h1>

            {/* Tabs */}
            {!showMasterQuiz && (
              <div className="flex gap-1 mt-4">
                {(pillar.id === 'final-exam' ? [
                  { id: 'curriculum', label: 'Curriculum', icon: ClipboardList },
                  { id: 'exercise', label: 'Checklist', icon: PenTool },
                  { id: 'notes', label: 'Notes', icon: StickyNote },
                ] : [
                  { id: 'curriculum', label: 'Curriculum', icon: ClipboardList },
                  { id: 'learn', label: 'Learn', icon: BookOpen },
                  { id: 'exercise', label: 'Exercise', icon: PenTool },
                  { id: 'quiz', label: 'Quiz', icon: Brain },
                  { id: 'notes', label: 'Notes', icon: StickyNote },
                ]).map((tab: any) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${currentTab === tab.id ? 'bg-slate-700 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 max-w-4xl">
            {/* Curriculum Tab */}
            {currentTab === 'curriculum' && !showMasterQuiz && (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="font-semibold text-white mb-4">Learning Objectives</h3>
                  <ul className="space-y-2">
                    {section.curriculum.objectives.map((obj: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-1" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="font-semibold text-white mb-4">Key Concepts</h3>
                  <ul className="space-y-2">
                    {section.curriculum.keyConcepts.map((c: string, i: number) => (
                      <li key={i} className="text-gray-300">• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Learn Tab */}
            {currentTab === 'learn' && !showMasterQuiz && pillar.id !== 'final-exam' && (
              <div>
                <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(section.learn) }} />
                {!progress[sectionKey]?.learn && (
                  <button onClick={markLearnComplete} className={`mt-8 px-6 py-3 bg-gradient-to-r ${pillarColors.gradient} text-white rounded-lg font-medium`}>
                    <CheckCircle className="w-5 h-5 inline mr-2" />
                    Mark as Complete
                  </button>
                )}
              </div>
            )}

            {/* Exercise Tab */}
            {currentTab === 'exercise' && !showMasterQuiz && (
              <div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
                  <h3 className="font-semibold text-white mb-4">{section.exercise.title}</h3>
                  <p className="text-gray-300 whitespace-pre-wrap">{section.exercise.prompt}</p>
                </div>

                {pillar.id === 'final-exam' ? (
                  <button onClick={() => updateProgress(sectionKey, { exercise: true })} className={`px-6 py-3 bg-gradient-to-r ${pillarColors.gradient} text-white rounded-lg`}>
                    Mark Checklist Complete
                  </button>
                ) : (
                  <>
                    <textarea
                      value={exerciseAnswers[sectionKey] || ''}
                      onChange={(e) => setExerciseAnswer(sectionKey, e.target.value)}
                      placeholder="Write your response..."
                      className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-white mb-4"
                    />
                    <button onClick={submitExercise} disabled={loading} className={`px-6 py-3 bg-gradient-to-r ${pillarColors.gradient} text-white rounded-lg disabled:opacity-50`}>
                      {loading ? 'Getting Feedback...' : 'Submit for AI Feedback'}
                    </button>
                    {aiFeedback[sectionKey] && (
                      <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
                        <h4 className="font-semibold text-white mb-4">AI Feedback</h4>
                        <p className="text-gray-300 whitespace-pre-wrap">{aiFeedback[sectionKey]}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Quiz Tab */}
            {currentTab === 'quiz' && !showMasterQuiz && section.quiz && (
              <div className="space-y-6">
                {section.quiz.map((q: any, qIdx: number) => (
                  <div key={qIdx} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h4 className="font-medium text-white mb-4">{qIdx + 1}. {q.q}</h4>
                    <div className="space-y-2">
                      {q.options.map((opt: string, oIdx: number) => {
                        const selected = quizAnswers[sectionKey]?.[qIdx] === oIdx
                        const submitted = quizSubmitted[sectionKey]
                        const correct = q.correct === oIdx
                        let cls = 'bg-slate-700/50 border-slate-600'
                        if (submitted && correct) cls = 'bg-emerald-500/20 border-emerald-500'
                        else if (submitted && selected) cls = 'bg-red-500/20 border-red-500'
                        else if (selected) cls = `${pillarColors.bg} ${pillarColors.border}`

                        return (
                          <button
                            key={oIdx}
                            onClick={() => !submitted && setQuizAnswers(sectionKey, { ...quizAnswers[sectionKey], [qIdx]: oIdx })}
                            disabled={submitted}
                            className={`w-full text-left p-3 rounded-lg border transition ${cls}`}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
                {!quizSubmitted[sectionKey] && (
                  <button onClick={handleSubmitQuiz} className={`px-6 py-3 bg-gradient-to-r ${pillarColors.gradient} text-white rounded-lg`}>
                    Submit Quiz
                  </button>
                )}
              </div>
            )}

            {/* Notes Tab */}
            {currentTab === 'notes' && !showMasterQuiz && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold text-white mb-4">Your Notes</h3>
                <textarea
                  value={notes[sectionKey] || ''}
                  onChange={(e) => setNote(sectionKey, e.target.value)}
                  placeholder="Add your notes..."
                  className="w-full h-64 bg-slate-700 border border-slate-600 rounded-xl p-4 text-white"
                />
              </div>
            )}

            {/* Master Quiz */}
            {showMasterQuiz && (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="font-semibold text-white mb-4">Scenario</h3>
                  <p className="text-gray-300 whitespace-pre-wrap">{pillar.masterQuiz.scenario}</p>
                </div>

                {pillar.masterQuiz.questions.map((q: any, qIdx: number) => {
                  const pillarKey = pillar.id
                  const answers = masterQuizAnswers[pillarKey] || {}
                  const submitted = masterQuizSubmitted[pillarKey]
                  const mcQuestions = pillar.masterQuiz.questions.filter((x: any) => x.type === 'multiple_choice')
                  const qKey = q.type === 'multiple_choice' ? `mc-${mcQuestions.indexOf(q)}` : `written-${qIdx}`

                  return (
                    <div key={qIdx} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                      <h4 className="font-medium text-white mb-4">{qIdx + 1}. {q.question}</h4>
                      
                      {q.type === 'multiple_choice' ? (
                        <div className="space-y-2">
                          {q.options.map((opt: string, oIdx: number) => {
                            const selected = answers[qKey] === oIdx
                            const correct = q.correct === oIdx
                            let cls = 'bg-slate-700/50 border-slate-600'
                            if (submitted && correct) cls = 'bg-emerald-500/20 border-emerald-500'
                            else if (submitted && selected) cls = 'bg-red-500/20 border-red-500'
                            else if (selected) cls = `${pillarColors.bg} ${pillarColors.border}`

                            return (
                              <button
                                key={oIdx}
                                onClick={() => !submitted && setMasterQuizAnswers({ ...masterQuizAnswers, [pillarKey]: { ...answers, [qKey]: oIdx } })}
                                disabled={submitted}
                                className={`w-full text-left p-3 rounded-lg border transition ${cls}`}
                              >
                                {opt}
                              </button>
                            )
                          })}
                        </div>
                      ) : (
                        <textarea
                          value={answers[qKey] || ''}
                          onChange={(e) => setMasterQuizAnswers({ ...masterQuizAnswers, [pillarKey]: { ...answers, [qKey]: e.target.value } })}
                          disabled={submitted}
                          placeholder="Write your response..."
                          className="w-full h-40 bg-slate-700 border border-slate-600 rounded-lg p-4 text-white"
                        />
                      )}
                    </div>
                  )
                })}

                {!masterQuizSubmitted[pillar.id] ? (
                  <button
                    onClick={() => handleSubmitMasterQuiz(pillar.id, pillar.masterQuiz, masterQuizAnswers[pillar.id] || {})}
                    disabled={masterQuizLoading}
                    className={`px-6 py-3 bg-gradient-to-r ${pillarColors.gradient} text-white rounded-lg disabled:opacity-50`}
                  >
                    {masterQuizLoading ? 'Evaluating...' : 'Submit for AI Evaluation'}
                  </button>
                ) : (
                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="font-semibold text-white mb-4">Results</h3>
                    {masterQuizScores[pillar.id] && (
                      <div className="text-2xl font-bold text-white mb-4">
                        Score: {masterQuizScores[pillar.id].overall}%
                        {masterQuizScores[pillar.id].passed ? ' ✅ Passed' : ' ⚠️ Needs Improvement'}
                      </div>
                    )}
                    {masterQuizFeedback[pillar.id] && (
                      <p className="text-gray-300 whitespace-pre-wrap">{masterQuizFeedback[pillar.id]}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
