"use client";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { Button } from "@heroui/button";
import { FaWhatsapp } from "react-icons/fa";
import handleWhatsAppClick from "./whattsap";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetch(`/api/products?page=${page}&limit=6`);
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    };

    loadProducts();
  }, [page]);

  return (
    <section id="productos" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Nuestros Productos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product: any) => (
            <ProductCard
              key={product._id}
              public_id={product.public_id}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1">{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>

        {/* Botón WhatsApp */}
        <div className="flex justify-center mt-6">
          <Button
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md"
            onClick={() => handleWhatsAppClick("+573147754339")}
          >
            <FaWhatsapp className="mr-2" /> Enviar Pedido
          </Button>
        </div>
      </div>
    </section>
  );
}
