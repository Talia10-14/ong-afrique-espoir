"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary relative group",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
        {pathname === "/" && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
      </Link>
      <Link
        href="/clients"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary relative group",
          pathname === "/clients" || pathname.startsWith("/clients/") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Clients
        {pathname === "/clients" ||
          (pathname.startsWith("/clients/") && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
          ))}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
      </Link>
      <Link
        href="/events"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary relative group",
          pathname === "/events" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Événements
        {pathname === "/events" && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
        )}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
      </Link>
      <Link
        href="/astrology"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary relative group",
          pathname === "/astrology" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Compatibilité
        {pathname === "/astrology" && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
        )}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
      </Link>
      <Link
        href="/clothing"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary relative group",
          pathname === "/clothing" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Vêtements
        {pathname === "/clothing" && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
        )}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
      </Link>
      <Link
        href="/tips"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary relative group",
          pathname === "/tips" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Conseils
        {pathname === "/tips" && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
        )}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </nav>
  )
}
