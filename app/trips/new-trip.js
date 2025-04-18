"use client";
import { useState } from "react";

export default function NewTrip({ onAddTrip }) {
    const [tripDate, setTripDate] = useState("");
    const [tripDistance, setTripDistance] = useState("");
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");
    const [tripDescription, setTripDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTrip = {
            id: crypto.randomUUID(),
            tripDate,
            tripDistance,
            startLocation,
            endLocation,
            tripDescription,
        };
        onAddTrip(newTrip);
        setTripDate("");
        setTripDistance("");
        setStartLocation("");
        setEndLocation("");
        setTripDescription("");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="tripDate" className="block text-sm font-medium text-gray-700">Trip Date</label>
                    <input
                        type="date"
                        id="tripDate"
                        value={tripDate}
                        onChange={(e) => setTripDate(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-8"
                    />
                </div>
                <div>
                    <label htmlFor="tripDistance" className="block text-sm font-medium text-gray-700">Trip Distance (miles)</label>
                    <input
                        type="number"
                        id="tripDistance"
                        value={tripDistance}
                        onChange={(e) => setTripDistance(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-8"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startLocation" className="block text-sm font-medium text-gray-700">Start Location</label>
                    <input
                        type="text"
                        id="startLocation"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-8"
                    />
                </div>
                <div>
                    <label htmlFor="endLocation" className="block text-sm font-medium text-gray-700">End Location</label>
                    <input
                        type="text"
                        id="endLocation"
                        value={endLocation}
                        onChange={(e) => setEndLocation(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-8"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="tripDescription" className="block text-sm font-medium text-gray-700">Trip Description</label>
                <textarea
                    id="tripDescription"
                    value={tripDescription}
                    onChange={(e) => setTripDescription(e.target.value)}
                    rows="3"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-8"
                ></textarea>
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                    Add Trip
                </button>
            </div>
        </form>
    );
}