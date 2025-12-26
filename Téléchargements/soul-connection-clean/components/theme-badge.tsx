"use client"

import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Monitor } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeBadge() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Badge variant="outline" className="gap-1">
      {theme === "dark" ? (
        <>
          <Moon className="h-3.5 w-3.5" />
          <span>Mode sombre</span>
        </>
      ) : theme === "light" ? (
        <>
          <Sun className="h-3.5 w-3.5" />
          <span>Mode clair</span>
        </>
      ) : (
        <>
          <Monitor className="h-3.5 w-3.5" />
          <span>Thème système</span>
        </>
      )}
    </Badge>
  )
}
