"use client";

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full">
      <div className="w-full h-[2px] bg-gray-300 mt-2"></div>

      {/* VIDEO */}
      <div className="w-full">
        <video
          className="w-full h-[210px] object-cover object-[80%_20%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/video/tienda.mp4" type="video/mp4" />
        </video>

        {/* Línea separadora */}
        <div className="w-full h-[2px] bg-gray-300 mt-2"></div>
      </div>

      {/* IMAGEN + TEXTO CENTRADO */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <img
          src="/images/supermercado.jpg"
          alt="Hero background"
          className="w-full h-full object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />

        {/* TEXTO CENTRADO DENTRO DE LA IMAGEN */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-9">
              Descubre la Excelencia en Cada Producto
            </h1>
            <button
              onClick={() => {
                const element = document.getElementById("productos");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-orange-500 hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              Ver Productos
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-300 mt-2"></div>
    </section>
  );
}
