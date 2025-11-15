/* import ProductCard from "./ProductCard"; */
import ProductCard from "./productCard";
import product1 from "../public/images/product1.jpg";
import product2 from  "../public/images/product2.jpg"
import product3 from  "../public/images/product3.jpg"
import product4 from  "../public/images/product4.jpg"
import product5 from  "../public/images/product4.jpg"
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Producto Premium 1",
    price: "$99.99",
    image: product1,
  },
  {
    id: 2,
    name: "Producto Destacado 2",
    price: "$149.99",
    image: product2,
  },
  {
    id: 3,
    name: "Producto Especial 3",
    price: "$79.99",
    image: product3,
  },
  {
    id: 4,
    name: "Producto Elite 4",
    price: "$199.99",
    image: product4,
  },
  {
    id: 5,
    name: "Producto Exclusivo 5",
    price: "$129.99",
    image: product5,
  },
];

const Products = () => {
  return (
    <section id="productos" className="py-16 md:py-24 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold  mb-4 ">
            Nuestros Productos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center text-xl">
            Explora nuestra selección de productos de alta calidad. Cada artículo está 
            cuidadosamente seleccionado para ofrecerte lo mejor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;