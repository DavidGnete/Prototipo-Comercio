"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./productCard";
import { Button } from "@heroui/button";
import { FaWhatsapp } from "react-icons/fa";
import handleWhatsAppClick from "./whattsap";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); /* ADDED: loading indicator */
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get("category") || "";


  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true); /* ADDED */
      const url = new URL(`/api/products?page=${page}&limit=8`, location.origin);
      if (selectedCategory) url.searchParams.set("category", selectedCategory);

      try {
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        console.error('Failed to load products', err);
        // keep UI stable: show empty array on failures
        setProducts([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false); /* ADDED */
      }
    };

    loadProducts();
  }, [page, selectedCategory]);

  // Ensure products load automatically on first mount when there is no category selected
  useEffect(() => {
    if (selectedCategory) return; // if user already selected a category, skip initial auto-load
    // If products are already present (e.g., hydrated), do nothing
    if (products.length) return;

    const initLoad = async () => {
      setIsLoading(true); /* ADDED */
      const url = new URL(`/api/products?page=1&limit=8`, location.origin);
      // retry loop: try up to 3 times (503 / network errors) with delay
      const maxAttempts = 3;
      let attempt = 0;
      while (attempt < maxAttempts) {
        try {
          const res = await fetch(url.toString());
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          setProducts(Array.isArray(data.products) ? data.products : []);
          setTotalPages(data.totalPages || 0);
          break; // success
        } catch (err) {
          console.warn('initLoad attempt', attempt + 1, 'failed', err);
          attempt += 1;
          if (attempt >= maxAttempts) {
            // give up and show empty products
            setProducts([]);
            setTotalPages(0);
          } else {
            // wait before retrying
            await new Promise((r) => setTimeout(r, 1000 * attempt));
          }
        }
      }
      setIsLoading(false); /* ADDED */
    };

    initLoad();
  }, []);


  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  return (
    <section id="productos" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Nuestros Productos
        </h2>

        {isLoading ? (
          <div className="py-12 text-center text-gray-500">Cargando productos...</div>
        ) : (
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
        )}

        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 bg-orange-400 text-white rounded-lg text-lg font-medium shadow-sm hover:bg-yellow-500  cursor-pointer"
          >
            Anterior
          </button>
          <span className="px-3 py-1 font-bold">{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 bg-orange-400 text-white rounded-lg text-lg font-medium shadow-sm hover:bg-yellow-500 cursor-pointer"
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
