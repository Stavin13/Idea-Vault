'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './use-auth'

export function useVote() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const vote = async (ideaId: string) => {
    if (!user) {
      throw new Error('You must be logged in to vote')
    }

    try {
      setLoading(true)

      // Check if user has already voted
      const { data: existingVote } = await supabase
        .from('idea_votes')
        .select('id')
        .eq('idea_id', ideaId)
        .eq('user_id', user.id)
        .single()

      if (existingVote) {
        // Remove vote
        const { error: deleteError } = await supabase
          .from('idea_votes')
          .delete()
          .eq('idea_id', ideaId)
          .eq('user_id', user.id)

        if (deleteError) throw deleteError

        // Get current vote count and decrement
        const { data: currentIdea } = await supabase
          .from('ideas')
          .select('votes')
          .eq('id', ideaId)
          .single()

        const { error: updateError } = await supabase
          .from('ideas')
          .update({ votes: Math.max(0, (currentIdea?.votes || 0) - 1) })
          .eq('id', ideaId)

        if (updateError) throw updateError

        return { voted: false }
      } else {
        // Add vote
        const { error: insertError } = await supabase
          .from('idea_votes')
          .insert({
            idea_id: ideaId,
            user_id: user.id
          })

        if (insertError) throw insertError

        // Get current vote count and increment
        const { data: currentIdea } = await supabase
          .from('ideas')
          .select('votes')
          .eq('id', ideaId)
          .single()

        const { error: updateError } = await supabase
          .from('ideas')
          .update({ votes: (currentIdea?.votes || 0) + 1 })
          .eq('id', ideaId)

        if (updateError) throw updateError

        return { voted: true }
      }
    } catch (error) {
      console.error('Error voting:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const checkUserVote = async (ideaId: string) => {
    if (!user) return false

    try {
      const { data } = await supabase
        .from('idea_votes')
        .select('id')
        .eq('idea_id', ideaId)
        .eq('user_id', user.id)
        .single()

      return !!data
    } catch {
      return false
    }
  }

  return {
    vote,
    checkUserVote,
    loading
  }
}