// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Badge } from "@/app/components/ui/badge"
// import { Calendar, Plus, Receipt, Search } from "lucide-react"
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
// import NewExpense from "./new-expense"
// import { useEffect, useState } from "react";
// import { auth } from "../_utils/firebase"
// import { useUserAuth } from "../_utils/auth-context";
// import { getExpenses, addExpense, loadExpenses } from "../_services/expenses-service";

// export function ExpensesView() {
//     const [expenses, setExpenses] = useState([]);
//     const { user } = useUserAuth();
//     const [totalExpenses, setTotalExpenses] = useState(0);

//     useEffect(() => {
//       const sum = expenses.reduce(
//         (sum, expense) => sum + parseFloat(expense.amount),
//         0
//       );
//       setTotalExpenses(sum);
//     }, [expenses]);
  
//     useEffect(() => {
//       if (user?.uid) {
//         loadExpenses(user.uid, setExpenses);
//       }
//     }, [user?.uid]);
  
//     console.log(user?.uid);
  
//     const handleAddExpense = async (newExpense) => {
//       if (!user) return;
      
//       try {
//         await addExpense(user.uid, newExpense);
//         setExpenses(prevExpenses => [...prevExpenses, newExpense]);
//       } catch (error) {
//         console.error("Failed to add expense:", error);
//       }
//     };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
//         <div className="relative flex-1">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input type="search" placeholder="Search expenses..." className="pl-8" />
//         </div>

//         <div className="grid grid-cols-2 gap-4 sm:flex">
//           <Select defaultValue="all">
//             <SelectTrigger className="w-[130px]">
//               <SelectValue placeholder="Category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               <SelectItem value="fuel">Fuel</SelectItem>
//               <SelectItem value="maintenance">Maintenance</SelectItem>
//               <SelectItem value="parking">Parking</SelectItem>
//               <SelectItem value="tolls">Tolls</SelectItem>
//               <SelectItem value="other">Other</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select defaultValue="march">
//             <SelectTrigger className="w-[130px]">
//               <SelectValue placeholder="Month" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="march">March 2025</SelectItem>
//               <SelectItem value="february">February 2025</SelectItem>
//               <SelectItem value="january">January 2025</SelectItem>
//             </SelectContent>
//           </Select>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button>
//                 <Plus className="mr-2 h-4 w-4" /> Add Expense
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Add New Expense</DialogTitle>
//                 <DialogDescription>Enter the details of your expense below.</DialogDescription>
//               </DialogHeader>
//               {/* <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="expense-description">Description</Label>
//                   <Input id="expense-description" placeholder="e.g., Gas Fill-up" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="expense-date">Date</Label>
//                     <Input id="expense-date" type="date" />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="expense-amount">Amount ($)</Label>
//                     <Input id="expense-amount" type="number" placeholder="0.00" step="0.01" />
//                   </div>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="expense-category">Category</Label>
//                   <Select>
//                     <SelectTrigger id="expense-category">
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="fuel">Fuel</SelectItem>
//                       <SelectItem value="maintenance">Maintenance</SelectItem>
//                       <SelectItem value="parking">Parking</SelectItem>
//                       <SelectItem value="tolls">Tolls</SelectItem>
//                       <SelectItem value="insurance">Insurance</SelectItem>
//                       <SelectItem value="registration">Registration</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="expense-notes">Notes</Label>
//                   <Textarea id="expense-notes" placeholder="Add any additional details here" />
//                 </div>
//               </div> */}

//               <NewExpense onAddExpense={handleAddExpense} />

//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-3">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
//             <Receipt className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//             {totalExpenses.toFixed(2)}
//             </div>
//             <p className="text-xs text-muted-foreground">This month</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Fuel Expenses</CardTitle>
//             <Receipt className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$185.25</div>
//             <p className="text-xs text-muted-foreground">52% of total</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
//             <Receipt className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$120.99</div>
//             <p className="text-xs text-muted-foreground">34% of total</p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="space-y-4">
//         {expenses.map((expense) => (
//           <Card key={expense.id} className="overflow-hidden">
//             <CardHeader className="pb-3">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <CardTitle className="text-lg">{expense.description}</CardTitle>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
//                     <Calendar className="h-3.5 w-3.5" />
//                     <span>{expense.date}</span>
//                   </div>
//                 </div>
//                 <Badge variant="outline">{expense.category}</Badge>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col sm:flex-row justify-between gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">{expense.notes}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium">Amount</p>
//                   <p className="text-lg font-bold">${expense.amount}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

// // const allExpenses = [
// //   {
// //     id: 1,
// //     description: "Gas Station Fill-up",
// //     date: "March 28, 2025",
// //     amount: "45.75",
// //     category: "Fuel",
// //     notes: "Full tank at Shell station on Main St.",
// //   },
// //   {
// //     id: 2,
// //     description: "Oil Change Service",
// //     date: "March 26, 2025",
// //     amount: "65.99",
// //     category: "Maintenance",
// //     notes: "Regular maintenance at Quick Lube.",
// //   },
// //   {
// //     id: 3,
// //     description: "Parking Downtown",
// //     date: "March 25, 2025",
// //     amount: "12.50",
// //     category: "Parking",
// //     notes: "Parking for client meeting at City Center.",
// //   },
// //   {
// //     id: 4,
// //     description: "Highway Tolls",
// //     date: "March 23, 2025",
// //     amount: "8.75",
// //     category: "Tolls",
// //     notes: "Round trip on I-95.",
// //   },
// //   {
// //     id: 5,
// //     description: "Car Wash",
// //     date: "March 21, 2025",
// //     amount: "15.00",
// //     category: "Maintenance",
// //     notes: "Deluxe wash with wax.",
// //   },
// // ]
