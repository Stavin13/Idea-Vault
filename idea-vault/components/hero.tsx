"use client"

import { motion } from "framer-motion"
import { Lightbulb, Rocket, Cog, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const float = (delay = 0) => ({
  initial: { y: 0, opacity: 0 },
  animate: {
    y: [0, -10, 0],
    opacity: 1,
    transition: { 
      duration: 4, 
      delay, 
      repeat: Infinity, 
      ease: "easeInOut" as const 
    },
  },
})

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Share Your Next Big Idea</h1>
        <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
          Join thousands of innovators sharing, voting, and building the future together.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="gap-2" aria-label="Submit your idea">
            <Link href="/submit">
              <Lightbulb className="h-4 w-4" />
              Submit Your Idea
            </Link>
          </Button>
          <Button asChild variant="outline" aria-label="Browse ideas">
            <Link href="/browse">Browse Ideas</Link>
          </Button>
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat value="12,847" label="Ideas Shared" />
          <Stat value="89,234" label="Votes Cast" />
          <Stat value="5,621" label="Innovators" />
        </dl>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute left-8 top-6 text-primary" {...float(0)}>
          <Lightbulb className="h-8 w-8 opacity-80" />
        </motion.div>
        <motion.div className="absolute right-8 top-10 text-warning" {...float(0.4)}>
          <Cog className="h-7 w-7 opacity-80" />
        </motion.div>
        <motion.div className="absolute bottom-10 left-10 text-success" {...float(0.8)}>
          <Rocket className="h-9 w-9 opacity-80" />
        </motion.div>
        <motion.div className="absolute bottom-8 right-14 text-primary" {...float(1.2)}>
          <Star className="h-6 w-6 opacity-80" />
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-center shadow-sm">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold">{value}</dd>
    </div>
  )
}
