"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const categories = ["AI", "Productivity", "Design", "DevTools", "Health", "Education"]
const tags = ["Web", "Mobile", "Data", "Open Source", "SaaS", "Cloud"]

export function FiltersSidebar() {
  const [query, setQuery] = useState("")
  const [votes, setVotes] = useState([50])
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (t: string) => setSelected((arr) => (arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t]))

  return (
    <aside className="sticky top-[64px] rounded-lg border bg-card p-4">
      <div>
        <Label htmlFor="browse-search">Search</Label>
        <Input
          id="browse-search"
          placeholder="Search ideas…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-1"
        />
      </div>

      <Separator className="my-4" />

      <fieldset>
        <legend className="mb-2 text-sm font-medium">Categories</legend>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <Checkbox id={`c-${c}`} />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Separator className="my-4" />

      <fieldset>
        <legend className="mb-2 text-sm font-medium">Tags</legend>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggle(t)}
              aria-pressed={selected.includes(t)}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Badge variant={selected.includes(t) ? "default" : "secondary"} className="rounded-full">
                {t}
              </Badge>
            </button>
          ))}
        </div>
      </fieldset>

      <Separator className="my-4" />

      <div>
        <Label htmlFor="vote-slider">Minimum votes</Label>
        <Slider
          id="vote-slider"
          className="mt-2"
          defaultValue={votes}
          onValueChange={(v) => setVotes(v as number[])}
          max={500}
          step={10}
        />
        <div className="mt-1 text-sm text-muted-foreground">{votes[0]}+</div>
      </div>
    </aside>
  )
}
