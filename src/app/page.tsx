'use client'

import { useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import { 
  CheckCircle, ChevronRight, BookOpen, PenTool, Brain, Trophy, 
  Loader2, Send, RefreshCw, Menu, FileText, Bookmark, BookmarkCheck, 
  StickyNote, Award, ClipboardList, AlertCircle, ExternalLink, Settings
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
import Link from 'next/link'

// Admin emails list
const ADMIN_EMAILS = ['admin@sphere.com', 'anthony@vc.cafe']

// Sphere Logo Component
const SphereLogo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg width="109" height="29" viewBox="0 0 109 29" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_652_1968)">
      <path d="M14.0231 2.64901C7.47532 2.64901 2.14941 7.97491 2.14941 14.5227C2.14941 21.0706 7.47532 26.3965 14.0231 26.3965C20.571 26.3965 25.8969 21.0706 25.8969 14.5227C25.8969 7.97491 20.571 2.64901 14.0231 2.64901Z" fill="url(#paint0_linear_652_1968)" style={{mixBlendMode: 'multiply'}}/>
      <path d="M3.87951 18.2133C4.49263 19.8994 6.68387 20.7953 9.55299 20.7953C11.4485 20.7953 13.6397 20.4045 15.8698 19.5928C21.4721 17.5548 25.1874 13.63 24.1663 10.83H24.1685C22.6594 6.68498 18.6871 3.72734 14.0218 3.72734C8.06122 3.72734 3.22754 8.56103 3.22754 14.5216C3.22754 15.8191 3.45638 17.0626 3.8752 18.2133H3.87736H3.87951Z" fill="white"/>
      <path d="M23.2854 16.2414C21.6058 18.016 19.1037 19.5682 16.2389 20.6088C13.9613 21.4378 11.6491 21.876 9.5529 21.876C7.97045 21.876 6.60605 21.6256 5.51367 21.1615C7.48903 23.6895 10.5654 25.3173 14.0217 25.3173C19.9823 25.3173 24.816 20.4836 24.816 14.523C24.816 14.3934 24.8117 14.2639 24.8052 14.1344C24.449 14.836 23.9417 15.542 23.2832 16.2393L23.2854 16.2414Z" fill="white"/>
      <path d="M9.55299 20.796C10.2784 20.796 11.0491 20.7377 11.8457 20.6211C11.8327 20.6168 11.8198 20.6125 11.8068 20.6082C8.94204 19.5655 6.43992 18.0154 4.76033 16.2408C4.09972 15.5435 3.59239 14.8376 3.23833 14.1359C3.23402 14.2655 3.22754 14.3928 3.22754 14.5245C3.22754 15.822 3.45638 17.0655 3.8752 18.2162H3.87736C4.49047 19.9022 6.68171 20.796 9.55084 20.796H9.55299Z" fill="url(#paint1_linear_652_1968)"/>
      <path d="M14.0218 21.2839C12.4847 21.6703 10.9692 21.8754 9.55078 21.8754C7.96834 21.8754 6.60394 21.625 5.51156 21.1609C7.48691 23.6889 10.5633 25.3167 14.0196 25.3167C17.476 25.3167 20.5523 23.6889 22.5277 21.1609C21.4353 21.6272 20.0731 21.8754 18.4885 21.8754C17.0722 21.8754 15.5546 21.6703 14.0196 21.2839H14.0218Z" fill="url(#paint2_linear_652_1968)"/>
    </g>
    <path d="M34.0022 18.503L35.8885 16.5553C36.5492 17.9808 37.8216 18.4089 39.4254 18.4089C40.8157 18.4089 41.5942 17.9808 41.5942 17.3398C41.5942 16.7929 40.958 16.4612 39.2363 16.1048C35.5571 15.3674 34.3314 14.2288 34.3314 12.2565C34.3314 10.2841 36.1466 8.43055 39.6367 8.43055C42.3483 8.43055 43.8097 9.23742 44.8953 10.9498L42.8911 12.6599C42.2082 11.4249 41.265 10.8063 39.6834 10.8063C38.3621 10.8063 37.5613 11.3286 37.5613 11.9472C37.5613 12.5658 38.1508 12.9916 40.1305 13.3973C43.574 14.0854 44.8463 15.1321 44.8463 17.1044C44.8463 19.2426 42.9845 20.7869 39.4699 20.7869C37.0408 20.7869 35.0833 20.1212 34 18.5052L34.0022 18.503Z" fill="white"/>
    <path d="M72.8675 12.7518V20.5448H69.6376V13.7021C69.6376 11.658 68.7656 10.9946 67.54 10.9946C66.1719 10.9946 64.8284 11.8979 64.8284 14.2736V20.5448H61.5985V3.46379H64.8284V10.6853C65.5825 9.16569 66.9505 8.4283 68.6255 8.4283C71.0768 8.4283 72.8697 9.87843 72.8697 12.7518H72.8675Z" fill="white"/>
    <path d="M86.2741 15.8403H77.9258C78.255 17.5505 79.2938 18.3596 80.8732 18.3596C82.2412 18.3596 83.1376 17.8373 83.4669 16.887L86.1073 17.862C85.3532 19.7626 83.538 20.7847 80.8732 20.7847C76.9582 20.7847 74.7426 18.503 74.7426 14.6076C74.7426 10.7122 76.8892 8.43055 80.6841 8.43055C84.479 8.43055 86.3675 10.6629 86.3675 14.5605C86.3675 14.8923 86.3208 15.5355 86.2741 15.8426V15.8403ZM77.9036 13.5587H83.3979C83.1376 11.7768 82.1478 10.8265 80.6618 10.8265C79.1759 10.8265 78.1616 11.7522 77.9036 13.5587Z" fill="white"/>
    <path d="M96.2217 8.69049L95.8213 11.5414C95.4921 11.3285 94.9493 11.1851 94.3354 11.1851C92.9207 11.1851 91.5059 12.2295 91.5059 14.3924V20.547H88.2761V8.66584H91.0833V10.9946C91.6972 9.35616 93.1097 8.42826 94.9494 8.42826C95.4676 8.42826 95.9392 8.5224 96.2217 8.69049Z" fill="white"/>
    <path d="M108.32 15.8403H99.9722C100.301 17.5505 101.34 18.3596 102.92 18.3596C104.288 18.3596 105.184 17.8373 105.513 16.887L108.154 17.862C107.4 19.7626 105.584 20.7847 102.92 20.7847C99.0046 20.7847 96.789 18.503 96.789 14.6076C96.789 10.7122 98.9356 8.43055 102.73 8.43055C106.525 8.43055 108.414 10.6629 108.414 14.5605C108.414 14.8923 108.367 15.5355 108.32 15.8426V15.8403ZM99.95 13.5587H105.444C105.184 11.7768 104.194 10.8265 102.708 10.8265C101.222 10.8265 100.208 11.7522 99.95 13.5587Z" fill="white"/>
    <path d="M59.661 14.5829C59.661 18.4783 57.0606 20.7846 53.9486 20.7846C52.2047 20.7846 50.7076 19.906 50.0247 18.5747V25.5362H46.7949V8.66584H50.0247V10.6987C50.6854 9.1791 52.0623 8.42826 53.9486 8.42826C57.0851 8.42826 59.661 10.7099 59.661 14.5829ZM56.6291 14.6076C56.6291 12.1847 54.9252 10.9251 53.2035 10.9251C51.4817 10.9251 50.0225 12.1847 50.0225 14.4888V14.7264C50.0225 16.9834 51.504 18.29 53.2035 18.29C54.9029 18.29 56.6291 17.0304 56.6291 14.6076Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_652_1968" x1="6.06813" y1="6.1628" x2="22.4482" y2="25.508" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2C61F9"/>
        <stop offset="1" stopColor="#8B5CF6"/>
      </linearGradient>
      <linearGradient id="paint1_linear_652_1968" x1="3.22754" y1="17.4659" x2="11.8457" y2="17.4659" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2C61F9"/>
        <stop offset="1" stopColor="#8B5CF6"/>
      </linearGradient>
      <linearGradient id="paint2_linear_652_1968" x1="5.51156" y1="23.2391" x2="22.5277" y2="23.2391" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2C61F9"/>
        <stop offset="1" stopColor="#8B5CF6"/>
      </linearGradient>
    </defs>
  </svg>
)

export default function TrainingPlatform() {
  const { user, isLoaded } = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress || ''
  const isAdmin = ADMIN_EMAILS.includes(userEmail)
  
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
  const { exerciseAnswers, setExerciseAnswer, aiFeedback, setAiFeedback, exerciseScores, setExerciseScore } = useExercises()
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

  // Calculate overall average score
  const calculateAverageScore = () => {
    let totalScores: number[] = []
    
    // Add exercise scores
    Object.values(exerciseScores || {}).forEach((score: any) => {
      if (score !== null && score !== undefined) totalScores.push(score)
    })
    
    // Add quiz scores
    pillarsData.forEach((p: any) => {
      p.sections.forEach((s: any) => {
        if (quizSubmitted[s.id] && progress[s.id]?.quizScore !== undefined) {
          const percentage = (progress[s.id].quizScore / s.quiz.length) * 100
          totalScores.push(percentage)
        }
      })
    })
    
    // Add mastery scores
    Object.values(masterQuizScores || {}).forEach((score: any) => {
      if (score?.overall) totalScores.push(score.overall)
    })
    
    if (totalScores.length === 0) return null
    return Math.round(totalScores.reduce((a, b) => a + b, 0) / totalScores.length)
  }

  const averageScore = calculateAverageScore()

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
      if (data.score !== null) {
        setExerciseScore(sectionKey, data.score)
      }
      updateProgress(sectionKey, { exercise: true })
    } catch (e) {
      setAiFeedback(sectionKey, 'Error getting feedback. Please try again.')
    }
    setLoading(false)
  }

  // Submit quiz
  const handleSubmitQuiz = async () => {
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
            <SphereLogo className="h-8 w-auto" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Average Score */}
          {averageScore !== null && (
            <div className="hidden md:flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium">Avg: {averageScore}%</span>
            </div>
          )}

          {/* Progress */}
          <div className="hidden md:flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">{totalProgress}%</span>
          </div>

          <a href="https://docs.google.com/document/d/1BHSNW_pYGk0OWELyuxP4Flw1OcHG4asx/edit" target="_blank" className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-sm hidden sm:inline">Glossary</span>
          </a>

          <a href="https://drive.google.com/drive/folders/10JXZPCZRVSO_92nTm7RP8Ax-c1Ax6XKa" target="_blank" className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="text-sm hidden sm:inline">Files</span>
          </a>

          {/* Admin Button - Only show for admins */}
          {isAdmin && (
            <Link href="/admin" className="flex items-center gap-2 bg-purple-600/20 border border-purple-500/50 px-3 py-1.5 rounded-lg hover:bg-purple-600/30 transition">
              <Settings className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400 hidden sm:inline">Admin</span>
            </Link>
          )}

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
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm truncate block ${isActive ? 'text-white' : 'text-gray-300'}`}>{s.title}</span>
                        {/* Progress Dots */}
                        <div className="flex gap-1.5 mt-1.5">
                          <div className={`w-2 h-2 rounded-full ${sp.learn ? 'bg-blue-500' : 'bg-slate-600'}`} title="Learn" />
                          <div className={`w-2 h-2 rounded-full ${sp.exercise ? 'bg-amber-500' : 'bg-slate-600'}`} title="Exercise" />
                          <div className={`w-2 h-2 rounded-full ${sp.quiz ? 'bg-emerald-500' : 'bg-slate-600'}`} title="Quiz" />
                        </div>
                      </div>
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
                  {masterQuizSubmitted[pillar.id] && masterQuizScores[pillar.id] && (
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded ${masterQuizScores[pillar.id].passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {masterQuizScores[pillar.id].overall}%
                    </span>
                  )}
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
                    {tab.id === 'exercise' && exerciseScores[sectionKey] && (
                      <span className="ml-1 text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">{exerciseScores[sectionKey]}%</span>
                    )}
                    {tab.id === 'quiz' && quizSubmitted[sectionKey] && progress[sectionKey]?.quizScore !== undefined && (
                      <span className="ml-1 text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">
                        {Math.round((progress[sectionKey].quizScore / section.quiz.length) * 100)}%
                      </span>
                    )}
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

                {/* Pillar Overview - Only show on first section */}
                {currentSection === 0 && pillar.overview && (
                  <div className={`${pillarColors.bg} rounded-xl p-6 border ${pillarColors.border}`}>
                    <h3 className={`font-semibold ${pillarColors.text} mb-4`}>Why This Pillar Matters</h3>
                    <div 
                      className="text-gray-300 whitespace-pre-wrap leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: pillar.overview
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                          .replace(/^- (.*$)/gim, '<div class="ml-4 mb-2">• $1</div>')
                      }}
                    />
                  </div>
                )}
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
                {progress[sectionKey]?.learn && (
                  <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400">Section completed!</span>
                    <button onClick={() => setCurrentTab('exercise')} className="ml-auto text-sm text-blue-400 hover:underline">
                      Continue to Exercise →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Exercise Tab */}
            {currentTab === 'exercise' && !showMasterQuiz && (
              <div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
                  <h3 className="font-semibold text-white mb-4">{section.exercise.title}</h3>
                  <p className="text-gray-300 whitespace-pre-wrap">{section.exercise.prompt}</p>
                  {section.exercise.criteria?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-xs text-slate-400 mb-2">Evaluation Criteria:</p>
                      <div className="flex flex-wrap gap-2">
                        {section.exercise.criteria.map((c: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-slate-700 rounded text-xs text-gray-300">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
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
                    <button onClick={submitExercise} disabled={loading || !exerciseAnswers[sectionKey]?.trim()} className={`px-6 py-3 bg-gradient-to-r ${pillarColors.gradient} text-white rounded-lg disabled:opacity-50`}>
                      {loading ? (
                        <><Loader2 className="w-5 h-5 inline mr-2 animate-spin" />Getting Feedback...</>
                      ) : (
                        <><Send className="w-5 h-5 inline mr-2" />Submit for AI Feedback</>
                      )}
                    </button>
                    
                    {/* Exercise Score & Feedback */}
                    {aiFeedback[sectionKey] && (
                      <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
                        {exerciseScores[sectionKey] && (
                          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-700">
                            <div className={`text-3xl font-bold ${exerciseScores[sectionKey] >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                              {exerciseScores[sectionKey]}%
                            </div>
                            <div>
                              <div className="text-white font-medium">Exercise Score</div>
                              <div className="text-sm text-slate-400">
                                {exerciseScores[sectionKey] >= 70 ? '✅ Great work!' : '⚠️ Review feedback below'}
                              </div>
                            </div>
                          </div>
                        )}
                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-400" />
                          AI Feedback
                        </h4>
                        <p className="text-gray-300 whitespace-pre-wrap">{aiFeedback[sectionKey]}</p>
                        <button onClick={() => setCurrentTab('quiz')} className="mt-4 text-sm text-blue-400 hover:underline">
                          Continue to Quiz →
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Quiz Tab */}
            {currentTab === 'quiz' && !showMasterQuiz && section.quiz && (
              <div className="space-y-6">
                {/* Quiz Score Summary */}
                {quizSubmitted[sectionKey] && progress[sectionKey]?.quizScore !== undefined && (
                  <div className={`p-6 rounded-xl border ${progress[sectionKey].quizScore === section.quiz.length ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-amber-500/10 border-amber-500/50'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`text-4xl font-bold ${progress[sectionKey].quizScore === section.quiz.length ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {Math.round((progress[sectionKey].quizScore / section.quiz.length) * 100)}%
                      </div>
                      <div>
                        <div className="text-white font-medium text-lg">
                          {progress[sectionKey].quizScore}/{section.quiz.length} Correct
                        </div>
                        <div className="text-slate-400">
                          {progress[sectionKey].quizScore === section.quiz.length ? '🎉 Perfect score!' : 'Review incorrect answers below'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                            <div className="flex items-center gap-2">
                              {opt}
                              {submitted && correct && <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto" />}
                              {submitted && selected && !correct && <AlertCircle className="w-4 h-4 text-red-400 ml-auto" />}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
                {!quizSubmitted[sectionKey] && (
                  <button 
                    onClick={handleSubmitQuiz} 
                    disabled={Object.keys(quizAnswers[sectionKey] || {}).length < section.quiz.length}
                    className={`px-6 py-3 bg-gradient-to-r ${pillarColors.gradient} text-white rounded-lg disabled:opacity-50`}
                  >
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
                {/* Score Summary if submitted */}
                {masterQuizSubmitted[pillar.id] && masterQuizScores[pillar.id] && (
                  <div className={`p-6 rounded-xl border ${masterQuizScores[pillar.id].passed ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-amber-500/10 border-amber-500/50'}`}>
                    <div className="flex items-center gap-6">
                      <div className={`text-5xl font-bold ${masterQuizScores[pillar.id].passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {masterQuizScores[pillar.id].overall}%
                      </div>
                      <div>
                        <div className="text-white font-medium text-xl flex items-center gap-2">
                          {masterQuizScores[pillar.id].passed ? (
                            <><CheckCircle className="w-6 h-6 text-emerald-400" /> Assessment Passed!</>
                          ) : (
                            <><AlertCircle className="w-6 h-6 text-amber-400" /> Needs Improvement</>
                          )}
                        </div>
                        <div className="text-slate-400 mt-1">
                          MC: {masterQuizScores[pillar.id].mcCorrect}/{masterQuizScores[pillar.id].mcTotal} • 
                          Written: {masterQuizScores[pillar.id].written}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                      <div className="flex items-start gap-2 mb-4">
                        <span className={`px-2 py-0.5 rounded text-xs ${q.type === 'multiple_choice' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                          {q.type === 'multiple_choice' ? 'Multiple Choice' : 'Written'}
                        </span>
                      </div>
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
                    {masterQuizLoading ? (
                      <><Loader2 className="w-5 h-5 inline mr-2 animate-spin" />Evaluating...</>
                    ) : (
                      <><Trophy className="w-5 h-5 inline mr-2" />Submit for AI Evaluation</>
                    )}
                  </button>
                ) : masterQuizFeedback[pillar.id] && (
                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      AI Evaluation
                    </h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{masterQuizFeedback[pillar.id]}</p>
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
