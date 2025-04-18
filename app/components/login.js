// "use client";
// import { useUserAuth } from "./_utils/auth-context";
// import Image from "next/image";

// export default function Login() {
//     const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

//     // Async function to handle sign-in
//     const handleSignIn = async () => {
//         try {
//         await gitHubSignIn();
//         } catch (error) {
//         console.error("Error signing in:", error);
//         }
//     };

//   return (
//     <div className="relative h-screen">
//       {/* Full-screen background image */}
//       <div className="fixed inset-0">
//         <Image
//           src="/bg-image.jpg"
//           alt="Background"
//           fill
//           className="object-cover"
//           quality={100}
//           priority
//         />
//         <div className="absolute inset-0 bg-black/30"></div> {/* Overlay for better text visibility */}
//       </div>

//       {/* Sign-in button at top right */}
//       <div className="absolute top-4 right-4">
//         <button className="bg-black hover:bg-white hover:text-black text-white px-4 py-2 rounded-md transition-colors" onClick={gitHubSignIn}>
//           Sign in with GitHub
//         </button>
//       </div>

//       {/* Centered content */}
//       <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
//         <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
//           Welcome to Millage Mate
//         </h1>
//         <p className="text-xl md:text-2xl text-white max-w-2xl mb-8 drop-shadow-lg italic">
//           The journey of a thousand miles begins with a single step
//         </p>
//       </div>
//     </div>
//   );
// }