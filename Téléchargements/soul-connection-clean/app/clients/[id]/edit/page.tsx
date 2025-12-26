
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ClientForm } from "@/components/client-form"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
    title: "Modifier Client | Soul Connection",
    description: "Modifier les informations d'un client",
}

interface EditClientPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditClientPage({ params }: EditClientPageProps) {
    const { id } = await params

    const client = await prisma.client.findUnique({
        where: { id },
    })

    if (!client) {
        notFound()
    }

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
                    <h2 className="text-3xl font-bold tracking-tight">Modifier le client</h2>
                </div>
                <div className="grid gap-4 max-w-2xl">
                    <ClientForm
                        initialData={{
                            ...client,
                            status: client.status as "ACTIVE" | "INACTIVE" | "LEAD",
                            phone: client.phone || undefined,
                            notes: client.notes || undefined,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
