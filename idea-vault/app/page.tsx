'use client'

import { NavigationHeader } from "@/components/navigation-header"
import { Hero } from "@/components/hero"
import { IdeaCard } from "@/components/idea-card"
import { useIdeas } from "@/hooks/use-ideas"
import { useRealtimeIdeas } from "@/hooks/use-realtime"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { SupabaseTest } from "@/components/supabase-test"

export default function HomePage() {
  const { ideas, loading, error, refetch } = useIdeas()
  
  // Enable real-time updates
  useRealtimeIdeas(refetch)

  return (
    <>
      <NavigationHeader />
      <main className="mx-auto max-w-7xl px-4 pb-12">
        <Hero />
        <div className="mt-6 mb-6">
          <SupabaseTest />
        </div>
        <section aria-label="Featured ideas" className="mt-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Failed to load ideas: {error}</p>
            </div>
          ) : ideas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No ideas yet. Be the first to share one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ideas.slice(0, 6).map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
