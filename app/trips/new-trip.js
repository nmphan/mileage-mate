"use client";
import { useState } from "react";

export default function NewTrip({ onAddTrip, onClose }) {
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
            tripDistance: parseFloat(tripDistance),
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
        // Close the dialog if onClose is provided
        if (onClose) onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="tripDate" className="block text-sm font-medium text-gray-300 mb-1">
                        Trip Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        id="tripDate"
                        value={tripDate}
                        onChange={(e) => setTripDate(e.target.value)}
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                    />
                </div>
                <div>
                    <label htmlFor="tripDistance" className="block text-sm font-medium text-gray-300 mb-1">
                        Distance (miles) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="tripDistance"
                        value={tripDistance}
                        onChange={(e) => setTripDistance(e.target.value)}
                        required
                        min="0"
                        step="0.1"
                        className="block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                        placeholder="0.0"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="startLocation" className="block text-sm font-medium text-gray-300 mb-1">
                        Start Location <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="startLocation"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                        placeholder="e.g. New York, NY"
                    />
                </div>
                <div>
                    <label htmlFor="endLocation" className="block text-sm font-medium text-gray-300 mb-1">
                        End Location <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="endLocation"
                        value={endLocation}
                        onChange={(e) => setEndLocation(e.target.value)}
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                        placeholder="e.g. Boston, MA"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="tripDescription" className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                </label>
                <textarea
                    id="tripDescription"
                    value={tripDescription}
                    onChange={(e) => setTripDescription(e.target.value)}
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border"
                    placeholder="Optional notes about the trip"
                ></textarea>
            </div>

            <div className="flex justify-center space-x-3 pt-2">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-md shadow-sm text-sm font-medium bg-black text-white hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md shadow-sm text-sm font-medium bg-white text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                    Add Trip
                </button>
            </div>
        </form>
    );
}