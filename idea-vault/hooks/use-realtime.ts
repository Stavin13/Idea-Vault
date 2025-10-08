'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useRealtimeIdeas(onIdeaChange?: () => void) {
  useEffect(() => {
    const channel = supabase
      .channel('ideas-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ideas'
        },
        (payload) => {
          console.log('Ideas change received:', payload)
          onIdeaChange?.()
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'idea_votes'
        },
        (payload) => {
          console.log('Vote change received:', payload)
          onIdeaChange?.()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [onIdeaChange])
}

export function useRealtimeVotes(ideaId: string, onVoteChange?: (votes: number) => void) {
  useEffect(() => {
    const channel = supabase
      .channel(`idea-${ideaId}-votes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'idea_votes',
          filter: `idea_id=eq.${ideaId}`
        },
        async (payload) => {
          console.log('Vote change for idea:', ideaId, payload)
          
          // Fetch updated vote count
          const { data } = await supabase
            .from('ideas')
            .select('votes')
            .eq('id', ideaId)
            .single()
          
          if (data) {
            onVoteChange?.(data.votes)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [ideaId, onVoteChange])
}