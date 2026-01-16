-- Sphere Training Platform Database Schema
-- Run this in Supabase SQL Editor

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  learn_complete BOOLEAN DEFAULT FALSE,
  exercise_complete BOOLEAN DEFAULT FALSE,
  quiz_complete BOOLEAN DEFAULT FALSE,
  quiz_score INTEGER,
  exercise_answer TEXT,
  ai_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, section_id)
);

-- Quiz Answers Table
CREATE TABLE IF NOT EXISTS quiz_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  answers JSONB DEFAULT '{}',
  submitted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, section_id)
);

-- Mastery Scores Table
CREATE TABLE IF NOT EXISTS mastery_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  pillar_id TEXT NOT NULL,
  answers JSONB DEFAULT '{}',
  mc_score INTEGER,
  mc_correct INTEGER,
  mc_total INTEGER,
  written_score INTEGER,
  overall_score INTEGER,
  passed BOOLEAN DEFAULT FALSE,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, pillar_id)
);

-- User Notes Table
CREATE TABLE IF NOT EXISTS user_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, section_id)
);

-- User Bookmarks Table
CREATE TABLE IF NOT EXISTS user_bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  bookmark_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, bookmark_id)
);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE mastery_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - you can make these more restrictive)
CREATE POLICY "Allow all for user_progress" ON user_progress FOR ALL USING (true);
CREATE POLICY "Allow all for quiz_answers" ON quiz_answers FOR ALL USING (true);
CREATE POLICY "Allow all for mastery_scores" ON mastery_scores FOR ALL USING (true);
CREATE POLICY "Allow all for user_notes" ON user_notes FOR ALL USING (true);
CREATE POLICY "Allow all for user_bookmarks" ON user_bookmarks FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_user ON quiz_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_mastery_user ON mastery_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_user ON user_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON user_bookmarks(user_id);
