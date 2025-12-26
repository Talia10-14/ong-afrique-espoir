"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Meeting {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  location?: string
  type: string
  status: string
  notes?: string
}

interface ClientMeetingsProps {
  meetings: Meeting[]
  clientId: string
}

interface ClientMeetingsProps {
  meetings: Meeting[]
  clientId: string
}

export function ClientMeetings({ meetings, clientId }: ClientMeetingsProps) {
  const [open, setOpen] = useState(false)
  const [newMeeting, setNewMeeting] = useState({
    date: "",
    type: "",
    notes: "",
  })

  const handleAddMeeting = () => {
    // In a real app, we would send this to the API
    console.log("Adding meeting:", newMeeting)
    setOpen(false)
    // Reset form
    setNewMeeting({
      date: "",
      type: "",
      notes: "",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Rendez-vous</CardTitle>
          <CardDescription>Historique des rendez-vous avec le client</CardDescription>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un rendez-vous</DialogTitle>
              <DialogDescription>Ajoutez les détails du rendez-vous avec le client.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newMeeting.type}
                  onValueChange={(value) => setNewMeeting({ ...newMeeting, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Premier contact">Premier contact</SelectItem>
                    <SelectItem value="Suivi">Suivi</SelectItem>
                    <SelectItem value="Présentation profils">Présentation profils</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newMeeting.notes}
                  onChange={(e) => setNewMeeting({ ...newMeeting, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddMeeting}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell>{format(new Date(meeting.date), "dd MMMM yyyy", { locale: fr })}</TableCell>
                <TableCell>{meeting.type}</TableCell>
                <TableCell>{meeting.notes}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Voir tous les rendez-vous
        </Button>
      </CardFooter>
    </Card>
  )
}
