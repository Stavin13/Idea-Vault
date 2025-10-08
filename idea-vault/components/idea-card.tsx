"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useVote } from "@/hooks/use-vote"
import { useAuth } from "@/hooks/use-auth"
import { useRealtimeVotes } from "@/hooks/use-realtime"
import { toast } from "sonner"
import type { Idea } from "@/lib/supabase"

export function IdeaCard({ idea }: { idea: Idea }) {
  const [voted, setVoted] = useState(false)
  const [votes, setVotes] = useState(idea.votes)
  const { vote, checkUserVote, loading } = useVote()
  const { user } = useAuth()

  // Check if user has voted on mount
  useEffect(() => {
    if (user) {
      checkUserVote(idea.id).then(setVoted)
    }
  }, [user, idea.id, checkUserVote])

  // Enable real-time vote updates
  useRealtimeVotes(idea.id, setVotes)

  const onVote = async () => {
    if (!user) {
      toast.error("Please sign in to vote")
      return
    }

    try {
      const result = await vote(idea.id)
      setVoted(result.voted)
      setVotes(prev => result.voted ? prev + 1 : prev - 1)
      toast.success(result.voted ? "Vote added!" : "Vote removed!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to vote")
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  return (
    <Card role="article" aria-labelledby={`idea-${idea.id}-title`}>
      <CardHeader>
        <CardTitle id={`idea-${idea.id}-title`} className="line-clamp-2 text-pretty">
          {idea.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">{idea.description}</p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
          {idea.tags.map((t) => (
            <li key={t}>
              <Badge variant="secondary" className="rounded-full">
                {t}
              </Badge>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={idea.author.avatar || "/placeholder.svg?height=48&width=48&query=avatar"} alt="" />
            <AvatarFallback>{idea.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium">{idea.author.name}</div>
            <div className="text-muted-foreground">{formatTimestamp(idea.created_at)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <motion.button
          type="button"
          aria-pressed={voted}
          aria-label="Vote for this idea"
          onClick={onVote}
          disabled={loading}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors",
            voted ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent",
            loading && "opacity-50 cursor-not-allowed"
          )}
        >
          <Heart className={cn("h-4 w-4", voted && "fill-current")} />
          <span>{votes}</span>
        </motion.button>
        <Button asChild variant="link" className="px-0">
          <Link href={`/ideas/${idea.id}`} aria-label={`View details for ${idea.title}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
