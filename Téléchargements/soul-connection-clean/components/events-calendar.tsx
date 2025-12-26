"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, CalendarIcon, Users, Clock } from "lucide-react"
import { fr } from "date-fns/locale"
import { format } from "date-fns"

// Mock events data
const events = [
  {
    id: 1,
    title: "Atelier Rencontre",
    date: "2023-05-12",
    time: "19:00 - 22:00",
    location: "Paris 8ème",
    address: "25 Rue de la Paix, 75008 Paris",
    participants: 24,
    maxParticipants: 30,
    type: "Atelier",
    description:
      "Un atelier pour apprendre à mieux se connaître et rencontrer des personnes partageant les mêmes valeurs.",
  },
  {
    id: 2,
    title: "Soirée Networking",
    date: "2023-05-18",
    time: "20:00 - 23:30",
    location: "Paris 16ème",
    address: "8 Avenue Victor Hugo, 75016 Paris",
    participants: 42,
    maxParticipants: 50,
    type: "Soirée",
    description: "Une soirée conviviale pour élargir votre réseau et faire des rencontres dans un cadre détendu.",
  },
  {
    id: 3,
    title: "Workshop Communication",
    date: "2023-05-25",
    time: "18:30 - 21:00",
    location: "Paris 2ème",
    address: "12 Rue Montmartre, 75002 Paris",
    participants: 18,
    maxParticipants: 25,
    type: "Workshop",
    description: "Apprenez à mieux communiquer dans vos relations et à exprimer vos besoins de manière constructive.",
  },
  {
    id: 4,
    title: "Dîner Rencontre",
    date: "2023-06-02",
    time: "19:30 - 22:30",
    location: "Paris 4ème",
    address: "45 Rue des Archives, 75004 Paris",
    participants: 16,
    maxParticipants: 20,
    type: "Dîner",
    description: "Un dîner convivial pour faire connaissance autour d'un bon repas dans un restaurant sélectionné.",
  },
  {
    id: 5,
    title: "Atelier Confiance en Soi",
    date: "2023-06-08",
    time: "18:00 - 20:30",
    location: "Paris 9ème",
    address: "3 Rue Lafayette, 75009 Paris",
    participants: 15,
    maxParticipants: 20,
    type: "Atelier",
    description: "Développez votre confiance en vous et apprenez à vous affirmer dans vos relations personnelles.",
  },
]

export function EventsCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Filter events for the selected date
  const getEventsForDate = (date) => {
    if (!date) return []
    const dateString = format(date, "yyyy-MM-dd")
    return events.filter((event) => event.date === dateString)
  }

  const eventsForSelectedDate = selectedDate ? getEventsForDate(selectedDate) : []

  // Get all dates with events for highlighting in the calendar
  const datesWithEvents = events.map((event) => new Date(event.date))

  return (
    <div className="space-y-4">
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="map">Carte</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier des événements</CardTitle>
                <CardDescription>Sélectionnez une date pour voir les événements</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={fr}
                  modifiers={{
                    hasEvent: datesWithEvents,
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      fontWeight: "bold",
                      backgroundColor: "hsl(var(--primary) / 0.1)",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? `Événements du ${format(selectedDate, "d MMMM yyyy", { locale: fr })}` : "Événements"}
                </CardTitle>
                <CardDescription>
                  {eventsForSelectedDate.length
                    ? `${eventsForSelectedDate.length} événement(s) ce jour`
                    : "Aucun événement ce jour"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventsForSelectedDate.length > 0 ? (
                    eventsForSelectedDate.map((event) => (
                      <Card
                        key={event.id}
                        className="cursor-pointer hover:bg-muted/50 border-none bg-white dark:bg-gray-950 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div
                          className={`absolute top-0 left-0 w-full h-1 ${
                            event.type === "Atelier"
                              ? "bg-primary"
                              : event.type === "Soirée"
                                ? "bg-secondary"
                                : event.type === "Workshop"
                                  ? "bg-accent"
                                  : event.type === "Dîner"
                                    ? "bg-[#22c55e]"
                                    : "bg-muted"
                          }`}
                        ></div>
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <Badge
                              variant={
                                event.type === "Atelier"
                                  ? "default"
                                  : event.type === "Soirée"
                                    ? "secondary"
                                    : event.type === "Workshop"
                                      ? "accent"
                                      : event.type === "Dîner"
                                        ? "success"
                                        : "outline"
                              }
                            >
                              {event.type}
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{event.time}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Users className="h-3.5 w-3.5" />
                            <span>
                              {event.participants}/{event.maxParticipants} participants
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                      <CalendarIcon className="h-10 w-10 mb-2" />
                      <p>Aucun événement prévu ce jour</p>
                      <p className="text-sm">Sélectionnez une autre date ou consultez la liste complète</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedEvent && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedEvent.title}</CardTitle>
                    <CardDescription>
                      {format(new Date(selectedEvent.date), "d MMMM yyyy", { locale: fr })} • {selectedEvent.time}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{selectedEvent.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{selectedEvent.description}</p>

                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div>{selectedEvent.location}</div>
                      <div className="text-sm text-muted-foreground">{selectedEvent.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div>
                        {selectedEvent.participants}/{selectedEvent.maxParticipants} participants
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedEvent.maxParticipants - selectedEvent.participants} places disponibles
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[200px] bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Carte de l'événement</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                  Retour
                </Button>
                <Button>S'inscrire</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tous les événements à venir</CardTitle>
              <CardDescription>Liste complète des événements programmés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className="cursor-pointer hover:bg-muted/50 border-none bg-white dark:bg-gray-950 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div
                      className={`absolute top-0 left-0 w-full h-1 ${
                        event.type === "Atelier"
                          ? "bg-primary"
                          : event.type === "Soirée"
                            ? "bg-secondary"
                            : event.type === "Workshop"
                              ? "bg-accent"
                              : event.type === "Dîner"
                                ? "bg-[#22c55e]"
                                : "bg-muted"
                      }`}
                    ></div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            <span>{format(new Date(event.date), "d MMMM yyyy", { locale: fr })}</span>
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            event.type === "Atelier"
                              ? "default"
                              : event.type === "Soirée"
                                ? "secondary"
                                : event.type === "Workshop"
                                  ? "accent"
                                  : event.type === "Dîner"
                                    ? "success"
                                    : "outline"
                          }
                        >
                          {event.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>
                          {event.participants}/{event.maxParticipants} participants
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carte des événements</CardTitle>
              <CardDescription>Visualisez les événements sur une carte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Carte interactive des événements</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
