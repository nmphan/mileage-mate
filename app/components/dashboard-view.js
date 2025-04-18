import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Car, MapPin, TrendingUp, Plus } from "lucide-react";
import { RecentTrips } from "@/app/trips/recent-trips";
import { RecentExpenses } from "@/app/expenses/recent-expenses";
import { TripsView } from "../trips/trips-view";
import { ExpensesView } from "../expenses/expenses-view";
import NewTrip from "../trips/new-trip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useEffect, useState } from "react";
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



  useEffect(() => {
    const sum = trips.reduce((sum, trip) => sum + parseFloat(trip.tripDistance), 0);
    setTotalMiles(sum);
  }, [trips]);

  useEffect(() => {
    const sum = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
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
    } catch (error) {
      console.error("Failed to add trip:", error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      loadExpenses(user.uid, setExpenses);
    }
  }, [user?.uid]);

  console.log(user?.uid);

  const handleAddExpense = async (newExpense) => {
    if (!user) return;

    try {
      await addExpense(user.uid, newExpense);
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Miles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{totalMiles} mi</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">
              $ {totalExpenses.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              8 expenses this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Add a trip or expense</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Car className="mr-2 h-4 w-4" /> Add Trip
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Trip</DialogTitle>
                  <DialogDescription>
                    Enter the details of your trip below.
                  </DialogDescription>
                </DialogHeader>
                <NewTrip onAddTrip={handleAddTrip} />
              </DialogContent>
            </Dialog>
            <div className="space-y-6"></div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <MapPin className="mr-2 h-4 w-4" /> Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                  <DialogDescription>
                    Enter the details of your expense below.
                  </DialogDescription>
                </DialogHeader>
                <NewExpense onAddExpense={handleAddExpense} />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentTrips />
        <RecentExpenses />
      </div>
    </div>
  );
}
