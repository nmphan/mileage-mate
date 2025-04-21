
"use client";
import { useState } from "react";

export default function NewExpense({ onAddExpense, onClose }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: crypto.randomUUID(),
      category,
      amount,
      date,
      description,
    };
    onAddExpense(newExpense);
    setCategory("");
    setAmount("");
    setDate("");
    setDescription("");
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Amount ($)
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
            className="block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
            placeholder="0.00"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
            placeholder="e.g. Fuel, Maintenance"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border"
            placeholder="Description of the expense"
          ></textarea>
        </div>
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
          Add Expense
        </button>
      </div>
    </form>
  );
}
