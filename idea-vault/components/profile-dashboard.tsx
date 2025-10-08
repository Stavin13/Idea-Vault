"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { mockIdeas } from "@/lib/mock-data"
import { IdeaCard } from "./idea-card"

export function ProfileDashboard() {
  const [tab, setTab] = useState("my")

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/diverse-avatars.png" alt="" />
            <AvatarFallback>IV</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">Alex Innovator</h1>
            <p className="text-muted-foreground">Joined Jan 2024 • 12 ideas • 340 votes</p>
            <div className="mt-2 flex gap-2">
              <span className="rounded-full bg-success/15 px-2 py-1 text-xs text-success">Builder</span>
              <span className="rounded-full bg-warning/15 px-2 py-1 text-xs text-warning">Early</span>
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
          <Grid ideas={mockIdeas.slice(0, 6)} />
        </TabsContent>
        <TabsContent value="voted" className="mt-4">
          <Grid ideas={mockIdeas.slice(6, 12)} />
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
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  )
}
