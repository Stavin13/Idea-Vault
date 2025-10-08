"use client"

import { useEffect, useRef, useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { IdeaCard } from "@/components/idea-card"
import { useIdeas } from "@/hooks/use-ideas"
import { useRealtimeIdeas } from "@/hooks/use-realtime"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { Idea } from "@/lib/supabase"

export default function BrowsePage() {
  const { ideas, loading, error, refetch } = useIdeas()
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([])
  
  // Enable real-time updates
  useRealtimeIdeas(refetch)

  // Update filtered ideas when ideas change
  useEffect(() => {
    setFilteredIdeas(ideas)
  }, [ideas])

  return (
    <>
      <NavigationHeader />
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-12 md:grid-cols-[280px_1fr]">
        <div className="md:pt-6">
          <FiltersSidebar />
        </div>
        <section aria-label="Ideas" className="pt-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Failed to load ideas: {error}</p>
            </div>
          ) : filteredIdeas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No ideas found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredIdeas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
