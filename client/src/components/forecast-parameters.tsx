"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  forecastHorizon: z.number().min(1).max(52),
  confidenceInterval: z.number().min(50).max(99),
  seasonalityPeriod: z.string(),
  includePromotion: z.boolean(),
  includeHolidays: z.boolean(),
  algorithmType: z.string(),
  trainingPeriod: z.number().min(1).max(104),
})

export function ForecastParameters() {
  const [isTraining, setIsTraining] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      forecastHorizon: 12,
      confidenceInterval: 95,
      seasonalityPeriod: "weekly",
      includePromotion: true,
      includeHolidays: true,
      algorithmType: "prophet",
      trainingPeriod: 52,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsTraining(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsTraining(false)
    }, 2000)
  }

  return (
    <Tabs defaultValue="basic" className="space-y-4">
      <TabsList>
        <TabsTrigger value="basic">Basic Parameters</TabsTrigger>
        <TabsTrigger value="advanced">Advanced Parameters</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <Card>
          <CardHeader>
            <CardTitle>Forecast Configuration</CardTitle>
            <CardDescription>Configure the basic parameters for the demand forecasting model</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="forecastHorizon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forecast Horizon (Weeks)</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            min={1}
                            max={52}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1 week</span>
                            <span>{field.value} weeks</span>
                            <span>52 weeks</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>How many weeks into the future to forecast</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confidenceInterval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confidence Interval (%)</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            min={50}
                            max={99}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>50%</span>
                            <span>{field.value}%</span>
                            <span>99%</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>Statistical confidence level for prediction intervals</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seasonalityPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seasonality Period</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select seasonality period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The primary seasonality pattern in your data</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col space-y-4">
                  <FormField
                    control={form.control}
                    name="includePromotion"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Include Promotional Effects</FormLabel>
                          <FormDescription>Account for marketing campaigns and promotions</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="includeHolidays"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Include Holiday Effects</FormLabel>
                          <FormDescription>Account for seasonal holidays and events</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isTraining}>
                  {isTraining ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Training Model...
                    </>
                  ) : (
                    "Update Forecast"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="advanced">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Model Configuration</CardTitle>
            <CardDescription>Fine-tune the machine learning algorithm parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="algorithmType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forecasting Algorithm</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select algorithm" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="prophet">Prophet</SelectItem>
                          <SelectItem value="arima">ARIMA</SelectItem>
                          <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                          <SelectItem value="xgboost">XGBoost</SelectItem>
                          <SelectItem value="ensemble">Ensemble Method</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The machine learning algorithm used for forecasting</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trainingPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Training Period (Weeks)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={104}
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>How many weeks of historical data to use for training</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isTraining}>
                  {isTraining ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Training Model...
                    </>
                  ) : (
                    "Update Forecast"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button variant="secondary">Export Configuration</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
