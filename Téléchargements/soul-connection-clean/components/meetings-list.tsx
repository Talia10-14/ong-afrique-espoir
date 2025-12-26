"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"

interface Meeting {
    id: string
    title: string
    description?: string | null
    startTime: Date
    endTime: Date
    location?: string | null
    type: string
    status: string
    notes?: string | null
    client: {
        id: string
        name: string
    }
}

interface MeetingsListProps {
    meetings: Meeting[]
    title?: string
    description?: string
}

export function MeetingsList({
    meetings,
    title = "Rendez-vous",
    description = "Tous vos rendez-vous planifiés et passés"
}: MeetingsListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {meetings && meetings.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Titre</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Localisation</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {meetings.map((meeting) => (
                                <TableRow key={meeting.id}>
                                    <TableCell>
                                        {format(new Date(meeting.startTime), "PPP p", { locale: fr })}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/clients/${meeting.client.id}`}
                                            className="text-primary hover:underline font-medium"
                                        >
                                            {meeting.client.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{meeting.title}</TableCell>
                                    <TableCell>{meeting.type}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm ${meeting.status === "COMPLETED"
                                                    ? "bg-green-100 text-green-800"
                                                    : meeting.status === "CANCELLED"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-blue-100 text-blue-800"
                                                }`}
                                        >
                                            {meeting.status === "SCHEDULED"
                                                ? "Planifié"
                                                : meeting.status === "COMPLETED"
                                                    ? "Complété"
                                                    : meeting.status === "CANCELLED"
                                                        ? "Annulé"
                                                        : "Reporté"}
                                        </span>
                                    </TableCell>
                                    <TableCell>{meeting.location || "N/A"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        Aucun rendez-vous trouvé
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
