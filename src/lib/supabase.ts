import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface UserProgress {
  id: string
  user_id: string
  section_id: string
  learn_complete: boolean
  exercise_complete: boolean
  quiz_complete: boolean
  quiz_score: number | null
  exercise_answer: string | null
  ai_feedback: string | null
  created_at: string
  updated_at: string
}

export interface MasteryScore {
  id: string
  user_id: string
  pillar_id: string
  mc_score: number
  mc_correct: number
  mc_total: number
  written_score: number | null
  overall_score: number
  passed: boolean
  answers: Record<string, any>
  feedback: string | null
  created_at: string
}

export interface UserNote {
  id: string
  user_id: string
  section_id: string
  content: string
  created_at: string
  updated_at: string
}

export interface UserBookmark {
  id: string
  user_id: string
  bookmark_id: string
  created_at: string
}
