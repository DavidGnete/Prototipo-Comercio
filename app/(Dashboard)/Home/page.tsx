"use client"
import Products from "@/components/PubliCard";

export default function Home () {
  return (
    <div>
    <section id="inicio" className="relative min-h-[600px] flex items-center justify-center bg-green-400">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/supermercado.jpg"
          alt="Hero background"
          className="w-full h-full object-cover opacity-80"
        />
      
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground ">
            Descubre la Excelencia en Cada Producto
          </h1>
          <button
            onClick={() => {
              const element = document.getElementById("productos");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-primary-foreground  rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl bg-orange-500">
            Ver Productos
          </button>
        </div>
      </div>
    </section>
      <Products />
    </div>
  );
};

