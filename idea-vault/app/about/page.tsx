import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="rounded-md bg-primary/10 p-2 text-primary">
                <Lightbulb className="h-5 w-5" />
              </span>
              <span className="text-lg">IdeaVault</span>
            </Link>
            <Button asChild variant="ghost">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold mb-6">About IdeaVault</h1>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              IdeaVault is a community-driven platform where innovators, creators, and dreamers come together to share, 
              vote on, and build the future. We believe that great ideas can come from anywhere, and when brilliant minds 
              collaborate, extraordinary things happen.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-3">How It Works</h2>
            <div className="space-y-3 text-muted-foreground">
              <p><strong>Share:</strong> Submit your innovative ideas and solutions to real-world problems.</p>
              <p><strong>Discover:</strong> Browse through a curated collection of creative concepts from our community.</p>
              <p><strong>Vote:</strong> Support the ideas you believe in and help surface the best concepts.</p>
              <p><strong>Collaborate:</strong> Connect with like-minded innovators and turn ideas into reality.</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-3">Join the Community</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Whether you&apos;re an entrepreneur, developer, designer, or simply someone with great ideas, 
              IdeaVault is your platform to make an impact. Join thousands of innovators who are already 
              shaping the future.
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/submit">Submit Your Idea</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/browse">Browse Ideas</Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}