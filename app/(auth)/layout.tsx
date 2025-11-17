import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "layout y template",
  description: "Demo layout y templates",
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex-1 bg-gray-50 text-black">
      {children}
    </div>
  );
}

