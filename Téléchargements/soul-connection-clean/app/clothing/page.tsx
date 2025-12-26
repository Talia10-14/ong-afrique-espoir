"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shirt, ShoppingBag, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ClothingPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Style & Vêtements</h2>
                <Button>Ajouter une tenue</Button>
            </div>

            <Tabs defaultValue="looks" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="looks">Looks Conseillés</TabsTrigger>
                    <TabsTrigger value="wardrobe">Garde-robe Clients</TabsTrigger>
                </TabsList>

                <TabsContent value="looks" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <div className="aspect-square bg-slate-100 rounded-t-lg flex items-center justify-center">
                                <Shirt className="h-24 w-24 text-slate-300" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg">Look "Premier Date"</CardTitle>
                                <CardDescription>Élégant mais décontracté</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Bleu Marine</span>
                                    <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">Beige</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <div className="aspect-square bg-slate-100 rounded-t-lg flex items-center justify-center">
                                <ShoppingBag className="h-24 w-24 text-slate-300" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg">Accessoires Essentiels</CardTitle>
                                <CardDescription>Pour compléter le style</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Montres</span>
                                    <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">Bracelets</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
