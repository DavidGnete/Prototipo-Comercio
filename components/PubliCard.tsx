"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./productCard";
import { Button } from "@heroui/button";
import { FaWhatsapp } from "react-icons/fa";
import handleWhatsAppClick from "./whattsap";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get("category") || "";


  useEffect(() => {
    const loadProducts = async () => {
      const url = new URL(`/api/products?page=${page}&limit=8`, location.origin); /* ADDED: request 12 items per page (4 cols x 3 rows) */
      if (selectedCategory) url.searchParams.set("category", selectedCategory);

      const res = await fetch(url.toString());
      const data = await res.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
      setTotalPages(data.totalPages);
    };

    loadProducts();
  }, [page, selectedCategory]);


  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  return (
    <section id="productos" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Nuestros Productos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"> 
          {products.map((product: any) => (
            <ProductCard
              key={product._id}
              public_id={product.public_id}
              name={product.name}
              category ={product.category?.name || product.category}
              price={product.price}
            />
          ))}
        </div>

        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg text-lg font-medium shadow-sm hover:bg-gray-400 disabled:opacity-50 disabled:hover:bg-gray-300 transition cursor-pointer"
          >
            Anterior
          </button>
          <span className="px-3 py-1 font-bold">{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg text-lg font-medium shadow-sm hover:bg-gray-400 disabled:opacity-50 disabled:hover:bg-gray-300 transition cursor-pointer"
          >
            Siguiente
          </button>
        </div>
{/* 
        <div className="flex justify-center mt-6">
          <Button
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md"
            onClick={() => handleWhatsAppClick("+573147754339")}
          >
            <FaWhatsapp className="mr-2" /> Enviar Pedido
          </Button>
        </div> */}
      </div>
    </section>
  );
}
