"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { CldImage } from "next-cloudinary";

interface ProductCardProps {
  name: string;
  category: string;
  price: string;
  public_id: string;
}

const ProductCard = ({ name,category, price, public_id }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); /* ADDED: modal open state */


  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (cart[public_id]) {
      setQuantity(cart[public_id].quantity);
    }else {
      setQuantity(0);
    }
  }, [public_id]);

  const saveToCart = (qty: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    if (qty <= 0) {
      delete cart[public_id]; 
    } else {
      cart[public_id] = {
        name,
        category,
        price,
        quantity: qty,
      };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  
    try { window.dispatchEvent(new CustomEvent('cart:change', { detail: { total: Object.values(cart).reduce((s:any, it:any) => s + (it.quantity || 0), 0) } })); } catch (e) { /* ADDED */ }
  };

  const increase = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    saveToCart(newQty);
  };

  const decrease = () => {
    if (quantity === 0) return;
    const newQty = quantity - 1;
    setQuantity(newQty);
    saveToCart(newQty);
  };

  return (
    <>
    <Card className="flex flex-col items-center rounded-xl border ">
      <CardHeader className="p-0"> 
        <div className="w-full h-100 flex justify-between  items-center  border rounded-xl"> 
          <CldImage
            src={public_id}
            width={500}
            height={400}
            crop="fill"
            gravity="auto"
            alt={name}
            className="object-contain" 
          />
        </div>
      </CardHeader>

      <CardBody className="w-full bg-gray-50 px-4 py-3">
        <div className="w-full flex items-center justify-between">

          <div className="flex flex-col"> 
            <h3 className="font-semibold text-lg text-gray-900 tracking-tight leading-tight">{name}</h3> 
            <p className="font-bold text-xl "
         style={{ fontFamily: "Inter, sans-serif" }}>$ {price}</p> 
            
          </div> 

          <div className="ml-4 flex items-center gap-2">
              <p className="font-bold text-2xl">+</p>
            <button onClick={increase} onClickCapture={() => setIsModalOpen(true)} aria-label="Añadir al carrito"
            className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-white" > 
              <img src="/buy-bag.svg" alt="add" className="w-35 h-20 cursor-pointer transition-transform duration-300 hover:scale-150 w-6 h-6 opacity-90" />

            {quantity > 0 && (
          <span className="absolute top-2 left-80  -right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
            {quantity}
          </span>
        )}
            </button> 
          </div> 
        </div> 
      </CardBody>
    </Card>

    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

        <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 animate-fadeIn z-10">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Elige cantidad</h3>

          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={decrease}
              className="w-10 h-10 flex items-center justify-center text-black rounded-full text-2xl font-bold shadow-md cursor-pointer"
            >
              −
            </button>

            <span className="text-2xl font-semibold text-gray-900 border rounded-md px-1 py-1 w-26 p-1 text-center">{quantity}</span>

            <button
              onClick={increase}
              className="w-10 h-10 flex items-center justify-center text-black rounded-full text-2xl font-bold shadow-md cursor-pointer"
            >
              +
            </button>
          </div>

          <div className="mt-6 text-center">
            <button onClick={() => setIsModalOpen(false)} className="mt-6 w-full bg-gray-400 text-white py-3 rounded-xl font-bold 
            shadow-md hover:bg-gray-500 transition flex items-center justify-center gap-3 cursor-pointer">
            <span className="text-lg">Agregar</span>
            <span className="text-2xl">🛒</span>
              
            </button>
          </div>
        </div>
      </div>
    )}

    </>
  );
};

export default ProductCard;
