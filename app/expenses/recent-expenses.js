import { Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { loadExpenses } from "../_services/expenses-service";

export function RecentExpenses() {
  const [expenses, setExpenses] = useState([]);
  const { user } = useUserAuth();

  useEffect(() => {
    if (user?.uid) {
      loadExpenses(user.uid, setExpenses);
    }
  }, [user?.uid]);

  return (
    <div className="rounded-lg bg-gradient-to-b from-gray-800 to-gray-700 shadow-sm">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Recent Expenses</h2>
          <p className="text-sm text-gray-400">Your latest recorded expenses</p>
        </div>
        
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div 
              key={expense.id} 
              className="flex items-center justify-between border-b border-gray-600 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full p-2 bg-red-100">
                  <Receipt className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-300">{expense.description}</h4>
                  <p className="text-sm text-gray-400">{expense.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-300">${expense.amount}</div>
                <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-400">
                  {expense.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}