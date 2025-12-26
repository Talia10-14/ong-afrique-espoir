import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { MainNav } from "@/components/main-nav"
import { OverviewNew } from "@/components/overview-new"
import { RecentClientsNew } from "@/components/recent-clients-new"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { CoachPerformance } from "@/components/coach-performance"
import { UpcomingEvents } from "@/components/upcoming-events"
import { DashboardSkeleton } from "@/components/skeletons"

export const metadata: Metadata = {
  title: "Dashboard | Soul Connection",
  description: "Soul Connection coach management platform",
}

export default function DashboardPage() {
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
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse-slow">
              Dashboard
            </h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>
                <Link href="/clients/new">Ajouter un client</Link>
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="analytics">Statistiques</TabsTrigger>
              <TabsTrigger value="events">Événements</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="stat-card overflow-hidden border-none bg-white dark:bg-gray-950">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-primary"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      <Suspense fallback={<span>...</span>}>245</Suspense>
                    </div>
                    <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
                  </CardContent>
                </Card>
                <Card className="stat-card overflow-hidden border-none bg-white dark:bg-gray-950">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Meetings ce mois</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-secondary"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M8 12h8M12 8v8" />
                      </svg>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-secondary">
                      <Suspense fallback={<span>...</span>}>132</Suspense>
                    </div>
                    <p className="text-xs text-muted-foreground">+7% par rapport au mois dernier</p>
                  </CardContent>
                </Card>
                <Card className="stat-card overflow-hidden border-none bg-white dark:bg-gray-950">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-accent"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent">
                      <Suspense fallback={<span>...</span>}>24.5%</Suspense>
                    </div>
                    <p className="text-xs text-muted-foreground">+5.2% par rapport au mois dernier</p>
                  </CardContent>
                </Card>
                <Card className="stat-card overflow-hidden border-none bg-white dark:bg-gray-950">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Événements à venir</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-[#22c55e]"
                      >
                        <path d="M5 8h14M5 12h14M5 16h14" />
                      </svg>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#22c55e]">
                      <Suspense fallback={<span>...</span>}>8</Suspense>
                    </div>
                    <p className="text-xs text-muted-foreground">Prochain: Atelier Rencontre (12/05)</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 gradient-card border-none bg-white dark:bg-gray-950">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Vue d'ensemble</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Suspense fallback={<DashboardSkeleton />}>
                      <OverviewNew />
                    </Suspense>
                  </CardContent>
                </Card>
                <Card className="col-span-3 gradient-card border-none bg-white dark:bg-gray-950">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Clients récents</CardTitle>
                    <CardDescription>Vous avez 12 nouveaux clients ce mois-ci.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<DashboardSkeleton />}>
                      <RecentClientsNew />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Performance des coachs</CardTitle>
                    <CardDescription>Comparaison des performances par coach</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Suspense fallback={<DashboardSkeleton />}>
                      <CoachPerformance />
                    </Suspense>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Top Coachs</CardTitle>
                    <CardDescription>Classement par nombre de clients convertis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="flex items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">1.</span>
                          <div className="h-8 w-8 rounded-full bg-primary" />
                          <div className="ml-2 space-y-1">
                            <p className="text-sm font-medium leading-none">Sophie Martin</p>
                            <p className="text-sm text-muted-foreground">32 clients</p>
                          </div>
                        </div>
                        <div className="ml-auto font-medium">92% conversion</div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">2.</span>
                          <div className="h-8 w-8 rounded-full bg-primary/80" />
                          <div className="ml-2 space-y-1">
                            <p className="text-sm font-medium leading-none">Thomas Dubois</p>
                            <p className="text-sm text-muted-foreground">28 clients</p>
                          </div>
                        </div>
                        <div className="ml-auto font-medium">87% conversion</div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">3.</span>
                          <div className="h-8 w-8 rounded-full bg-primary/60" />
                          <div className="ml-2 space-y-1">
                            <p className="text-sm font-medium leading-none">Julie Moreau</p>
                            <p className="text-sm text-muted-foreground">24 clients</p>
                          </div>
                        </div>
                        <div className="ml-auto font-medium">83% conversion</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Événements à venir</CardTitle>
                  <CardDescription>Ateliers, soirées et autres événements</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<DashboardSkeleton />}>
                    <UpcomingEvents />
                  </Suspense>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/events">Voir tous les événements</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
