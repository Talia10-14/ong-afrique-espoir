"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"

interface Client {
  id: string
  name: string
  email: string
  coach: string
}

export function RecentClientsNew() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients")
        if (response.ok) {
          const data = await response.json()
          // Take the first 5 clients
          setClients(data.clients?.slice(0, 5) || [])
        }
      } catch (err) {
        console.error("Error fetching clients:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-8">
      {clients.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun client trouvé</p>
      ) : (
        clients.map((client) => (
          <div key={client.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{client.name}</p>
              <p className="text-sm text-muted-foreground">{client.email}</p>
            </div>
            <div className="ml-auto font-medium text-sm">Coach: {client.coach}</div>
          </div>
        ))
      )}
    </div>
  )
}
