"use client";
import { DashboardView } from "@/app/components/dashboard-view";
import { useUserAuth } from "./_utils/auth-context";
import Image from "next/image";

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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-700 text-white">
      <main className="container mx-auto px-4 py-6">
        {user ? (
          <div className="flex flex-col min-h-screen px-4">
            <div className="flex flex-row justify-between mb-6">
              <div className="flex flex-row items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="h-15 w-auto mr-4"
                />
                <h1 className="text-2xl uppercase">Mileage Mate</h1>
              </div>
              <div className="text-right">
                <p>Hello, {`${user.displayName}`}</p>
                <button onClick={firebaseSignOut}>Sign Out</button>
              </div>
            </div>

            <DashboardView />
            <p className="text-sm text-gray-300 text-center mt-10">
              Created by Nhat Minh Phan
            </p>
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
              <div className="absolute inset-0 bg-black/30"></div>{" "}
              {/* Overlay for better text visibility */}
            </div>

            {/* Sign-in button at top right */}
            <div className="absolute top-4 right-4">
              <button
                className="bg-black hover:bg-white hover:text-black text-white px-4 py-2 rounded-md transition-colors"
                onClick={gitHubSignIn}
              >
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
      </main>
    </div>
  );
}
