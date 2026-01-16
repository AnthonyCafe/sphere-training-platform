'use client'

import { useEffect, useState, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from './supabase'

// Hook for managing user progress
export function useProgress() {
  const { user } = useUser()
  const [progress, setProgress] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  // Load progress from database
  useEffect(() => {
    if (!user) return

    const loadProgress = async () => {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)

      if (data) {
        const progressMap: Record<string, any> = {}
        data.forEach((p) => {
          progressMap[p.section_id] = {
            learn: p.learn_complete,
            exercise: p.exercise_complete,
            quiz: p.quiz_complete,
            quizScore: p.quiz_score,
          }
        })
        setProgress(progressMap)
      }
      setLoading(false)
    }

    loadProgress()
  }, [user])

  // Update progress in database
  const updateProgress = useCallback(async (sectionId: string, updates: any) => {
    if (!user) return

    const newProgress = {
      ...progress,
      [sectionId]: { ...progress[sectionId], ...updates }
    }
    setProgress(newProgress)

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        section_id: sectionId,
        learn_complete: newProgress[sectionId]?.learn || false,
        exercise_complete: newProgress[sectionId]?.exercise || false,
        quiz_complete: newProgress[sectionId]?.quiz || false,
        quiz_score: newProgress[sectionId]?.quizScore || null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,section_id'
      })

    if (error) console.error('Error updating progress:', error)
  }, [user, progress])

  return { progress, setProgress: updateProgress, loading }
}

// Hook for managing exercise answers and AI feedback
export function useExercises() {
  const { user } = useUser()
  const [exerciseAnswers, setExerciseAnswersState] = useState<Record<string, string>>({})
  const [aiFeedback, setAiFeedbackState] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!user) return

    const loadExercises = async () => {
      const { data } = await supabase
        .from('user_progress')
        .select('section_id, exercise_answer, ai_feedback')
        .eq('user_id', user.id)

      if (data) {
        const answers: Record<string, string> = {}
        const feedback: Record<string, string> = {}
        data.forEach((p) => {
          if (p.exercise_answer) answers[p.section_id] = p.exercise_answer
          if (p.ai_feedback) feedback[p.section_id] = p.ai_feedback
        })
        setExerciseAnswersState(answers)
        setAiFeedbackState(feedback)
      }
    }

    loadExercises()
  }, [user])

  const setExerciseAnswer = useCallback(async (sectionId: string, answer: string) => {
    if (!user) return

    setExerciseAnswersState(prev => ({ ...prev, [sectionId]: answer }))

    await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        section_id: sectionId,
        exercise_answer: answer,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,section_id'
      })
  }, [user])

  const setAiFeedback = useCallback(async (sectionId: string, feedback: string) => {
    if (!user) return

    setAiFeedbackState(prev => ({ ...prev, [sectionId]: feedback }))

    await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        section_id: sectionId,
        ai_feedback: feedback,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,section_id'
      })
  }, [user])

  return { exerciseAnswers, setExerciseAnswer, aiFeedback, setAiFeedback }
}

// Hook for managing quiz answers
export function useQuizzes() {
  const { user } = useUser()
  const [quizAnswers, setQuizAnswersState] = useState<Record<string, Record<number, number>>>({})
  const [quizSubmitted, setQuizSubmittedState] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!user) return

    const loadQuizzes = async () => {
      const { data } = await supabase
        .from('quiz_answers')
        .select('*')
        .eq('user_id', user.id)

      if (data) {
        const answers: Record<string, Record<number, number>> = {}
        const submitted: Record<string, boolean> = {}
        data.forEach((q) => {
          answers[q.section_id] = q.answers
          submitted[q.section_id] = q.submitted
        })
        setQuizAnswersState(answers)
        setQuizSubmittedState(submitted)
      }
    }

    loadQuizzes()
  }, [user])

  const setQuizAnswers = useCallback(async (sectionId: string, answers: Record<number, number>) => {
    if (!user) return

    setQuizAnswersState(prev => ({ ...prev, [sectionId]: answers }))

    await supabase
      .from('quiz_answers')
      .upsert({
        user_id: user.id,
        section_id: sectionId,
        answers,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,section_id'
      })
  }, [user])

  const submitQuiz = useCallback(async (sectionId: string) => {
    if (!user) return

    setQuizSubmittedState(prev => ({ ...prev, [sectionId]: true }))

    await supabase
      .from('quiz_answers')
      .upsert({
        user_id: user.id,
        section_id: sectionId,
        submitted: true,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,section_id'
      })
  }, [user])

  return { quizAnswers, setQuizAnswers, quizSubmitted, submitQuiz }
}

// Hook for managing mastery assessments
export function useMasteryScores() {
  const { user } = useUser()
  const [masterQuizAnswers, setMasterQuizAnswersState] = useState<Record<string, any>>({})
  const [masterQuizSubmitted, setMasterQuizSubmittedState] = useState<Record<string, boolean>>({})
  const [masterQuizFeedback, setMasterQuizFeedbackState] = useState<Record<string, string>>({})
  const [masterQuizScores, setMasterQuizScoresState] = useState<Record<string, any>>({})

  useEffect(() => {
    if (!user) return

    const loadMasteryScores = async () => {
      const { data } = await supabase
        .from('mastery_scores')
        .select('*')
        .eq('user_id', user.id)

      if (data) {
        const answers: Record<string, any> = {}
        const submitted: Record<string, boolean> = {}
        const feedback: Record<string, string> = {}
        const scores: Record<string, any> = {}

        data.forEach((m) => {
          answers[m.pillar_id] = m.answers
          submitted[m.pillar_id] = true
          feedback[m.pillar_id] = m.feedback
          scores[m.pillar_id] = {
            mc: m.mc_score,
            mcCorrect: m.mc_correct,
            mcTotal: m.mc_total,
            written: m.written_score,
            overall: m.overall_score,
            passed: m.passed,
          }
        })

        setMasterQuizAnswersState(answers)
        setMasterQuizSubmittedState(submitted)
        setMasterQuizFeedbackState(feedback)
        setMasterQuizScoresState(scores)
      }
    }

    loadMasteryScores()
  }, [user])

  const saveMasteryScore = useCallback(async (
    pillarId: string,
    answers: any,
    scores: any,
    feedback: string
  ) => {
    if (!user) return

    setMasterQuizAnswersState(prev => ({ ...prev, [pillarId]: answers }))
    setMasterQuizSubmittedState(prev => ({ ...prev, [pillarId]: true }))
    setMasterQuizFeedbackState(prev => ({ ...prev, [pillarId]: feedback }))
    setMasterQuizScoresState(prev => ({ ...prev, [pillarId]: scores }))

    await supabase
      .from('mastery_scores')
      .upsert({
        user_id: user.id,
        pillar_id: pillarId,
        answers,
        mc_score: scores.mc,
        mc_correct: scores.mcCorrect,
        mc_total: scores.mcTotal,
        written_score: scores.written,
        overall_score: scores.overall,
        passed: scores.passed,
        feedback,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,pillar_id'
      })
  }, [user])

  const resetMasteryScore = useCallback(async (pillarId: string) => {
    if (!user) return

    setMasterQuizAnswersState(prev => ({ ...prev, [pillarId]: {} }))
    setMasterQuizSubmittedState(prev => ({ ...prev, [pillarId]: false }))
    setMasterQuizFeedbackState(prev => ({ ...prev, [pillarId]: '' }))
    setMasterQuizScoresState(prev => ({ ...prev, [pillarId]: null }))

    await supabase
      .from('mastery_scores')
      .delete()
      .eq('user_id', user.id)
      .eq('pillar_id', pillarId)
  }, [user])

  return {
    masterQuizAnswers,
    setMasterQuizAnswers: setMasterQuizAnswersState,
    masterQuizSubmitted,
    masterQuizFeedback,
    masterQuizScores,
    saveMasteryScore,
    resetMasteryScore,
  }
}

// Hook for managing notes
export function useNotes() {
  const { user } = useUser()
  const [notes, setNotesState] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!user) return

    const loadNotes = async () => {
      const { data } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', user.id)

      if (data) {
        const notesMap: Record<string, string> = {}
        data.forEach((n) => {
          notesMap[n.section_id] = n.content
        })
        setNotesState(notesMap)
      }
    }

    loadNotes()
  }, [user])

  const setNote = useCallback(async (sectionId: string, content: string) => {
    if (!user) return

    setNotesState(prev => ({ ...prev, [sectionId]: content }))

    await supabase
      .from('user_notes')
      .upsert({
        user_id: user.id,
        section_id: sectionId,
        content,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,section_id'
      })
  }, [user])

  return { notes, setNote }
}

// Hook for managing bookmarks
export function useBookmarks() {
  const { user } = useUser()
  const [bookmarks, setBookmarksState] = useState<string[]>([])

  useEffect(() => {
    if (!user) return

    const loadBookmarks = async () => {
      const { data } = await supabase
        .from('user_bookmarks')
        .select('bookmark_id')
        .eq('user_id', user.id)

      if (data) {
        setBookmarksState(data.map((b) => b.bookmark_id))
      }
    }

    loadBookmarks()
  }, [user])

  const toggleBookmark = useCallback(async (bookmarkId: string) => {
    if (!user) return

    if (bookmarks.includes(bookmarkId)) {
      setBookmarksState(prev => prev.filter(b => b !== bookmarkId))
      await supabase
        .from('user_bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('bookmark_id', bookmarkId)
    } else {
      setBookmarksState(prev => [...prev, bookmarkId])
      await supabase
        .from('user_bookmarks')
        .insert({
          user_id: user.id,
          bookmark_id: bookmarkId,
        })
    }
  }, [user, bookmarks])

  return { bookmarks, toggleBookmark }
}
