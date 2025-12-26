import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Search } from "@/components/search"
import { ClientsList } from "@/components/clients-list"

export const metadata: Metadata = {
  title: "Clients | Soul Connection",
  description: "Gestion des clients Soul Connection",
}

export default function ClientsPage() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link href="/clients/new">Ajouter un client</Link>
              </Button>
            </div>
          </div>
          <ClientsList />
        </div>
      </div>
    </>
  )
}
