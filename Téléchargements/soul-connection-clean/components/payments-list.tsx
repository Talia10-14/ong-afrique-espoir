"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"

interface Payment {
    id: string
    amount: number
    currency: string
    status: string
    method: string
    notes?: string | null
    dueDate?: Date | null
    paidAt?: Date | null
    createdAt: Date
    client: {
        id: string
        name: string
    }
}

interface PaymentsListProps {
    payments: Payment[]
    title?: string
    description?: string
}

export function PaymentsList({
    payments,
    title = "Paiements",
    description = "Toutes les transactions"
}: PaymentsListProps) {
    const statusColors: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-800",
        PAID: "bg-green-100 text-green-800",
        OVERDUE: "bg-red-100 text-red-800",
        CANCELLED: "bg-gray-100 text-gray-800",
    }

    const statusLabels: Record<string, string> = {
        PENDING: "En attente",
        PAID: "Payé",
        OVERDUE: "En retard",
        CANCELLED: "Annulé",
    }

    const methodLabels: Record<string, string> = {
        bank_transfer: "Virement bancaire",
        card: "Carte bancaire",
        check: "Chèque",
        cash: "Espèces",
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {payments && payments.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Méthode</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>
                                        {format(new Date(payment.createdAt), "PPP", { locale: fr })}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/clients/${payment.client.id}`}
                                            className="text-primary hover:underline font-medium"
                                        >
                                            {payment.client.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {payment.amount.toFixed(2)} {payment.currency}
                                    </TableCell>
                                    <TableCell>
                                        {methodLabels[payment.method] || payment.method}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm ${statusColors[payment.status] || statusColors.PENDING
                                                }`}
                                        >
                                            {statusLabels[payment.status] || payment.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {/* Placeholder for future actions like View Details or Edit */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        Aucun paiement trouvé
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
