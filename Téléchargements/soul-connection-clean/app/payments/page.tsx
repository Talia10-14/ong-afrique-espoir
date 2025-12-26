
import { Metadata } from "next"
import { PaymentsList } from "@/components/payments-list"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
    title: "Paiements | Soul Connection",
    description: "Historique global des paiements",
}

export default async function PaymentsPage() {
    const payments = await prisma.payment.findMany({
        include: {
            client: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
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
                    <h2 className="text-3xl font-bold tracking-tight">Vue d'ensemble des Paiements</h2>
                </div>
                <PaymentsList payments={payments} />
            </div>
        </div>
    )
}
