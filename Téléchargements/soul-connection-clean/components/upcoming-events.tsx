"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users } from "lucide-react"

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Atelier Rencontre",
      date: "12 Mai 2023",
      time: "19:00 - 22:00",
      location: "Paris 8ème",
      participants: 24,
      maxParticipants: 30,
      type: "Atelier",
    },
    {
      id: 2,
      title: "Soirée Networking",
      date: "18 Mai 2023",
      time: "20:00 - 23:30",
      location: "Paris 16ème",
      participants: 42,
      maxParticipants: 50,
      type: "Soirée",
    },
    {
      id: 3,
      title: "Workshop Communication",
      date: "25 Mai 2023",
      time: "18:30 - 21:00",
      location: "Paris 2ème",
      participants: 18,
      maxParticipants: 25,
      type: "Workshop",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle>{event.title}</CardTitle>
              <Badge variant="outline">{event.type}</Badge>
            </div>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {event.date}, {event.time}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>
                {event.participants}/{event.maxParticipants} participants
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="secondary" className="w-full" onClick={() => alert("Inscription enregistrée !")}>S'inscrire</Button>
            <Button variant="outline" className="w-full">Détails</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
