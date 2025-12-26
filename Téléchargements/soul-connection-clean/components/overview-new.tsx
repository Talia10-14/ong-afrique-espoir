"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Loader2 } from "lucide-react"

export function OverviewNew() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all data from APIs
        const [clientsRes, meetingsRes, paymentsRes] = await Promise.all([
          fetch("/api/clients"),
          fetch("/api/meetings"),
          fetch("/api/payments"),
        ])

        if (clientsRes.ok && meetingsRes.ok && paymentsRes.ok) {
          const clientsData = await clientsRes.json()
          const meetingsData = await meetingsRes.json()
          const paymentsData = await paymentsRes.json()

          // Helper to get month name
          const getMonthName = (dateStr: string) => {
            return new Date(dateStr).toLocaleString('fr-FR', { month: 'short' })
          }

          // Process data to group by month (last 6 months)
          const allMonths = new Set<string>()
          const now = new Date()
          for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
            allMonths.add(d.toLocaleString('fr-FR', { month: 'short' }))
          }

          const statsByMonth = Array.from(allMonths).map(month => ({
            name: month,
            clients: 0,
            meetings: 0,
            payments: 0,
          }))

          // Aggregate Clients
          clientsData.clients?.forEach((c: any) => {
            const m = getMonthName(c.createdAt)
            const stat = statsByMonth.find(s => s.name === m)
            if (stat) stat.clients++
          })

          // Aggregate Meetings
          meetingsData.meetings?.forEach((m: any) => {
            const month = getMonthName(m.startTime)
            const stat = statsByMonth.find(s => s.name === month)
            if (stat) stat.meetings++
          })

          // Aggregate Payments
          paymentsData.payments?.forEach((p: any) => {
            if (p.status === 'PAID') {
              const month = getMonthName(p.createdAt)
              const stat = statsByMonth.find(s => s.name === month)
              if (stat) stat.payments++
            }
          })

          setData(statsByMonth)
        }
      } catch (err) {
        console.error("Error fetching stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="var(--chart-grid, #888888)" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="var(--chart-grid, #888888)" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background, #ffffff)",
            border: "1px solid var(--border, #e5e7eb)",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Bar dataKey="clients" fill="var(--chart-1, #3b82f6)" radius={[8, 8, 0, 0]} />
        <Bar dataKey="meetings" fill="var(--chart-2, #8b5cf6)" radius={[8, 8, 0, 0]} />
        <Bar dataKey="payments" fill="var(--chart-3, #10b981)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
