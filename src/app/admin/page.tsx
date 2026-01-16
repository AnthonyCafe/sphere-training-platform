'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { pillarsData } from '@/lib/pillars-data'
import { 
  Users, Trophy, BookOpen, CheckCircle, AlertCircle, 
  ChevronDown, ChevronUp, Download, RefreshCw, ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

interface UserStats {
  user_id: string
  email: string
  name: string
  totalProgress: number
  sectionsCompleted: number
  totalSections: number
  quizAverage: number
  masteryScores: Record<string, any>
  lastActive: string
}

export default function AdminDashboard() {
  const { user } = useUser()
  const [users, setUsers] = useState<UserStats[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedUser, setExpandedUser] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'lastActive'>('progress')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Admin emails - add your admin emails here
  const adminEmails = ['admin@sphere.com', user?.primaryEmailAddress?.emailAddress]

  const isAdmin = adminEmails.includes(user?.primaryEmailAddress?.emailAddress || '')

  const totalSections = pillarsData.reduce((acc: number, p: any) => acc + p.sections.length, 0)

  useEffect(() => {
    if (!isAdmin) return
    loadAllUsers()
  }, [isAdmin])

  const loadAllUsers = async () => {
    setLoading(true)
    
    try {
      // Get all unique users from progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')

      const { data: masteryData } = await supabase
        .from('mastery_scores')
        .select('*')

      const { data: quizData } = await supabase
        .from('quiz_answers')
        .select('*')

      // Group by user
      const userMap = new Map<string, UserStats>()

      progressData?.forEach((p: any) => {
        if (!userMap.has(p.user_id)) {
          userMap.set(p.user_id, {
            user_id: p.user_id,
            email: '',
            name: `User ${p.user_id.slice(0, 8)}`,
            totalProgress: 0,
            sectionsCompleted: 0,
            totalSections,
            quizAverage: 0,
            masteryScores: {},
            lastActive: p.updated_at
          })
        }

        const user = userMap.get(p.user_id)!
        if (p.learn_complete) user.sectionsCompleted += 0.33
        if (p.exercise_complete) user.sectionsCompleted += 0.33
        if (p.quiz_complete) user.sectionsCompleted += 0.34

        if (new Date(p.updated_at) > new Date(user.lastActive)) {
          user.lastActive = p.updated_at
        }
      })

      // Add mastery scores
      masteryData?.forEach((m: any) => {
        const user = userMap.get(m.user_id)
        if (user) {
          user.masteryScores[m.pillar_id] = {
            score: m.overall_score,
            passed: m.passed
          }
        }
      })

      // Calculate quiz averages
      const userQuizScores = new Map<string, number[]>()
      quizData?.forEach((q: any) => {
        if (!userQuizScores.has(q.user_id)) {
          userQuizScores.set(q.user_id, [])
        }
        // Calculate score based on answers
        const pillar = pillarsData.find((p: any) => 
          p.sections.some((s: any) => s.id === q.section_id)
        ) as any
        const section = pillar?.sections.find((s: any) => s.id === q.section_id)
        if (section?.quiz && q.answers) {
          const correct = section.quiz.reduce((acc: number, quiz: any, i: number) => 
            q.answers[i] === quiz.correct ? acc + 1 : acc, 0
          )
          userQuizScores.get(q.user_id)!.push((correct / section.quiz.length) * 100)
        }
      })

      userQuizScores.forEach((scores, userId) => {
        const user = userMap.get(userId)
        if (user && scores.length > 0) {
          user.quizAverage = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        }
      })

      // Calculate total progress
      userMap.forEach(user => {
        user.totalProgress = Math.round((user.sectionsCompleted / totalSections) * 100)
      })

      setUsers(Array.from(userMap.values()))
    } catch (error) {
      console.error('Error loading users:', error)
    }
    
    setLoading(false)
  }

  const sortedUsers = [...users].sort((a, b) => {
    let aVal: any, bVal: any
    switch (sortBy) {
      case 'name':
        aVal = a.name.toLowerCase()
        bVal = b.name.toLowerCase()
        break
      case 'progress':
        aVal = a.totalProgress
        bVal = b.totalProgress
        break
      case 'lastActive':
        aVal = new Date(a.lastActive).getTime()
        bVal = new Date(b.lastActive).getTime()
        break
    }
    return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
  })

  const exportCSV = () => {
    const headers = ['User ID', 'Name', 'Progress %', 'Sections Completed', 'Quiz Average', 'Last Active']
    pillarsData.forEach((p: any) => headers.push(`${p.shortTitle} Mastery`))

    const rows = users.map(u => {
      const row = [
        u.user_id,
        u.name,
        u.totalProgress,
        Math.round(u.sectionsCompleted),
        u.quizAverage,
        new Date(u.lastActive).toLocaleDateString()
      ]
      pillarsData.forEach((p: any) => {
        const score = u.masteryScores[p.id]
        row.push(score ? `${score.score}% ${score.passed ? '✓' : '✗'}` : '-')
      })
      return row
    })

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sphere-training-progress-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-slate-400 mb-4">You don't have permission to view this page.</p>
          <Link href="/" className="text-blue-400 hover:underline">← Back to Training</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-slate-400">Monitor trainee progress and scores</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadAllUsers}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold">{users.length}</div>
                <div className="text-sm text-slate-400">Total Users</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="text-2xl font-bold">
                  {users.length > 0 ? Math.round(users.reduce((a, u) => a + u.totalProgress, 0) / users.length) : 0}%
                </div>
                <div className="text-sm text-slate-400">Avg Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-400" />
              <div>
                <div className="text-2xl font-bold">
                  {users.length > 0 ? Math.round(users.reduce((a, u) => a + u.quizAverage, 0) / users.length) : 0}%
                </div>
                <div className="text-sm text-slate-400">Avg Quiz Score</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.totalProgress === 100).length}
                </div>
                <div className="text-sm text-slate-400">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h2 className="font-semibold">Trainee Progress</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Sort by:</span>
              {(['name', 'progress', 'lastActive'] as const).map(key => (
                <button
                  key={key}
                  onClick={() => {
                    if (sortBy === key) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                    else { setSortBy(key); setSortOrder('desc') }
                  }}
                  className={`px-3 py-1 rounded ${sortBy === key ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                  {key === 'lastActive' ? 'Last Active' : key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortBy === key && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No users found</div>
          ) : (
            <div className="divide-y divide-slate-700">
              {sortedUsers.map(u => (
                <div key={u.user_id}>
                  <div
                    onClick={() => setExpandedUser(expandedUser === u.user_id ? null : u.user_id)}
                    className="p-4 hover:bg-slate-700/50 cursor-pointer flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium">{u.name}</div>
                      <div className="text-sm text-slate-400">ID: {u.user_id.slice(0, 12)}...</div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-slate-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${u.totalProgress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                            style={{ width: `${u.totalProgress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12">{u.totalProgress}%</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Last active: {new Date(u.lastActive).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="text-right w-20">
                      <div className="text-sm">Quiz Avg</div>
                      <div className={`font-bold ${u.quizAverage >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {u.quizAverage}%
                      </div>
                    </div>

                    {expandedUser === u.user_id ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  {/* Expanded Details */}
                  {expandedUser === u.user_id && (
                    <div className="px-4 pb-4 bg-slate-800/50">
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-2">
                        {pillarsData.map((p: any) => {
                          const score = u.masteryScores[p.id]
                          return (
                            <div
                              key={p.id}
                              className={`p-3 rounded-lg border ${
                                score?.passed ? 'bg-emerald-500/10 border-emerald-500/50' :
                                score ? 'bg-amber-500/10 border-amber-500/50' :
                                'bg-slate-700/50 border-slate-600'
                              }`}
                            >
                              <div className="text-xs text-slate-400 mb-1">{p.shortTitle}</div>
                              {score ? (
                                <>
                                  <div className="font-bold">{score.score}%</div>
                                  <div className="text-xs">
                                    {score.passed ? '✅ Passed' : '⚠️ Needs work'}
                                  </div>
                                </>
                              ) : (
                                <div className="text-slate-500 text-sm">Not taken</div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
