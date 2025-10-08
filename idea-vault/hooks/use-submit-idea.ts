'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/use-auth'

interface SubmitIdeaData {
  title: string
  description: string
  tags: string[]
}

export function useSubmitIdea() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const submitIdea = async (data: SubmitIdeaData) => {
    if (!user) {
      throw new Error('You must be logged in to submit an idea')
    }

    try {
      setLoading(true)

      const { data: idea, error } = await supabase
        .from('ideas')
        .insert({
          author_id: user.id,
          title: data.title,
          description: data.description,
          tags: data.tags,
        })
        .select()
        .single()

      if (error) throw error

      return idea
    } catch (error) {
      console.error('Error submitting idea:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    submitIdea,
    loading
  }
}