"use client";

/* import Links from "../../components/links"; */
import dynamic from "next/dynamic";
import Footer from "../../components/footer";

const Links = dynamic(() => import("../../components/links"), { ssr: false });

interface DashboardLayoutprops {
  children: React.ReactNode
}

export default function AuthLayout({children}: DashboardLayoutprops){
  return(
  <div className="flex flex-col min-h-screen" >
      <Links />
      <div className="pt-16"> {/* ensure content is not hidden under fixed header */}
        {children}
      </div>
      <Footer />
  </div>
  )
}
