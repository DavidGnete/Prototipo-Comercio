"use client";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    loadProducts();
  }, []);

  return (
    <section id="productos" className="py-16 md:py-24 ">
      <div className="container mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Nuestros Productos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product: any) => (
            <ProductCard
              key={product._id}
              public_id={product.image_url} // OJO: ahora es la URL de Cloudinary
              name={product.name}
              price={product.price}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
