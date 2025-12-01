import { Suspense } from "react";
import Home from "./page";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Home />
    </Suspense>
  );
}
