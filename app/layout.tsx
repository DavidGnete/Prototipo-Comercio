// app/layout.tsx
import "./globals.css"; // ✅ Import your Tailwind/global styles here
import type { Metadata } from "next";
import SesionProvider from "./proviers";

export const metadata: Metadata = {
  title: "My App",
  description: "Auth and Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SesionProvider>
      <body>
      {children}
      </body>
      </SesionProvider>
  </html>
  );
}
