import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EventPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EventPage({ params }: EventPageProps) {
    const { id } = await params

    const event = await prisma.event.findUnique({
        where: { id },
        include: {
            coach: {
                select: { name: true }
            }
        }
    })

    if (!event) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h1 className="text-2xl font-bold">Événement non trouvé</h1>
                <Button asChild>
                    <Link href="/events">Retour aux événements</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container py-10 max-w-4xl mx-auto">
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 pl-0">
                    <Link href="/events" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Retour
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6 text-foreground">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge>{event.eventType}</Badge>
                            <span className="text-sm text-muted-foreground">{event.status}</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">{event.title}</h1>
                        <p className="text-lg text-muted-foreground">{event.description}</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>À propos de cet événement</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>
                                Rejoignez-nous pour cet événement exceptionnel animé par {event.coach?.name}.
                                Une occasion unique d'apprendre et d'échanger.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Détails pratiques</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <div className="font-medium">Date et heure</div>
                                    <div className="text-sm text-muted-foreground">
                                        {format(new Date(event.startDate), "PPP", { locale: fr })}
                                        <br />
                                        {format(new Date(event.startDate), "p", { locale: fr })} - {format(new Date(event.endDate), "p", { locale: fr })}
                                    </div>
                                </div>
                            </div>

                            {event.location && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <div className="font-medium">Lieu</div>
                                        <div className="text-sm text-muted-foreground">{event.location}</div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <Users className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <div className="font-medium">Participants</div>
                                    <div className="text-sm text-muted-foreground">
                                        {event.capacity ? `Limité à ${event.capacity} places` : "Entrée libre"}
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full mt-4">S'inscrire maintenant</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
