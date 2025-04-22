'use client'
import {  
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { DollarSign, Package, TrendingUp, Truck, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryOverview } from "@/components/inventory-overview"
import { ForecastChart } from "@/components/forecast-chart"
import { TopProducts } from "@/components/top-products"
import { ForecastParameters } from "@/components/forecast-parameters"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [inventory,setInventory] = useState(0)
  const [sku,setSku] = useState(0)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/data')
    .then(res => res.json())
    .then(data => {
      setInventory(data?.total_inventory)
      setSku(data?.skus)
      console.log(data)
    })
  },[])
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>InventoryML</span>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <SignedIn>
              <UserButton/>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <User/>
              </SignInButton>
            </SignedOut>          
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Demand Forecasting Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="forecasts">Forecasts</TabsTrigger>            
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${inventory}</div>
                  
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stock Keeping Units</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sku}</div>
                  
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Forecast MAPE score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">40.32%</div>
                  
                </CardContent>
              </Card>              
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Demand Forecast </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ForecastChart />
                </CardContent>
              </Card>              
            </div>
          </TabsContent>
          <TabsContent value="forecasts" className="space-y-4">
            <InventoryOverview />
          </TabsContent>
          <TabsContent value="parameters" className="space-y-4">
            <ForecastParameters />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
