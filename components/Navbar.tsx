"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession(); // <-- Get session here

  return (
    <nav className="flex justify-between p-4">

      {session?.user ? (
        // If user is logged in
        <div className="flex items-center gap-3">
          <p>Hi, {session.user.name}</p>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        // If no user is logged in
        <button
          onClick={() => signIn("google", { callbackUrl: "/Home" })}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Sign In
        </button>
      )}
    </nav>
  );
}
