"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IdeaCard } from "./idea-card"
import { useIdeas } from "@/hooks/use-ideas"
import { useAuth } from "@/hooks/use-auth"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function ProfileDashboard() {
  const [tab, setTab] = useState("my")
  const { ideas, loading } = useIdeas()
  const { user } = useAuth()

  // Filter user's ideas
  const userIdeas = ideas.filter(idea => idea.author_id === user?.id)

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/diverse-avatars.png" alt="" />
            <AvatarFallback>IV</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">{user?.name || user?.email || 'User'}</h1>
            <p className="text-muted-foreground">
              {userIdeas.length} ideas • Active contributor
            </p>
            <div className="mt-2 flex gap-2">
              <span className="rounded-full bg-primary/15 px-2 py-1 text-xs text-primary">Contributor</span>
            </div>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </header>

      <Separator className="my-6" />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="my">My Ideas</TabsTrigger>
          <TabsTrigger value="voted">Voted Ideas</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="my" className="mt-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <Grid ideas={userIdeas} />
          )}
        </TabsContent>
        <TabsContent value="voted" className="mt-4">
          <Card className="p-6 text-muted-foreground">
            Voted ideas feature coming soon!
          </Card>
        </TabsContent>
        <TabsContent value="drafts" className="mt-4">
          <Card className="p-6 text-muted-foreground">No drafts yet.</Card>
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <Card className="p-6 text-muted-foreground">Your recent activity will appear here.</Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}

function Grid({ ideas }: { ideas: any[] }) {
  if (ideas.length === 0) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        <p>No ideas yet. Start sharing your ideas!</p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  )
}
