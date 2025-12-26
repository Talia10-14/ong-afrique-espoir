import { Metadata } from "next"
import { ClientForm } from "@/components/client-form"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export const metadata: Metadata = {
    title: "Nouveau Client | Soul Connection",
    description: "Ajouter un nouveau client",
}

export default function NewClientPage() {
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
                    <h2 className="text-3xl font-bold tracking-tight">Ajouter un client</h2>
                </div>
                <div className="grid gap-4 max-w-2xl">
                    <ClientForm />
                </div>
            </div>
        </div>
    )
}
