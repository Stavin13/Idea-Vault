'use client'

import { useState, useEffect } from 'react'
import { supabase, type Idea } from '@/lib/supabase'

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIdeas = async () => {
    try {
      setLoading(true)
      setError(null)

      // First, let's try a simple query to see if the table exists
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform the data to match our Idea interface
      const transformedIdeas: Idea[] = data?.map(idea => ({
        ...idea,
        author: {
          name: 'Anonymous', // We'll improve this later
          avatar: undefined
        }
      })) || []

      setIdeas(transformedIdeas)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ideas')
      console.error('Error fetching ideas:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  return {
    ideas,
    loading,
    error,
    refetch: fetchIdeas
  }
}

export function useIdea(id: string) {
  const [idea, setIdea] = useState<Idea | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from('ideas')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        const transformedIdea: Idea = {
          ...data,
          author: {
            name: 'Anonymous', // We'll improve this later
            avatar: undefined
          }
        }

        setIdea(transformedIdea)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch idea')
        console.error('Error fetching idea:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchIdea()
    }
  }, [id])

  return {
    idea,
    loading,
    error
  }
}