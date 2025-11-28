import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import styles from "../style/layout.module.css"

export const metadata: Metadata = {
  title: "layout y template",
  description: "Demo layout y templates",
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}

