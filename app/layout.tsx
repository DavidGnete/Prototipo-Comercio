import { Metadata } from "next";
import Link from "next/link";
import './globals.css';
import Footer from "./components/footer";
import Links from "./components/links";


export const metadata:Metadata = {
  title: "layout y template",
  description: "Demo layaout y templates"
}

interface RootLayoutprops {
  children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutprops){
  return(
  <html lang="es">
    <body className="flex flex-col min-h-screen">
      <Links />
      <main className="flex-1 bg-gray-50 text-black">
        {children}
      </main>
        <Footer />
    </body>
  </html>
  )
}
