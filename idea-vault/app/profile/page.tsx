'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavigationHeader } from "@/components/navigation-header"
import { ProfileDashboard } from "@/components/profile-dashboard"
import { useAuth } from '@/hooks/use-auth'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <NavigationHeader />
      <main>
        <ProfileDashboard />
      </main>
    </>
  )
}
