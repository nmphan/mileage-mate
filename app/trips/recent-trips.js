"use client";
import { Car } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { loadTrips } from "../_services/trips-service";

export function RecentTrips() {
    const [trips, setTrips] = useState([]);
    const { user } = useUserAuth();
  
    useEffect(() => {
      if (user?.uid) {
        loadTrips(user.uid, setTrips);
      }
    }, [user?.uid]);

    return (
        <div className="rounded-lg bg-gradient-to-b from-gray-800 to-gray-700 shadow-sm">
            <div className="p-6">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-300">Recent Trips</h2>
                    <p className="text-sm text-gray-400">Your latest recorded trips</p>
                </div>
                
                <div className="space-y-4">
                    {trips.map((trip) => (
                        <div 
                            key={trip.id} 
                            className="flex items-center justify-between border-b border-gray-600 pb-4 last:border-0 last:pb-0"
                        >
                            <div className="flex items-start gap-4">
                                <div className="rounded-full p-2 bg-blue-100">
                                    <Car className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-300">
                                        {trip.startLocation} → {trip.endLocation}
                                    </h4>
                                    <p className="text-sm text-gray-400">{trip.tripDate}</p>
                                    {trip.tripDescription && (
                                        <p className="text-sm text-gray-400 mt-1">{trip.tripDescription}</p>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium text-gray-300">{trip.tripDistance} mi</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}