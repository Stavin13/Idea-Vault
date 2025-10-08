import { NavigationHeader } from "@/components/navigation-header"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <>
      <NavigationHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold">About IdeaVault</h1>
        <Card className="mt-4 p-6 text-pretty leading-relaxed text-muted-foreground">
          IdeaVault is a community for sharing, voting, and building the future — together. Submit your ideas, discover
          what’s trending, and collaborate with innovators worldwide.
        </Card>
      </main>
    </>
  )
}
