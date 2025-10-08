"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Lightbulb, Search } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"

export function NavigationHeader() {
  const pathname = usePathname()
  const [q, setQ] = useState("")
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success("Signed out successfully")
    } catch (error) {
      toast.error("Failed to sign out")
    }
  }

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        pathname === href ? "text-primary" : "text-foreground",
      )}
      aria-current={pathname === href ? "page" : undefined}
    >
      {label}
    </Link>
  )

  return (
    <header
      className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold" aria-label="IdeaVault home">
            <span aria-hidden className="rounded-md bg-primary/10 p-2 text-primary">
              <Lightbulb className="h-5 w-5" />
            </span>
            <span className="text-pretty text-lg">IdeaVault</span>
          </Link>
          <nav aria-label="Primary" className="ml-2 hidden items-center gap-1 md:flex">
            <NavLink href="/" label="Home" />
            <NavLink href="/browse" label="Browse" />
            <NavLink href="/submit" label="Submit Idea" />
            <NavLink href="/about" label="About" />
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden items-center md:flex">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden />
            <label htmlFor="global-search" className="sr-only">
              Search ideas
            </label>
            <Input
              id="global-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search ideas…"
              className="w-64 pl-9"
            />
          </div>

          <Button variant="ghost" size="icon" aria-label="Notifications">
            <div className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                variant="secondary"
                className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary px-0 text-[11px] text-primary-foreground"
                aria-label="3 new notifications"
              >
                3
              </Badge>
            </div>
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open profile menu">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.avatar || "/diverse-avatars.png"} alt="" />
                  <AvatarFallback>
                    {user ? (user.name || user.email).slice(0, 2).toUpperCase() : 'IV'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {user ? user.name || user.email : 'My Account'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/sign-in">Sign in</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/sign-up">Sign up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
