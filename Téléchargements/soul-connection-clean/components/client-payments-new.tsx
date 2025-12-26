"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { PlusCircle } from "lucide-react"

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
}

interface ClientPaymentsProps {
  payments: Payment[]
}

export function ClientPaymentsNew({ payments }: ClientPaymentsProps) {
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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Paiements</CardTitle>
          <CardDescription>Historique des paiements du client</CardDescription>
        </div>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </CardHeader>
      <CardContent>
        {payments && payments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date d'échéance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {format(new Date(payment.createdAt), "PPP", { locale: fr })}
                  </TableCell>
                  <TableCell>
                    {payment.amount.toFixed(2)} {payment.currency}
                  </TableCell>
                  <TableCell>
                    {methodLabels[payment.method] || payment.method}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        statusColors[payment.status] || statusColors.PENDING
                      }`}
                    >
                      {statusLabels[payment.status] || payment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {payment.dueDate
                      ? format(new Date(payment.dueDate), "PPP", { locale: fr })
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucun paiement pour le moment
          </div>
        )}
      </CardContent>
    </Card>
  )
}
