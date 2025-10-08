"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload } from "lucide-react"
import { useSubmitIdea } from "@/hooks/use-submit-idea"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function IdeaForm() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState<string>("AI")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const { submitIdea, loading } = useSubmitIdea()
  const { user } = useAuth()
  const router = useRouter()

  const strength = Math.min(100, (title.length > 8 ? 25 : 10) + (desc.length > 40 ? 40 : 20) + tags.length * 10)

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) setTags((arr) => [...arr, t])
    setTagInput("")
  }

  const removeTag = (t: string) => setTags((arr) => arr.filter((x) => x !== t))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error("Please sign in to submit an idea")
      router.push("/sign-in")
      return
    }

    if (!title.trim() || !desc.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters long")
      return
    }

    if (desc.length < 10) {
      toast.error("Description must be at least 10 characters long")
      return
    }

    try {
      const allTags = category ? [category, ...tags] : tags
      await submitIdea({
        title: title.trim(),
        description: desc.trim(),
        tags: allTags
      })
      
      toast.success("Idea submitted successfully!")
      router.push("/")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit idea")
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit} aria-labelledby="submit-idea-title">
      <h1 id="submit-idea-title" className="text-2xl font-semibold">
        Submit an Idea
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="idea-title">Title</Label>
          <Input
            id="idea-title"
            placeholder="Concise, compelling title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-invalid={title.length < 3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="idea-category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="idea-category" aria-label="Category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {["AI", "Productivity", "Design", "DevTools", "Health", "Education"].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="idea-desc">Description</Label>
        <Textarea
          id="idea-desc"
          placeholder="Describe the problem, solution, and impact. You can paste rich text."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={6}
          required
        />
        <div className="mt-1">
          <Progress value={strength} aria-label="Form completeness" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex gap-2">
          <Input
            id="tags"
            placeholder="Add a tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTag()
              }
            }}
          />
          <Button type="button" onClick={addTag} variant="secondary">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => removeTag(t)}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Remove tag ${t}`}
            >
              <Badge className="rounded-full">{t} ✕</Badge>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Image</Label>
        <div
          role="button"
          tabIndex={0}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed bg-secondary p-6 text-sm text-muted-foreground outline-none transition hover:bg-secondary/70 focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Upload image by dragging and dropping or clicking"
        >
          <Upload className="h-4 w-4" />
          Drag & drop or click to upload
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Submitting…
            </>
          ) : (
            "Submit Idea"
          )}
        </Button>
      </div>
    </form>
  )
}
