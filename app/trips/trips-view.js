// "use client";
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Calendar, MapPin, Plus, Search } from "lucide-react"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Label } from "@/app/components/ui/label"
// import { Textarea } from "@/app/components/ui/textarea"

// import { useEffect, useState } from "react";
// import { useUserAuth } from "../_utils/auth-context";
// import { getTrips, addTrip, loadTrips } from "../_services/trips-service";
// import NewTrip from "./new-trip";

// export function TripsView() {

//   const [trips, setTrips] = useState([]);
//   const { user } = useUserAuth();

//   useEffect(() => {
//     if (user?.uid) {
//       loadTrips(user.uid, setTrips);
//     }
//   }, [user?.uid]);

//   console.log(user?.uid);

//   const handleAddTrip = async (newTrip) => {
//     if (!user) return;
    
//     try {
//       await addTrip(user.uid, newTrip);
//       setTrips(prevTrips => [...prevTrips, newTrip]);
//     } catch (error) {
//       console.error("Failed to add trip:", error);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">

//         <div className="grid grid-cols-2 gap-4 sm:flex">
//                <Dialog>
//             <DialogTrigger asChild>
//               <Button>
//                 <Plus className="mr-2 h-4 w-4" /> Add Trip
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Add New Trip</DialogTitle>
//                 <DialogDescription>Enter the details of your trip below.</DialogDescription>
//               </DialogHeader>
//               <NewTrip onAddTrip={handleAddTrip} />
//             </DialogContent>
//           </Dialog>


      
          
//         </div>
//       </div>

//       <div className="space-y-4">
//         {trips.map((trip) => (
//           <Card key={trip.id} className="overflow-hidden">
//             <CardHeader className="pb-3">
//               <div className="flex-col justify-between items-start">
//                 <div  className="flex items-center gap-2 text-sm mt-1">
//                 <Calendar className="h-4 w-4" />
//                   <CardTitle className="text-lg">{trip.tripDate}</CardTitle>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
//                     <span>{trip.tripDescription}</span>
//                   </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col sm:flex-row justify-between gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="flex flex-col items-center">
//                     <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
//                       <MapPin className="h-4 w-4 text-primary" />
//                     </div>
//                     <div className="h-3 w-0.5 bg-border my-1"></div>
//                     <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
//                       <MapPin className="h-4 w-4 text-primary" />
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     <div>
//                     <p className="text-xs text-muted-foreground">From</p>
//                       <p className="text-sm font-medium">{trip.startLocation}</p>
                
//                     </div>
//                     <div>
//                     <p className="text-xs text-muted-foreground">To</p>
//                       <p className="text-sm font-medium">{trip.endLocation}</p>
                     
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-row sm:flex-col justify-between items-end sm:items-end gap-2 mt-4 sm:mt-0">
//                   <div className="text-right">
//                     <p className="text-sm font-medium">Distance</p>
//                     <p className="text-lg font-bold">{trip.tripDistance} miles</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }