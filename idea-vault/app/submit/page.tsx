import { NavigationHeader } from "@/components/navigation-header"
import { IdeaForm } from "@/components/idea-form"

export default function SubmitPage() {
  return (
    <>
      <NavigationHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <IdeaForm />
      </main>
    </>
  )
}
