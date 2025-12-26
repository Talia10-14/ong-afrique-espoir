"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Sophie M.",
    clients: 32,
    conversion: 92,
    meetings: 48,
  },
  {
    name: "Thomas D.",
    clients: 28,
    conversion: 87,
    meetings: 42,
  },
  {
    name: "Julie M.",
    clients: 24,
    conversion: 83,
    meetings: 36,
  },
  {
    name: "Pierre L.",
    clients: 22,
    conversion: 78,
    meetings: 32,
  },
  {
    name: "Emma R.",
    clients: 18,
    conversion: 75,
    meetings: 26,
  },
]

export function CoachPerformance() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "0.5rem",
            border: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend />
        <Bar
          dataKey="clients"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
          name="Clients"
          animationDuration={1500}
        />
        <Bar
          dataKey="meetings"
          fill="hsl(var(--secondary))"
          radius={[4, 4, 0, 0]}
          name="Meetings"
          animationDuration={1500}
        />
        <Bar
          dataKey="conversion"
          fill="hsl(var(--accent))"
          radius={[4, 4, 0, 0]}
          name="Taux de conversion (%)"
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
