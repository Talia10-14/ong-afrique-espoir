"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Users, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface Event {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  location?: string
  capacity?: number
  eventType: string
  status: string
  coach: string
  coachId: string
}

export function EventsCalendarNew() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events")
        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }
        const data = await response.json()
        if (data.success) {
          setEvents(data.events)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800"
      case "ONGOING":
        return "bg-purple-100 text-purple-800"
      case "COMPLETED":
        return "bg-green-100 text-green-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      SCHEDULED: "Programmé",
      ONGOING: "En cours",
      COMPLETED: "Terminé",
      CANCELLED: "Annulé",
    }
    return labels[status] || status
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2">Chargement des événements...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-6 text-red-600">
          Erreur : {error}
        </CardContent>
      </Card>
    )
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-muted-foreground">
          Aucun événement trouvé
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </div>
              <Badge className={getStatusColor(event.status)}>
                {getStatusLabel(event.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Début</p>
                  <p className="font-medium">
                    {format(new Date(event.startDate), "PPP p", { locale: fr })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Fin</p>
                  <p className="font-medium">
                    {format(new Date(event.endDate), "PPP p", { locale: fr })}
                  </p>
                </div>
              </div>
            </div>

            {event.location && (
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
            )}

            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                Coach : <strong>{event.coach}</strong>
              </span>
              {event.capacity && (
                <span className="ml-4">Capacité : {event.capacity} personnes</span>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Badge variant="outline">{event.eventType}</Badge>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => alert("Inscription à venir !")}>
                  S'inscrire
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={`/events/${event.id}`}>Détails</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
