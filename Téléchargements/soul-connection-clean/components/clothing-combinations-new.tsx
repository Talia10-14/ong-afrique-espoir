"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Heart } from "lucide-react"

interface Client {
  id: string
  name: string
  zodiacSign: string
  status: string
}

const clothingCombinations = [
  {
    zodiac: "Bélier",
    combinations: [
      {
        occasion: "Rendez-vous romantique",
        style: "Rouge vif et noir",
        description: "Combinaison audacieuse et passionnée qui reflète l'énergie du Bélier",
        colors: ["Rouge", "Noir", "Or"],
      },
      {
        occasion: "Business casual",
        style: "Énergie dynamique",
        description: "Couleurs chaudes et pièces structurées pour projeter la confiance",
        colors: ["Orange", "Marron", "Blanc"],
      },
      {
        occasion: "Sortie casual",
        style: "Jeunesse et dynamisme",
        description: "Look sportif avec touches de couleur pour un style décontracté",
        colors: ["Gris", "Rouge", "Blanc"],
      },
    ],
  },
  {
    zodiac: "Lion",
    combinations: [
      {
        occasion: "Rendez-vous romantique",
        style: "Élégance royale",
        description: "Dorure et couleurs chaudes pour une présence majestueuse",
        colors: ["Or", "Marron doré", "Bourgogne"],
      },
      {
        occasion: "Business casual",
        style: "Leadership",
        description: "Coupes impeccables et couleurs nobles pour commander le respect",
        colors: ["Marron", "Or", "Ivoire"],
      },
      {
        occasion: "Sortie casual",
        style: "Charisme naturel",
        description: "Look sophistiqué sans effort avec détails dorés",
        colors: ["Camel", "Or", "Crème"],
      },
    ],
  },
  {
    zodiac: "Verseau",
    combinations: [
      {
        occasion: "Rendez-vous romantique",
        style: "Futuriste et original",
        description: "Bleu ciel et pièces non conventionnelles pour un look unique",
        colors: ["Bleu ciel", "Argent", "Blanc"],
      },
      {
        occasion: "Business casual",
        style: "Innovation",
        description: "Coupes modernes et couleurs inattendues pour se démarquer",
        colors: ["Bleu électrique", "Gris", "Blanc"],
      },
      {
        occasion: "Sortie casual",
        style: "Indépendance",
        description: "Mix de styles personnels pour un look authentique",
        colors: ["Indigo", "Blanc", "Argenté"],
      },
    ],
  },
]

export function ClothingCombinationsNew() {
  const [selectedZodiac, setSelectedZodiac] = useState("")
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients")
        if (response.ok) {
          const data = await response.json()
          setClients(data.clients.filter((c: Client) => c.zodiacSign))
        }
      } catch (err) {
        console.error("Error fetching clients:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [])

  const combinations = clothingCombinations.find((c) => c.zodiac === selectedZodiac)?.combinations || []

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const getClientsByZodiac = (zodiac: string) => {
    return clients.filter((c) => c.zodiacSign === zodiac)
  }

  const uniqueZodiacs = Array.from(
    new Set(clothingCombinations.map((c) => c.zodiac).filter((z) => getClientsByZodiac(z).length > 0))
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conseils de Tenue par Signe Astrologique</CardTitle>
          <CardDescription>Découvrez les meilleures combinaisons de couleurs et de styles pour votre signe</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="zodiac-select">Sélectionnez un signe astrologique</Label>
            <Select value={selectedZodiac} onValueChange={setSelectedZodiac}>
              <SelectTrigger id="zodiac-select">
                <SelectValue placeholder="Choisir un signe..." />
              </SelectTrigger>
              <SelectContent>
                {uniqueZodiacs.map((zodiac) => (
                  <SelectItem key={zodiac} value={zodiac}>
                    {zodiac} ({getClientsByZodiac(zodiac).length} client{getClientsByZodiac(zodiac).length > 1 ? "s" : ""})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedZodiac && (
        <>
          <div className="grid gap-4">
            {combinations.map((combo, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{combo.occasion}</CardTitle>
                      <CardDescription>{combo.style}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(`${selectedZodiac}-${idx}`)}
                      className={favorites.has(`${selectedZodiac}-${idx}`) ? "text-red-500" : ""}
                    >
                      <Heart
                        className={`h-5 w-5 ${favorites.has(`${selectedZodiac}-${idx}`) ? "fill-current" : ""}`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <p className="text-sm text-gray-700">{combo.description}</p>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Palette de couleurs recommandée :</p>
                    <div className="flex flex-wrap gap-2">
                      {combo.colors.map((color) => (
                        <Badge key={color} variant="outline">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg text-xs text-gray-700 space-y-1">
                    <p>
                      <strong>💡 Conseil :</strong> Associez une pièce principale dans la couleur dominante avec des
                      accessoires dans les autres teintes pour un look équilibré.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!loading && getClientsByZodiac(selectedZodiac).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Clients avec ce signe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getClientsByZodiac(selectedZodiac).map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium">{client.name}</span>
                      <Badge variant="secondary">{client.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {!selectedZodiac && !loading && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Sélectionnez un signe astrologique pour voir les recommandations de tenue
          </CardContent>
        </Card>
      )}
    </div>
  )
}
