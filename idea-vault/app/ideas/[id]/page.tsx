'use client'

import { useParams } from 'next/navigation'
import { NavigationHeader } from "@/components/navigation-header"
import { useIdea } from "@/hooks/use-ideas"
import { useVote } from "@/hooks/use-vote"
import { useAuth } from "@/hooks/use-auth"
import { useRealtimeVotes } from "@/hooks/use-realtime"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function IdeaDetailPage() {
  const params = useParams()
  const ideaId = params.id as string
  const { idea, loading, error } = useIdea(ideaId)
  const [voted, setVoted] = useState(false)
  const [votes, setVotes] = useState(0)
  const { vote, checkUserVote, loading: voteLoading } = useVote()
  const { user } = useAuth()

  // Update votes when idea loads
  useEffect(() => {
    if (idea) {
      setVotes(idea.votes)
    }
  }, [idea])

  // Check if user has voted
  useEffect(() => {
    if (user && ideaId) {
      checkUserVote(ideaId).then(setVoted)
    }
  }, [user, ideaId, checkUserVote])

  // Enable real-time vote updates
  useRealtimeVotes(ideaId, setVotes)

  const onVote = async () => {
    if (!user) {
      toast.error("Please sign in to vote")
      return
    }

    try {
      const result = await vote(ideaId)
      setVoted(result.voted)
      setVotes(prev => result.voted ? prev + 1 : prev - 1)
      toast.success(result.voted ? "Vote added!" : "Vote removed!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to vote")
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <>
        <NavigationHeader />
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </>
    )
  }

  if (error || !idea) {
    return (
      <>
        <NavigationHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">
              {error || "Idea not found"}
            </p>
            <Button asChild className="mt-4">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavigationHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Ideas
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-4">{idea.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-4">
                  {idea.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <motion.button
                type="button"
                aria-pressed={voted}
                aria-label="Vote for this idea"
                onClick={onVote}
                disabled={voteLoading}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors",
                  voted ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent",
                  voteLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                <Heart className={cn("h-5 w-5", voted && "fill-current")} />
                <span className="font-medium">{votes}</span>
              </motion.button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
              <p className="text-lg leading-relaxed">{idea.description}</p>
            </div>
            
            <div className="flex items-center gap-3 pt-6 border-t">
              <Avatar className="h-10 w-10">
                <AvatarImage src={idea.author?.avatar} alt="" />
                <AvatarFallback>
                  {idea.author?.name?.slice(0, 2).toUpperCase() || 'AN'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{idea.author?.name || 'Anonymous'}</div>
                <div className="text-sm text-muted-foreground">
                  {formatTimestamp(idea.created_at)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}