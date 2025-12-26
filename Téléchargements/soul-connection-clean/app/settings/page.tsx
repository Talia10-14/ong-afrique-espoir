import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Préférences de l'application</CardTitle>
                    <CardDescription>Gérez vos préférences système et notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="notifications" className="flex flex-col space-y-1">
                            <span>Notifications par email</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Recevoir un email lors d'un nouveau rendez-vous
                            </span>
                        </Label>
                        <Switch id="notifications" />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="marketing" className="flex flex-col space-y-1">
                            <span>Emails marketing</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Recevoir des nouvelles sur les produits et fonctionnalités
                            </span>
                        </Label>
                        <Switch id="marketing" />
                    </div>

                    <div className="pt-4">
                        <Button>Enregistrer les modifications</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
