import { db } from "../_utils/firebase";
import { doc, collection, getDoc, getDocs, setDoc, addDoc, query, docRef, docSnap } from "firebase/firestore";

export async function getTrips(userId) {
    try {
      const docRef = collection(db, "users", userId, "trips");
      
      const docSnap = await getDocs(docRef);
      
      const items = docSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return items;

    } catch (error) {
      console.error("Error getting trips: ", error);
      throw error;
    }
  }
  
  export async function addTrip(userId, trip) {
    try {
      const itemsRef = collection(db, "users", userId, "trips");
      
      const docRef = await addDoc(itemsRef, trip);
      
      return docRef.id;
    } catch (error) {
      console.error("Error adding trip: ", error);
      throw error;
    }
  }

  export async function loadTrips(userId, setTrips) {
    try {
      const trips = await getTrips(userId);
      setTrips(trips);
    } catch (error) {
      console.error("Load failed:", error);
      setTrips([]);
    }
  }