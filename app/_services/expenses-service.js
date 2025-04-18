import { db } from "../_utils/firebase";
import { doc, collection, getDoc, getDocs, setDoc, addDoc, query, docRef, docSnap } from "firebase/firestore";

export async function getExpenses(userId) {
    try {
      const docRef = collection(db, "users", userId, "expenses");
      
      const docSnap = await getDocs(docRef);
      
      const items = docSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return items;

    } catch (error) {
      console.error("Error getting expenses: ", error);
      throw error;
    }
  }
  
  export async function addExpense(userId, expense) {
    try {
      const itemsRef = collection(db, "users", userId, "expenses");
      
      const docRef = await addDoc(itemsRef, expense);
      
      return docRef.id;
    } catch (error) {
      console.error("Error adding expense: ", error);
      throw error;
    }
  }

  export async function loadExpenses(userId, setExpenses) {
    try {
      const expenses = await getExpenses(userId);
      setExpenses(expenses);
    } catch (error) {
      console.error("Load failed:", error);
      setExpenses([]);
    }
  }