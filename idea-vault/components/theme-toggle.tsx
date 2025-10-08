"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const root = document.documentElement
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches
    const hasDark = root.classList.contains("dark") || localStorage.getItem("theme") === "dark"
    const shouldDark = hasDark || (!localStorage.getItem("theme") && prefers)
    root.classList.toggle("dark", shouldDark)
    setIsDark(shouldDark)
  }, [])

  if (!mounted) return null

  const toggle = () => {
    const root = document.documentElement
    const next = !isDark
    root.classList.toggle("dark", next)
    setIsDark(next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
