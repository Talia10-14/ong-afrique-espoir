"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock clothing data
const clothingItems = {
  tops: [
    { id: 1, name: "Chemise blanche", image: "/placeholder.svg?height=150&width=150", color: "Blanc", style: "Formel" },
    { id: 2, name: "T-shirt noir", image: "/placeholder.svg?height=150&width=150", color: "Noir", style: "Casual" },
    { id: 3, name: "Pull gris", image: "/placeholder.svg?height=150&width=150", color: "Gris", style: "Casual" },
    { id: 4, name: "Chemise bleue", image: "/placeholder.svg?height=150&width=150", color: "Bleu", style: "Formel" },
  ],
  bottoms: [
    { id: 1, name: "Jean bleu", image: "/placeholder.svg?height=150&width=150", color: "Bleu", style: "Casual" },
    { id: 2, name: "Pantalon noir", image: "/placeholder.svg?height=150&width=150", color: "Noir", style: "Formel" },
    {
      id: 3,
      name: "Chino beige",
      image: "/placeholder.svg?height=150&width=150",
      color: "Beige",
      style: "Smart casual",
    },
    { id: 4, name: "Jean noir", image: "/placeholder.svg?height=150&width=150", color: "Noir", style: "Casual" },
  ],
  shoes: [
    {
      id: 1,
      name: "Chaussures en cuir",
      image: "/placeholder.svg?height=150&width=150",
      color: "Marron",
      style: "Formel",
    },
    {
      id: 2,
      name: "Baskets blanches",
      image: "/placeholder.svg?height=150&width=150",
      color: "Blanc",
      style: "Casual",
    },
    { id: 3, name: "Mocassins", image: "/placeholder.svg?height=150&width=150", color: "Noir", style: "Smart casual" },
    { id: 4, name: "Bottes", image: "/placeholder.svg?height=150&width=150", color: "Marron", style: "Casual" },
  ],
  accessories: [
    { id: 1, name: "Montre classique", image: "/placeholder.svg?height=150&width=150", style: "Formel" },
    { id: 2, name: "Bracelet en cuir", image: "/placeholder.svg?height=150&width=150", style: "Casual" },
    { id: 3, name: "Cravate", image: "/placeholder.svg?height=150&width=150", style: "Formel" },
    { id: 4, name: "Écharpe", image: "/placeholder.svg?height=150&width=150", style: "Casual" },
  ],
}

export function ClothingCombinations() {
  const [selectedItems, setSelectedItems] = useState({
    top: null,
    bottom: null,
    shoes: null,
    accessory: null,
  })

  const [savedCombinations, setSavedCombinations] = useState([])

  const handleSelectItem = (category, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: item,
    }))
  }

  const saveCombination = () => {
    // Check if we have at least a top and bottom
    if (selectedItems.top && selectedItems.bottom) {
      setSavedCombinations((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...selectedItems,
        },
      ])
    }
  }

  const clearSelection = () => {
    setSelectedItems({
      top: null,
      bottom: null,
      shoes: null,
      accessory: null,
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Créer une combinaison</CardTitle>
          <CardDescription>Sélectionnez des vêtements pour créer une tenue complète</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tops" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tops">Hauts</TabsTrigger>
              <TabsTrigger value="bottoms">Bas</TabsTrigger>
              <TabsTrigger value="shoes">Chaussures</TabsTrigger>
              <TabsTrigger value="accessories">Accessoires</TabsTrigger>
            </TabsList>

            <TabsContent value="tops" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {clothingItems.tops.map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-md p-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedItems.top?.id === item.id
                        ? "ring-2 ring-primary shadow-lg shadow-primary/20 scale-[1.02]"
                        : "hover:scale-[1.01]"
                    }`}
                    onClick={() => handleSelectItem("top", item)}
                  >
                    <div className="aspect-square relative mb-2">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.style}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bottoms" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {clothingItems.bottoms.map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-md p-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedItems.bottom?.id === item.id
                        ? "ring-2 ring-primary shadow-lg shadow-primary/20 scale-[1.02]"
                        : "hover:scale-[1.01]"
                    }`}
                    onClick={() => handleSelectItem("bottom", item)}
                  >
                    <div className="aspect-square relative mb-2">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.style}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shoes" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {clothingItems.shoes.map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-md p-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedItems.shoes?.id === item.id
                        ? "ring-2 ring-primary shadow-lg shadow-primary/20 scale-[1.02]"
                        : "hover:scale-[1.01]"
                    }`}
                    onClick={() => handleSelectItem("shoes", item)}
                  >
                    <div className="aspect-square relative mb-2">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.style}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accessories" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {clothingItems.accessories.map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-md p-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedItems.accessory?.id === item.id
                        ? "ring-2 ring-primary shadow-lg shadow-primary/20 scale-[1.02]"
                        : "hover:scale-[1.01]"
                    }`}
                    onClick={() => handleSelectItem("accessory", item)}
                  >
                    <div className="aspect-square relative mb-2">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.style}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={clearSelection}>
            Effacer
          </Button>
          <Button onClick={saveCombination} disabled={!selectedItems.top || !selectedItems.bottom}>
            Enregistrer cette combinaison
          </Button>
        </CardFooter>
      </Card>

      <Card className="gradient-card border-none bg-white dark:bg-gray-950">
        <CardHeader>
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Aperçu de la tenue
          </CardTitle>
          <CardDescription>Votre sélection actuelle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedItems.top ? (
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 relative">
                  <Image
                    src={selectedItems.top.image || "/placeholder.svg"}
                    alt={selectedItems.top.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <div className="font-medium">{selectedItems.top.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedItems.top.style}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Haut
                </div>
                <div className="text-muted-foreground">Aucun haut sélectionné</div>
              </div>
            )}

            {selectedItems.bottom ? (
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 relative">
                  <Image
                    src={selectedItems.bottom.image || "/placeholder.svg"}
                    alt={selectedItems.bottom.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <div className="font-medium">{selectedItems.bottom.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedItems.bottom.style}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Bas
                </div>
                <div className="text-muted-foreground">Aucun bas sélectionné</div>
              </div>
            )}

            {selectedItems.shoes ? (
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 relative">
                  <Image
                    src={selectedItems.shoes.image || "/placeholder.svg"}
                    alt={selectedItems.shoes.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <div className="font-medium">{selectedItems.shoes.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedItems.shoes.style}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Chaussures
                </div>
                <div className="text-muted-foreground">Aucunes chaussures sélectionnées</div>
              </div>
            )}

            {selectedItems.accessory ? (
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 relative">
                  <Image
                    src={selectedItems.accessory.image || "/placeholder.svg"}
                    alt={selectedItems.accessory.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <div className="font-medium">{selectedItems.accessory.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedItems.accessory.style}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Accessoire
                </div>
                <div className="text-muted-foreground">Aucun accessoire sélectionné</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
