"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
    const { data: session } = useSession()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Mon Profil</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Informations Personnelles</CardTitle>
                        <CardDescription>Vos informations de coach</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="/avatars/01.png" alt="@coach" />
                                <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm">Changer la photo</Button>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Nom complet</Label>
                            <Input id="name" defaultValue={session?.user?.name || ""} disabled />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue={session?.user?.email || ""} disabled />
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Statistiques du compte</CardTitle>
                        <CardDescription>Votre activité sur la plateforme</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Les statistiques détaillées arriveront bientôt.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
