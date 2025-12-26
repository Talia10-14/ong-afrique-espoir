import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { CoachingTipsNew } from "@/components/coaching-tips-new"

export const metadata: Metadata = {
  title: "Conseils de Coaching | Soul Connection",
  description: "Conseils pour coacher différents profils de clients",
}

export default function TipsPage() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Conseils de Coaching</h2>
          </div>
          <CoachingTipsNew />
        </div>
      </div>
    </>
  )
}
