"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

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
  // Add more signs here...
}

// Compatibility descriptions
const compatibilityDescriptions: Record<string, string> = {
  high: "Ces signes ont une excellente compatibilité naturelle. Ils se comprennent intuitivement et partagent des valeurs similaires. Cette relation a un fort potentiel de succès à long terme.",
  medium:
    "Ces signes ont une compatibilité moyenne. Ils peuvent bien s'entendre mais devront travailler sur certains aspects de leur relation. Avec de la communication, cette relation peut fonctionner.",
  low: "Ces signes ont quelques défis de compatibilité. Ils ont des approches différentes de la vie qui peuvent créer des tensions. Cette relation nécessitera des efforts et des compromis.",
}

export function AstrologyCompatibility() {
  const [sign1, setSign1] = useState("")
  const [sign2, setSign2] = useState("")
  const [result, setResult] = useState<{
    score: number
    description: string
    aspects: {
      title: string
      score: number
    }[]
  } | null>(null)

  const analyzeCompatibility = () => {
    if (!sign1 || !sign2) return

    // Get base compatibility score
    const baseScore = compatibilityMatrix[sign1]?.[sign2] || 50

    // Generate random scores for different aspects
    const aspects = [
      { title: "Communication", score: Math.floor(baseScore * (0.8 + Math.random() * 0.4)) },
      { title: "Émotions", score: Math.floor(baseScore * (0.8 + Math.random() * 0.4)) },
      { title: "Valeurs", score: Math.floor(baseScore * (0.8 + Math.random() * 0.4)) },
      { title: "Intimité", score: Math.floor(baseScore * (0.8 + Math.random() * 0.4)) },
    ]

    // Determine description based on score
    let description
    if (baseScore >= 80) {
      description = compatibilityDescriptions.high
    } else if (baseScore >= 60) {
      description = compatibilityDescriptions.medium
    } else {
      description = compatibilityDescriptions.low
    }

    setResult({
      score: baseScore,
      description,
      aspects,
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="gradient-card border-none bg-white dark:bg-gray-950 overflow-hidden">
        <CardHeader>
          <CardTitle>Analyse de compatibilité</CardTitle>
          <CardDescription>Sélectionnez deux signes astrologiques pour analyser leur compatibilité</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sign1">Premier signe</Label>
            <Select value={sign1} onValueChange={setSign1}>
              <SelectTrigger id="sign1">
                <SelectValue placeholder="Sélectionner un signe" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign}>
                    {sign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sign2">Deuxième signe</Label>
            <Select value={sign2} onValueChange={setSign2}>
              <SelectTrigger id="sign2">
                <SelectValue placeholder="Sélectionner un signe" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign}>
                    {sign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={analyzeCompatibility} className="w-full" disabled={!sign1 || !sign2}>
            Analyser la compatibilité
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <Card className="gradient-card border-none bg-white dark:bg-gray-950 overflow-hidden">
          <CardHeader>
            <CardTitle>Résultats de compatibilité</CardTitle>
            <CardDescription>
              {sign1} et {sign2}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Score global</Label>
                <span className="font-bold text-primary">{result.score}%</span>
              </div>
              <Progress
                value={result.score}
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-primary via-secondary to-accent"
              />
            </div>

            <div className="space-y-4">
              <Label>Aspects spécifiques</Label>
              {result.aspects.map((aspect, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{aspect.title}</span>
                    <span
                      className={`font-medium ${
                        aspect.score > 80 ? "text-primary" : aspect.score > 60 ? "text-secondary" : "text-accent"
                      }`}
                    >
                      {aspect.score}%
                    </span>
                  </div>
                  <Progress
                    value={aspect.score}
                    className="h-1.5"
                    indicatorClassName={`${
                      aspect.score > 80 ? "bg-primary" : aspect.score > 60 ? "bg-secondary" : "bg-accent"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Analyse</Label>
              <p className="text-sm text-muted-foreground">{result.description}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Enregistrer cette analyse
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
