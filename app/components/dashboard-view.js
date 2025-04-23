import { Car, MapPin } from "lucide-react";
import { RecentTrips } from "@/app/trips/recent-trips";
import { RecentExpenses } from "@/app/expenses/recent-expenses";
import NewTrip from "../trips/new-trip";
import { use, useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getTrips, addTrip, loadTrips } from "../_services/trips-service";
import NewExpense from "../expenses/new-expense";
import { loadExpenses } from "../_services/expenses-service";
import { addExpense } from "../_services/expenses-service";

export function DashboardView() {
  const { user } = useUserAuth();
  const [trips, setTrips] = useState([]);
  const [totalMiles, setTotalMiles] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isTripDialogOpen, setIsTripDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [totalTripsCount, setTotalTripsCount] = useState(0);
  const [totalExpensesCount, setTotalExpensesCount] = useState(0);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const totalTripsCount = trips.reduce((count, trip) => {
      const tripDate = new Date(trip.tripDate);
      return (
        count +
        (tripDate.getMonth() === currentMonth &&
        tripDate.getFullYear() === currentYear
          ? 1
          : 0)
      );
    }, 0);
    setTotalTripsCount(totalTripsCount);
  }, [trips]);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const totalExpensesCount = expenses.reduce((count, expense) => {
      const expenseDate = new Date(expense.date);
      return (
        count +
        (expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
          ? 1
          : 0)
      );
    }, 0);

    setTotalExpensesCount(totalExpensesCount);
  }, [expenses]);

  useEffect(() => {
    const sum = trips.reduce(
      (sum, trip) => sum + parseFloat(trip.tripDistance),
      0
    );
    setTotalMiles(sum);
  }, [trips]);

  useEffect(() => {
    const sum = expenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );
    setTotalExpenses(sum);
  }, [expenses]);

  useEffect(() => {
    if (user?.uid) {
      loadTrips(user.uid, setTrips);
    }
  }, [user?.uid]);

  const handleAddTrip = async (newTrip) => {
    if (!user) return;

    try {
      await addTrip(user.uid, newTrip);
      setTrips((prevTrips) => [...prevTrips, newTrip]);
      setIsTripDialogOpen(false);
    } catch (error) {
      console.error("Failed to add trip:", error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      loadExpenses(user.uid, setExpenses);
    }
  }, [user?.uid]);

  const handleAddExpense = async (newExpense) => {
    if (!user) return;

    try {
      await addExpense(user.uid, newExpense);
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      setIsExpenseDialogOpen(false);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Total Miles Card */}
        <div className="rounded-lg shadow-sm p-6 bg-gray-800">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-lg font-semibold text-gray-300">Total Miles</h3>
            <Car className="h-4 w-4 text-gray-300" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-blue-500">
              {totalMiles} mi
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {totalTripsCount} trips this month
            </p>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="rounded-lg bg-gray-800 shadow-sm p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-lg font-semibold text-gray-300">
              Total Expenses
            </h3>
            <MapPin className="h-4 w-4 text-gray-300" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-red-400">
              $ {totalExpenses.toFixed(2)}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {totalExpensesCount} expenses this month
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="rounded-lg bg-gray-800 shadow-sm relative overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-300">Quick Actions</h2>
          <p className="text-sm text-gray-400">Add a trip or expense</p>

          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            {/* Add Trip Button */}
            <button
              onClick={() => setIsTripDialogOpen(true)}
              className="flex-1 flex items-center justify-center bg-gray-600 text-gray-300 hover:bg-gray-200 hover:text-black py-2 px-4 rounded-md transition-colors"
            >
              <Car className="mr-2 h-4 w-4" /> Add Trip
            </button>

            {/* Add Expense Button */}
            <button
              onClick={() => setIsExpenseDialogOpen(true)}
              className="flex-1 flex items-center justify-center bg-black text-gray-300 hover:bg-gray-200 hover:text-black py-2 px-4 rounded-md transition-colors"
            >
              <MapPin className="mr-2 h-4 w-4" /> Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* Recent Trips and Expenses */}
      <div className="grid gap-6 md:grid-cols-2">
        <RecentTrips trips={trips}/>
        <RecentExpenses expenses={expenses}/>
      </div>

      {/* Trip Dialog */}
      {isTripDialogOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-700 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Add New Trip</h3>
                <p className="text-sm text-gray-300">
                  Enter the details of your trip below.
                </p>
              </div>
              <NewTrip
                onAddTrip={handleAddTrip}
                onClose={() => setIsTripDialogOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Expense Dialog */}
      {isExpenseDialogOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-700 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Add New Expense</h3>
                <p className="text-sm text-gray-300">
                  Enter the details of your expense below.
                </p>
              </div>
              <NewExpense
                onAddExpense={handleAddExpense}
                onClose={() => setIsExpenseDialogOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
