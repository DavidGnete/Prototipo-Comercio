"use client"
import Link from "next/link";
import Navbar from "./Navbar";

export default function Links(){
  return(
    <body className="flex flex-col">
      <header className="bg-green-300 text-blanck font-sold shadow-md rounded-md">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="flex gap-4">
          <svg className="w-8 text-deep-purple-accent-400 text-black" viewBox="0 0 24 24" strokeLinejoin="round" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" stroke="currentColor" fill="none">
          <rect x="3" y="1" width="7" height="12"></rect>
          <rect x="3" y="17" width="7" height="6"></rect>
          <rect x="14" y="1" width="7" height="6"></rect>
          <rect x="14" y="11" width="7" height="12"></rect>
        </svg>
          <h1 className="text-2xl font-bold tracking-wide">Tienda</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/Home" className="hover:text-gray-300 transition-colors font-bold">Inicio</Link>       
            <Link href="/contact" className="hover:text-gray-200 transition-colors font-bold">Contact</Link>  
            <Navbar />     
          </div>
        </nav>
      </header>
    </body>
  )
}