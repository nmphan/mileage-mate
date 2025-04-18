import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Receipt } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
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
import NewExpense from "./new-expense"
import { useEffect, useState } from "react";
import { auth } from "../_utils/firebase"
import { useUserAuth } from "../_utils/auth-context";
import { getExpenses, addExpense, loadExpenses } from "../_services/expenses-service";

export function RecentExpenses() {

   const [expenses, setExpenses] = useState([]);
      const { user } = useUserAuth();
      const [totalExpenses, setTotalExpenses] = useState(0);
  
      useEffect(() => {
        const sum = expenses.reduce(
          (sum, expense) => sum + parseFloat(expense.amount),
          0
        );
        setTotalExpenses(sum);
      }, [expenses]);
    
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
          setExpenses(prevExpenses => [...prevExpenses, newExpense]);
        } catch (error) {
          console.error("Failed to add expense:", error);
        }
      };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>Your latest recorded expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-4">
                <div className="rounded-full p-2 bg-red-100">
                  <Receipt className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium">{expense.description}</h4>
                  <p className="text-sm text-muted-foreground">{expense.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${expense.amount}</div>
                <Badge variant="outline">{expense.category}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// const expenses = [
//   {
//     id: 1,
//     description: "Gas Station Fill-up",
//     date: "Today, 10:15 AM",
//     amount: "45.75",
//     category: "Fuel",
//   },
//   {
//     id: 2,
//     description: "Oil Change Service",
//     date: "Yesterday, 3:30 PM",
//     amount: "65.99",
//     category: "Maintenance",
//   },
//   {
//     id: 3,
//     description: "Parking Downtown",
//     date: "Mar 27, 11:45 AM",
//     amount: "12.50",
//     category: "Parking",
//   },
//   {
//     id: 4,
//     description: "Car Wash",
//     date: "Mar 24, 4:20 PM",
//     amount: "15.00",
//     category: "Maintenance",
//   },
// ]
