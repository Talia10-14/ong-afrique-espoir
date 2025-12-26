"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Moon, Sun, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AstrologyPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Compatibilité Astrologique</h2>
                <Button>Nouvelle analyse</Button>
            </div>

            <Tabs defaultValue="partners" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="partners">Partenaires</TabsTrigger>
                    <TabsTrigger value="daily">Horoscope du jour</TabsTrigger>
                    <TabsTrigger value="charts">Thèmes asrtaux</TabsTrigger>
                </TabsList>

                <TabsContent value="partners" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Sophie & Thomas</CardTitle>
                                <Heart className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">87%</div>
                                <p className="text-xs text-muted-foreground">Compatibilité élevée</p>
                                <div className="mt-4 flex items-center justify-between text-sm">
                                    <span className="flex items-center"><Sun className="mr-1 h-4 w-4 text-yellow-500" /> Lion</span>
                                    <span className="flex items-center"><Moon className="mr-1 h-4 w-4 text-slate-400" /> Balance</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Julie & Marc</CardTitle>
                                <Heart className="h-4 w-4 text-orange-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">64%</div>
                                <p className="text-xs text-muted-foreground">Compatibilité moyenne</p>
                                <div className="mt-4 flex items-center justify-between text-sm">
                                    <span className="flex items-center"><Sun className="mr-1 h-4 w-4 text-yellow-500" /> Vierge</span>
                                    <span className="flex items-center"><Moon className="mr-1 h-4 w-4 text-slate-400" /> Capricorne</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="daily">
                    <Card>
                        <CardHeader>
                            <CardTitle>Horoscope Coach</CardTitle>
                            <CardDescription>Les énergies du jour pour vos coachings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Contenu de l'horoscope à intégrer ici...</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
