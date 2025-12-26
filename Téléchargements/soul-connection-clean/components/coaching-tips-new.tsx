"use client"

import { useState, useEffect } from "react"
import { Lightbulb, Loader2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface Tip {
  id: string
  title: string
  content: string
  category: string
  clientId: string
  client: string
  createdAt: string
  updatedAt: string
}

const CATEGORIES = [
  { value: "general", label: "Général" },
  { value: "communication", label: "Communication" },
  { value: "relations", label: "Relations" },
  { value: "development", label: "Développement Personnel" },
  { value: "mindfulness", label: "Pleine Conscience" },
]

export function CoachingTipsNew() {
  const [tips, setTips] = useState<Tip[]>([])
  const [filteredTips, setFilteredTips] = useState<Tip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch("/api/tips")
        if (!response.ok) {
          throw new Error("Failed to fetch tips")
        }
        const data = await response.json()
        if (data.success) {
          setTips(data.tips)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchTips()
  }, [])

  useEffect(() => {
    let filtered = tips
    if (searchTerm) {
      filtered = filtered.filter(
        (tip) =>
          tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tip.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((tip) => tip.category === selectedCategory)
    }
    setFilteredTips(filtered)
  }, [tips, searchTerm, selectedCategory])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      general: "bg-gray-100 text-gray-800",
      communication: "bg-blue-100 text-blue-800",
      relations: "bg-pink-100 text-pink-800",
      development: "bg-green-100 text-green-800",
      mindfulness: "bg-purple-100 text-purple-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getCategoryLabel = (category: string) => {
    const catItem = CATEGORIES.find((c) => c.value === category)
    return catItem?.label || category
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2">Chargement des conseils...</span>
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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Input
            placeholder="Rechercher des conseils..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:flex-1"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTips.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Lightbulb className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">Aucun conseil trouvé</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTips.map((tip) => (
            <Card key={tip.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-base">{tip.title}</CardTitle>
                    <CardDescription className="text-xs">
                      Pour {tip.client}
                    </CardDescription>
                  </div>
                  <Badge className={getCategoryColor(tip.category)}>
                    {getCategoryLabel(tip.category)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">{tip.content}</p>
                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <span>
                    {format(new Date(tip.createdAt), "PPp", { locale: fr })}
                  </span>
                  <Button variant="ghost" size="sm">
                    Lire plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTips.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          {filteredTips.length} conseil{filteredTips.length > 1 ? "s" : ""} trouvé{filteredTips.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  )
}
