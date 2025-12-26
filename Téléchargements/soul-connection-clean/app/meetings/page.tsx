
import { Metadata } from "next"
import { MeetingsList } from "@/components/meetings-list"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
    title: "Rendez-vous | Soul Connection",
    description: "Agenda global des rendez-vous",
}

export default async function MeetingsPage() {
    const meetings = await prisma.meeting.findMany({
        include: {
            client: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            startTime: "desc",
        },
    })

    return (
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
                    <h2 className="text-3xl font-bold tracking-tight">Agenda Global</h2>
                </div>
                <MeetingsList meetings={meetings} />
            </div>
        </div>
    )
}
