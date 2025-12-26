import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ThemeBadge } from "@/components/theme-badge"

export const metadata: Metadata = {
  title: "Démo du thème | Soul Connection",
  description: "Démonstration du thème sombre et clair",
}

export default function ThemeDemoPage() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse-slow">
              Démonstration du thème
            </h2>
            <ThemeBadge />
          </div>

          <Tabs defaultValue="components" className="space-y-4">
            <TabsList>
              <TabsTrigger value="components">Composants</TabsTrigger>
              <TabsTrigger value="colors">Couleurs</TabsTrigger>
            </TabsList>

            <TabsContent value="components" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Boutons</CardTitle>
                    <CardDescription>Différentes variantes de boutons</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="default">Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="accent">Accent</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>Différentes variantes de badges</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="accent">Accent</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="success">Success</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Formulaires</CardTitle>
                    <CardDescription>Éléments de formulaire</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input id="name" placeholder="Entrez votre nom" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Soumettre</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle>Carte avec dégradé</CardTitle>
                    <CardDescription>Effet de dégradé en arrière-plan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Cette carte utilise un effet de dégradé qui s'adapte au thème sombre.</p>
                  </CardContent>
                </Card>

                <Card className="stat-card">
                  <CardHeader>
                    <CardTitle>Carte statistique</CardTitle>
                    <CardDescription>Avec effet de survol</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Survolez cette carte pour voir l'effet d'élévation et de transformation.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Couleurs primaires</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <div className="h-10 rounded-md bg-primary"></div>
                      <div className="h-10 rounded-md bg-primary/80"></div>
                      <div className="h-10 rounded-md bg-primary/60"></div>
                      <div className="h-10 rounded-md bg-primary/40"></div>
                      <div className="h-10 rounded-md bg-primary/20"></div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Couleurs secondaires</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <div className="h-10 rounded-md bg-secondary"></div>
                      <div className="h-10 rounded-md bg-secondary/80"></div>
                      <div className="h-10 rounded-md bg-secondary/60"></div>
                      <div className="h-10 rounded-md bg-secondary/40"></div>
                      <div className="h-10 rounded-md bg-secondary/20"></div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Couleurs d'accentuation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <div className="h-10 rounded-md bg-accent"></div>
                      <div className="h-10 rounded-md bg-accent/80"></div>
                      <div className="h-10 rounded-md bg-accent/60"></div>
                      <div className="h-10 rounded-md bg-accent/40"></div>
                      <div className="h-10 rounded-md bg-accent/20"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Couleurs de fond et de texte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between p-2 rounded-md bg-background border">
                        <span>Background</span>
                        <code className="text-sm">bg-background</code>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-card border">
                        <span>Card</span>
                        <code className="text-sm">bg-card</code>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md bg-muted border">
                        <span>Muted</span>
                        <code className="text-sm">bg-muted</code>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md border">
                        <span className="text-foreground">Foreground</span>
                        <code className="text-sm">text-foreground</code>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-md border">
                        <span className="text-muted-foreground">Muted Foreground</span>
                        <code className="text-sm">text-muted-foreground</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Couleurs pour les graphiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <div className="h-10 rounded-md" style={{ backgroundColor: "var(--chart-1)" }}></div>
                      <div className="h-10 rounded-md" style={{ backgroundColor: "var(--chart-2)" }}></div>
                      <div className="h-10 rounded-md" style={{ backgroundColor: "var(--chart-3)" }}></div>
                      <div className="h-10 rounded-md" style={{ backgroundColor: "var(--chart-4)" }}></div>
                      <div className="h-10 rounded-md" style={{ backgroundColor: "var(--chart-5)" }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
