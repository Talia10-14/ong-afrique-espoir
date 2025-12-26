"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock coaching tips data
const coachingTips = {
  personalities: [
    {
      id: "introvert",
      title: "Clients introvertis",
      description: "Comment coacher efficacement les clients introvertis",
      tips: [
        "Privilégiez les rencontres en petit comité plutôt que les grands événements",
        "Laissez-leur le temps de réfléchir avant de répondre aux questions importantes",
        "Respectez leur besoin d'espace et de temps seul",
        "Proposez des activités qui correspondent à leur personnalité (musées, cafés calmes, etc.)",
        "Évitez de les mettre sous pression sociale",
      ],
    },
    {
      id: "extrovert",
      title: "Clients extravertis",
      description: "Comment coacher efficacement les clients extravertis",
      tips: [
        "Proposez des événements sociaux et des activités de groupe",
        "Encouragez-les à partager leurs expériences et sentiments",
        "Organisez des speed-dating ou des soirées networking",
        "Maintenez un rythme dynamique dans vos interactions",
        "Valorisez leur enthousiasme et leur énergie",
      ],
    },
    {
      id: "analytical",
      title: "Clients analytiques",
      description: "Comment coacher efficacement les clients analytiques",
      tips: [
        "Fournissez des données et des statistiques pour appuyer vos conseils",
        "Soyez précis et factuel dans vos explications",
        "Respectez leur besoin de comprendre le processus en détail",
        "Préparez des réponses aux questions techniques qu'ils pourraient poser",
        "Évitez les approches trop émotionnelles ou intuitives",
      ],
    },
    {
      id: "emotional",
      title: "Clients émotionnels",
      description: "Comment coacher efficacement les clients émotionnels",
      tips: [
        "Validez leurs sentiments et émotions",
        "Utilisez l'écoute active et l'empathie",
        "Aidez-les à identifier et exprimer leurs besoins émotionnels",
        "Proposez des exercices de visualisation et de projection",
        "Créez un environnement sécurisant et bienveillant",
      ],
    },
  ],
  situations: [
    {
      id: "recent-breakup",
      title: "Rupture récente",
      description: "Comment accompagner un client après une rupture récente",
      tips: [
        "Respectez leur rythme de guérison émotionnelle",
        "Aidez-les à identifier les leçons de leur relation précédente",
        "Encouragez-les à se reconnecter avec eux-mêmes avant de chercher une nouvelle relation",
        "Proposez des activités qui renforcent la confiance en soi",
        "Soyez attentif aux signes de dépendance affective",
      ],
    },
    {
      id: "long-term-single",
      title: "Célibataire de longue durée",
      description: "Comment accompagner un client célibataire depuis longtemps",
      tips: [
        "Aidez-les à identifier et surmonter leurs blocages",
        "Travaillez sur la confiance en soi et l'image de soi",
        "Encouragez-les à sortir de leur zone de confort progressivement",
        "Proposez des exercices pratiques pour améliorer leurs compétences sociales",
        "Aidez-les à ajuster leurs attentes si nécessaire",
      ],
    },
    {
      id: "high-expectations",
      title: "Attentes élevées",
      description: "Comment gérer un client avec des attentes très élevées",
      tips: [
        "Aidez-les à distinguer leurs besoins essentiels de leurs préférences",
        "Explorez l'origine de leurs critères et attentes",
        "Proposez des exercices de réflexion sur leurs valeurs fondamentales",
        "Encouragez l'ouverture d'esprit et la flexibilité",
        "Utilisez des exemples concrets de couples heureux malgré des différences",
      ],
    },
    {
      id: "busy-professional",
      title: "Professionnels très occupés",
      description: "Comment accompagner un client avec peu de temps disponible",
      tips: [
        "Optimisez chaque session pour maximiser l'efficacité",
        "Proposez des rencontres de qualité plutôt que de quantité",
        "Aidez-les à intégrer leur recherche amoureuse dans leur emploi du temps chargé",
        "Travaillez sur l'équilibre vie professionnelle/vie personnelle",
        "Utilisez la technologie pour maintenir le contact entre les sessions",
      ],
    },
  ],
  ageGroups: [
    {
      id: "20s",
      title: "Clients dans la vingtaine",
      description: "Comment coacher efficacement les clients de 20-29 ans",
      tips: [
        "Aidez-les à identifier ce qu'ils recherchent vraiment à ce stade de leur vie",
        "Abordez les questions d'indépendance et de développement personnel",
        "Discutez des défis liés à la construction de carrière et vie amoureuse",
        "Proposez des stratégies pour rencontrer des partenaires potentiels via les réseaux sociaux",
        "Encouragez l'exploration et la découverte de soi",
      ],
    },
    {
      id: "30s",
      title: "Clients dans la trentaine",
      description: "Comment coacher efficacement les clients de 30-39 ans",
      tips: [
        "Abordez les questions de timing concernant les enfants et la famille",
        "Aidez-les à gérer la pression sociale liée à l'âge",
        "Travaillez sur la clarté des objectifs relationnels",
        "Discutez des défis liés à l'équilibre entre carrière établie et vie personnelle",
        "Proposez des stratégies pour rencontrer des partenaires ayant des objectifs similaires",
      ],
    },
    {
      id: "40s",
      title: "Clients dans la quarantaine",
      description: "Comment coacher efficacement les clients de 40-49 ans",
      tips: [
        "Aidez-les à surmonter les déceptions passées",
        "Abordez les questions liées aux enfants (déjà présents ou désir d'en avoir)",
        "Travaillez sur la redéfinition des attentes et des priorités",
        "Discutez des défis liés à la rencontre de partenaires à ce stade de la vie",
        "Encouragez l'acceptation de soi et la confiance en son expérience",
      ],
    },
    {
      id: "50plus",
      title: "Clients de 50 ans et plus",
      description: "Comment coacher efficacement les clients de 50 ans et plus",
      tips: [
        "Aidez-les à embrasser cette nouvelle phase de leur vie",
        "Abordez les questions liées aux changements physiques et à l'image de soi",
        "Travaillez sur l'ouverture aux nouvelles façons de rencontrer des partenaires",
        "Discutez des défis liés à l'intégration de vies déjà bien établies",
        "Encouragez la redécouverte de leurs passions et intérêts",
      ],
    },
  ],
}

export function CoachingTips() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter tips based on search term
  const filterTips = (tips) => {
    if (!searchTerm) return tips

    return tips.filter(
      (tip) =>
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.tips.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  const filteredPersonalities = filterTips(coachingTips.personalities)
  const filteredSituations = filterTips(coachingTips.situations)
  const filteredAgeGroups = filterTips(coachingTips.ageGroups)

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher des conseils..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="personalities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personalities">Types de personnalité</TabsTrigger>
          <TabsTrigger value="situations">Situations spécifiques</TabsTrigger>
          <TabsTrigger value="ageGroups">Groupes d'âge</TabsTrigger>
        </TabsList>

        <TabsContent value="personalities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredPersonalities.map((personality) => (
              <Card
                key={personality.id}
                className="overflow-hidden border-none bg-white dark:bg-gray-950 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">{personality.title}</CardTitle>
                  <CardDescription>{personality.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    {personality.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="situations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredSituations.map((situation) => (
              <Card
                key={situation.id}
                className="overflow-hidden border-none bg-white dark:bg-gray-950 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">{situation.title}</CardTitle>
                  <CardDescription>{situation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    {situation.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ageGroups" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredAgeGroups.map((ageGroup) => (
              <Card
                key={ageGroup.id}
                className="overflow-hidden border-none bg-white dark:bg-gray-950 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">{ageGroup.title}</CardTitle>
                  <CardDescription>{ageGroup.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    {ageGroup.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
