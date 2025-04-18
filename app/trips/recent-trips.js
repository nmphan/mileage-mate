
"use client";
import { Car } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Calendar, MapPin, Plus, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"

import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getTrips, addTrip, loadTrips } from "../_services/trips-service";
import NewTrip from "./new-trip";


export function RecentTrips() {

    const [trips, setTrips] = useState([]);
    const { user } = useUserAuth();
  
    useEffect(() => {
      if (user?.uid) {
        loadTrips(user.uid, setTrips);
      }
    }, [user?.uid]);
  
    console.log(user?.uid);
  
    const handleAddTrip = async (newTrip) => {
      if (!user) return;
      
      try {
        await addTrip(user.uid, newTrip);
        setTrips(prevTrips => [...prevTrips, newTrip]);
      } catch (error) {
        console.error("Failed to add trip:", error);
      }
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trips</CardTitle>
        <CardDescription>Your latest recorded trips</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-4">
                <div className="rounded-full p-2 bg-blue-100">
                  <Car className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{trip.startLocation} - {trip.endLocation}</h4>
                  <p className="text-sm text-muted-foreground">{trip.tripDate}</p>
                  <p className="text-sm text-muted-foreground">{trip.tripDescription}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{trip.tripDistance} mi</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}



