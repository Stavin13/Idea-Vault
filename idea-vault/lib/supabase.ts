import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Idea {
  id: string
  author_id: string
  title: string
  description: string
  tags: string[]
  votes: number
  created_at: string
  updated_at: string
  author?: {
    name: string
    avatar?: string
  }
  user_vote?: boolean
}

export interface IdeaVote {
  id: string
  idea_id: string
  user_id: string
  created_at: string
}

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
}