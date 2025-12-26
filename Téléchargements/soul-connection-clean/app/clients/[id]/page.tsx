import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClientMeetings } from "@/components/client-meetings-new"
import { ClientPaymentsNew } from "@/components/client-payments-new"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Profil Client | Soul Connection",
  description: "Détails du profil client",
}

interface ClientPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params

  // Fetch client data from database
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      coach: {
        select: {
          name: true,
        },
      },
      meetings: {
        orderBy: {
          startTime: "desc",
        },
      },
      payments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!client) {
    notFound()
  }

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
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Profil Client</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href="/clients">Retour</Link>
              </Button>
              <Button asChild>
                <Link href={`/clients/${client.id}/edit`}>Modifier</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" alt={client.name} />
                  <AvatarFallback>
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{client.name}</CardTitle>
                  <CardDescription>{client.zodiacSign ? `Signe: ${client.zodiacSign}` : "Client"}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium">Email:</div>
                    <div>{client.email}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium">Téléphone:</div>
                    <div>{client.phone}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium">Coach:</div>
                    <div>{client.coach?.name || "N/A"}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium">Statut:</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${client.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {client.status === "ACTIVE" ? "Actif" : "Inactif"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Informations supplémentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{client.notes || "Aucune note pour le moment"}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="meetings" className="space-y-4">
            <TabsList>
              <TabsTrigger value="meetings">Historique des rendez-vous</TabsTrigger>
              <TabsTrigger value="payments">Historique des paiements</TabsTrigger>
            </TabsList>
            <TabsContent value="meetings" className="space-y-4">
              <ClientMeetings meetings={client.meetings} clientId={client.id} coachId={client.coachId} />
            </TabsContent>
            <TabsContent value="payments" className="space-y-4">
              <ClientPaymentsNew payments={client.payments} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
