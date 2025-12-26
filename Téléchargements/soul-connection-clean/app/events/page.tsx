import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { EventsCalendarNew } from "@/components/events-calendar-new"

export const metadata: Metadata = {
  title: "Événements | Soul Connection",
  description: "Calendrier des événements Soul Connection",
}

export default function EventsPage() {
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
            <h2 className="text-3xl font-bold tracking-tight">Événements</h2>
          </div>
          <EventsCalendarNew />
        </div>
      </div>
    </>
  )
}
