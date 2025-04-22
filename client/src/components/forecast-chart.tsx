"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import dataset from '@/data/combined.json'

export function ForecastChart() {
  console.log(dataset);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={dataset}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YearMonth" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="actual" stackId="1" stroke="#8884d8" fill="#8884d8" name="PRODUCTLINE" />
        <Area type="monotone" dataKey="SALES" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Forecasted Demand" />
        <Area
          type="monotone"
          dataKey="upper"
          stackId="3"
          stroke="#ffc658"
          fill="#ffc658"
          fillOpacity={0.3}
          name="Upper Bound (95%)"
        />
        <Area
          type="monotone"
          dataKey="lower"
          stackId="4"
          stroke="#ff8042"
          fill="#ff8042"
          fillOpacity={0.3}
          name="Lower Bound (95%)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// Generate sample forecast data
function generateForecastData() {
  const data = []

  // Historical data (past 8 weeks)
  for (let i = 1; i <= 8; i++) {
    const baseValue = 1000 + Math.random() * 200
    data.push({
      week: `W${i}`,
      actual: Math.round(baseValue),
      forecast: null,
      upper: null,
      lower: null,
    })
  }

  // Current week
  const currentWeekValue = 1200 + Math.random() * 100
  data.push({
    week: "Current",
    actual: Math.round(currentWeekValue),
    forecast: Math.round(currentWeekValue * 0.95),
    upper: Math.round(currentWeekValue * 1.1),
    lower: Math.round(currentWeekValue * 0.9),
  })

  // Future forecast (next 12 weeks)
  let lastValue = currentWeekValue
  for (let i = 1; i <= 12; i++) {
    // Add some trend and seasonality
    const trend = 10 * i
    const seasonality = Math.sin(i / 4) * 100
    const randomness = Math.random() * 100 - 50

    lastValue = lastValue + trend + seasonality + randomness
    const forecastValue = Math.max(800, Math.round(lastValue))

    data.push({
      week: `W${i + 9}`,
      actual: null,
      forecast: forecastValue,
      upper: Math.round(forecastValue * 1.15),
      lower: Math.round(forecastValue * 0.85),
    })
  }

  return data
}


