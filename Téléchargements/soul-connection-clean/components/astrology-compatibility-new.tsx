"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

const zodiacSigns = [
  "Bélier",
  "Taureau",
  "Gémeaux",
  "Cancer",
  "Lion",
  "Vierge",
  "Balance",
  "Scorpion",
  "Sagittaire",
  "Capricorne",
  "Verseau",
  "Poissons",
]

// Simplified compatibility matrix (0-100)
const compatibilityMatrix: Record<string, Record<string, number>> = {
  Bélier: {
    Bélier: 70,
    Taureau: 60,
    Gémeaux: 85,
    Cancer: 65,
    Lion: 90,
    Vierge: 55,
    Balance: 75,
    Scorpion: 60,
    Sagittaire: 95,
    Capricorne: 50,
    Verseau: 80,
    Poissons: 65,
  },
  Taureau: {
    Bélier: 60,
    Taureau: 80,
    Gémeaux: 55,
    Cancer: 90,
    Lion: 70,
    Vierge: 95,
    Balance: 75,
    Scorpion: 85,
    Sagittaire: 50,
    Capricorne: 95,
    Verseau: 45,
    Poissons: 85,
  },
  Gémeaux: {
    Bélier: 85,
    Taureau: 55,
    Gémeaux: 80,
    Cancer: 70,
    Lion: 85,
    Vierge: 90,
    Balance: 95,
    Scorpion: 60,
    Sagittaire: 75,
    Capricorne: 55,
    Verseau: 95,
    Poissons: 70,
  },
  Cancer: {
    Bélier: 65,
    Taureau: 90,
    Gémeaux: 70,
    Cancer: 85,
    Lion: 65,
    Vierge: 85,
    Balance: 65,
    Scorpion: 90,
    Sagittaire: 60,
    Capricorne: 75,
    Verseau: 55,
    Poissons: 95,
  },
  Lion: {
    Bélier: 90,
    Taureau: 70,
    Gémeaux: 85,
    Cancer: 65,
    Lion: 80,
    Vierge: 65,
    Balance: 80,
    Scorpion: 70,
    Sagittaire: 90,
    Capricorne: 60,
    Verseau: 70,
    Poissons: 65,
  },
  Vierge: {
    Bélier: 55,
    Taureau: 95,
    Gémeaux: 90,
    Cancer: 85,
    Lion: 65,
    Vierge: 85,
    Balance: 70,
    Scorpion: 85,
    Sagittaire: 55,
    Capricorne: 95,
    Verseau: 60,
    Poissons: 75,
  },
  Balance: {
    Bélier: 75,
    Taureau: 75,
    Gémeaux: 95,
    Cancer: 65,
    Lion: 80,
    Vierge: 70,
    Balance: 75,
    Scorpion: 75,
    Sagittaire: 80,
    Capricorne: 70,
    Verseau: 90,
    Poissons: 70,
  },
  Scorpion: {
    Bélier: 60,
    Taureau: 85,
    Gémeaux: 60,
    Cancer: 90,
    Lion: 70,
    Vierge: 85,
    Balance: 75,
    Scorpion: 85,
    Sagittaire: 65,
    Capricorne: 85,
    Verseau: 55,
    Poissons: 90,
  },
  Sagittaire: {
    Bélier: 95,
    Taureau: 50,
    Gémeaux: 75,
    Cancer: 60,
    Lion: 90,
    Vierge: 55,
    Balance: 80,
    Scorpion: 65,
    Sagittaire: 85,
    Capricorne: 55,
    Verseau: 90,
    Poissons: 60,
  },
  Capricorne: {
    Bélier: 50,
    Taureau: 95,
    Gémeaux: 55,
    Cancer: 75,
    Lion: 60,
    Vierge: 95,
    Balance: 70,
    Scorpion: 85,
    Sagittaire: 55,
    Capricorne: 80,
    Verseau: 65,
    Poissons: 70,
  },
  Verseau: {
    Bélier: 80,
    Taureau: 45,
    Gémeaux: 95,
    Cancer: 55,
    Lion: 70,
    Vierge: 60,
    Balance: 90,
    Scorpion: 55,
    Sagittaire: 90,
    Capricorne: 65,
    Verseau: 85,
    Poissons: 65,
  },
  Poissons: {
    Bélier: 65,
    Taureau: 85,
    Gémeaux: 70,
    Cancer: 95,
    Lion: 65,
    Vierge: 75,
    Balance: 70,
    Scorpion: 90,
    Sagittaire: 60,
    Capricorne: 70,
    Verseau: 65,
    Poissons: 85,
  },
}

const compatibilityDescriptions: Record<string, string> = {
  high: "Ces signes ont une excellente compatibilité naturelle. Ils se comprennent intuitivement et partagent des valeurs similaires. Cette relation a un fort potentiel de succès à long terme.",
  medium:
    "Ces signes ont une compatibilité moyenne. Ils peuvent bien s'entendre mais devront travailler sur certains aspects de leur relation. Avec de la communication, cette relation peut fonctionner.",
  low: "Ces signes ont quelques défis de compatibilité. Ils ont des approches différentes de la vie qui peuvent créer des tensions. Cette relation nécessitera des efforts et des compromis.",
}

export function AstrologyCompatibilityNew() {
  const [sign1, setSign1] = useState("")
  const [sign2, setSign2] = useState("")
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<{
    score: number
    description: string
    aspects: {
      title: string
      score: number
    }[]
  } | null>(null)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients")
        if (response.ok) {
          const data = await response.json()
          setClients(data.clients)
        }
      } catch (err) {
        console.error("Error fetching clients:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [])

  const analyzeCompatibility = () => {
    if (!sign1 || !sign2) return

    const score = compatibilityMatrix[sign1]?.[sign2] || 0
    const level = score >= 80 ? "high" : score >= 60 ? "medium" : "low"

    setResult({
      score,
      description: compatibilityDescriptions[level],
      aspects: [
        { title: "Compatibilité émotionnelle", score: score + Math.random() * 20 - 10 },
        { title: "Compatibilité intellectuelle", score: score + Math.random() * 20 - 10 },
        { title: "Compatibilité physique", score: score + Math.random() * 20 - 10 },
        { title: "Compatibilité spirituelle", score: score + Math.random() * 20 - 10 },
      ],
    })
  }

  const getClientsByZodiac = (zodiac: string) => {
    return clients.filter((c) => c.zodiacSign === zodiac)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analyse de Compatibilité Astrologique</CardTitle>
          <CardDescription>Sélectionnez deux signes astrologiques pour analyser leur compatibilité</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sign1">Premier Signe</Label>
              <Select value={sign1} onValueChange={setSign1}>
                <SelectTrigger id="sign1">
                  <SelectValue placeholder="Sélectionnez un signe" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign} value={sign}>
                      {sign}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {sign1 && !loading && (
                <p className="text-xs text-muted-foreground">
                  {getClientsByZodiac(sign1).length} client(s) avec ce signe
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sign2">Deuxième Signe</Label>
              <Select value={sign2} onValueChange={setSign2}>
                <SelectTrigger id="sign2">
                  <SelectValue placeholder="Sélectionnez un signe" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign} value={sign}>
                      {sign}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {sign2 && !loading && (
                <p className="text-xs text-muted-foreground">
                  {getClientsByZodiac(sign2).length} client(s) avec ce signe
                </p>
              )}
            </div>
          </div>

          <Button onClick={analyzeCompatibility} disabled={!sign1 || !sign2} className="w-full">
            Analyser la Compatibilité
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>
              Résultat : {sign1} & {sign2}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{Math.round(result.score)}%</div>
              <p className="text-sm text-muted-foreground">Compatibilité globale</p>
            </div>

            <p className="text-sm leading-relaxed text-gray-700">{result.description}</p>

            <div className="space-y-3">
              {result.aspects.map((aspect, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{aspect.title}</span>
                    <span className="text-sm font-bold">{Math.round(Math.max(0, Math.min(100, aspect.score)))}%</span>
                  </div>
                  <Progress value={Math.max(0, Math.min(100, aspect.score))} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && clients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribution des Signes Astrologiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {zodiacSigns.map((sign) => {
                const count = getClientsByZodiac(sign).length
                return count > 0 ? (
                  <div key={sign} className="flex items-center space-x-2">
                    <span className="text-gray-600">{sign}:</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ) : null
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
