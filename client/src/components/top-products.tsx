"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function TopProducts() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    const topProductsData = [
      { name: "Product A", forecast: 1245, current: 980 },
      { name: "Product B", forecast: 980, current: 850 },
      { name: "Product C", forecast: 875, current: 760 },
      { name: "Product D", forecast: 760, current: 720 },
      { name: "Product E", forecast: 650, current: 590 },
    ]
    setData(topProductsData)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="current" fill="#8884d8" name="Current Stock" />
        <Bar dataKey="forecast" fill="#82ca9d" name="Forecasted Demand" />
      </BarChart>
    </ResponsiveContainer>
  )
}
