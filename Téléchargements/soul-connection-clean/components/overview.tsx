"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    clients: 12,
    meetings: 18,
  },
  {
    name: "Fév",
    clients: 15,
    meetings: 22,
  },
  {
    name: "Mar",
    clients: 18,
    meetings: 26,
  },
  {
    name: "Avr",
    clients: 22,
    meetings: 32,
  },
  {
    name: "Mai",
    clients: 24,
    meetings: 36,
  },
  {
    name: "Juin",
    clients: 28,
    meetings: 42,
  },
  {
    name: "Juil",
    clients: 32,
    meetings: 48,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="var(--chart-grid, #888888)" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="var(--chart-grid, #888888)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.95))",
            borderRadius: "0.5rem",
            border: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            color: "var(--tooltip-text, inherit)",
          }}
          cursor={{ fill: "var(--chart-hover, rgba(0, 0, 0, 0.05))" }}
        />
        <Bar dataKey="clients" fill="var(--chart-1)" radius={[4, 4, 0, 0]} name="Clients" animationDuration={1500} />
        <Bar dataKey="meetings" fill="var(--chart-2)" radius={[4, 4, 0, 0]} name="Meetings" animationDuration={1500} />
      </BarChart>
    </ResponsiveContainer>
  )
}
