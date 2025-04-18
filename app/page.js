"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { DashboardView } from "@/app/components/dashboard-view"
// import { TripsView } from "@/app/trips/trips-view"
// import { ExpensesView } from "@/app/expenses/expenses-view"


// Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";
import Image from "next/image";
import Login from "./components/login";


export default function Home() {
    // Use the useUserAuth hook to get the user object and the login and logout functions
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    // Async function to handle sign-in
    const handleSignIn = async () => {
      try {
        await gitHubSignIn();
      } catch (error) {
        console.error("Error signing in:", error);
      }
    };
  
    // Async function to handle sign-out
    const handleSignOut = async () => {
      try {
        await firebaseSignOut();
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-6">
      {user ? (
        <div>
          <p>{`Signed in as ${user.displayName} (${user.email})`}</p>

          <button onClick={firebaseSignOut}>Sign Out</button>

                
        <h1 className="text-2xl font-bold mb-6">Millage Mate</h1>

        <Tabs defaultValue="dashboard" className="w-full">
          {/* <TabsList className="grid grid-cols-3 mb-8 w-full">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="trips">Trips</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList> */}

          <TabsContent value="dashboard">
            <DashboardView />
          </TabsContent>

          {/* <TabsContent value="trips">
            <TripsView />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpensesView />
          </TabsContent> */}
        </Tabs>
        </div>
      ) : (
        // <Login />
        // <button onClick={gitHubSignIn}>Sign In with GitHub</button>
         <div className="relative h-screen">
              {/* Full-screen background image */}
              <div className="fixed inset-0">
                <Image
                  src="/bg-image.jpg"
                  alt="Background"
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                />
                <div className="absolute inset-0 bg-black/30"></div> {/* Overlay for better text visibility */}
              </div>
        
              {/* Sign-in button at top right */}
              <div className="absolute top-4 right-4">
                <button className="bg-black hover:bg-white hover:text-black text-white px-4 py-2 rounded-md transition-colors" onClick={gitHubSignIn}>
                  Sign in with GitHub
                </button>
              </div>
        
              {/* Centered content */}
              <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                  Welcome to Millage Mate
                </h1>
                <p className="text-xl md:text-2xl text-white max-w-2xl mb-8 drop-shadow-lg italic">
                  The journey of a thousand miles begins with a single step
                </p>
              </div>
            </div>
      )}

      {/* {user ? (
        <p>
          <Link href="/week-10/shopping-list">
            Continue to your Shopping List
          </Link>
        </p>
      ) : (
        <p></p>
      )} */}

      </main>
    </div>
  )
}

