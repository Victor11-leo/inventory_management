"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// productLine: str    
// priceEach: float
// msrp: int    
// month_id: int 

export function InventoryOverview() {
  const [productLine, setProductLine] = useState("")
  const [monthId, setMonthId] = useState("")
  const [msrp, setMsrp] = useState("")
  const [priceEach, setPriceEach] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      productLine,
      priceEach,
      msrp:Number(msrp),
      month_id:Number(monthId)
    }
    try {
      
      const res = await fetch("http://127.0.0.1:8000/predict",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
  
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const res_data = await res.json()
      console.log(res_data);
      toast.success(res_data.predicted_sales, {
        description:"Predicted sales",
        style:{
          background:"green",
          color:'white'
        }
      })
    } catch (error) {
      console.log(error.message);
      toast.error("There has been an error", {
        description:error?.message,
        style:{
          background:"red",
          color:'white'
        }
      })
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Demand forecasting</CardTitle>
          <Link 
          target="_blank"
          href='https://colab.research.google.com/drive/11hZJP1nD70CH-iZSGc4rR8MfyLs6UuCk?usp=sharing' className="flex items-center gap-2">
            <CardDescription>The ML can be found here </CardDescription>
          </Link>
        </CardHeader>
        <CardContent className="grid gap-2.5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Product Line</Label>        
          <Select onValueChange={value => setProductLine(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Product Line" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Classic Car">Classic Cars</SelectItem>
              <SelectItem value="Motorcycles">Motorcycles</SelectItem>
              <SelectItem value="Planes">Planes</SelectItem>
              <SelectItem value="Ships">Ships</SelectItem>
              <SelectItem value="Trains">Trains</SelectItem>
              <SelectItem value="Trucks and Buses">Trucks and Buses</SelectItem>
              <SelectItem value="Vintage Cars">Vintage Cars</SelectItem>              
            </SelectContent>
          </Select>          
        </div>  
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Month</Label>        
          <Select onValueChange={value => setMonthId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">Setptember</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
        </div>  
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Price@</Label>          
          <Input
          onChange={(e) => setPriceEach(e.target.value)}
          placeholder="priceEach"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">MSRP</Label>                    
          <Input
          onChange={(e) => setMsrp(e.target.value)}
          placeholder="msrp"
          />
        </div>
          
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Predict</Button>
        </CardFooter>
      </Card>

    </div>
  )
}
