"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { CldImage } from "next-cloudinary";

interface ProductCardProps {
  name: string;
  price: string;
  public_id: string;
}

const ProductCard = ({ name, price, public_id }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);

  // Sincroniza cantidad desde localStorage al montar
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
      delete cart[public_id]; // elimina del carrito si cantidad 0
    } else {
      cart[public_id] = {
        name,
        price,
        quantity: qty,
      };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
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
    <Card className="flex flex-col items-center bg-gray-100 border rounded-xl">
      <CardHeader className="flex justify-center items-center">
        <CldImage
          src={public_id}
          width={500}
          height={300}
          crop="fill"
          gravity="auto"
          alt={name}
        />
      </CardHeader>

      <CardBody className="text-center bg-gray-50 w-full">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-2xl font-bold text-green-600">{price}</p>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={decrease}
            className="px-3 py-2 bg-red-300 rounded-md font-bold"
          >
            −
          </button>

          <span className="text-xl font-bold">{quantity}</span>

          <button
            onClick={increase}
            className="px-3 py-2 bg-green-300 rounded-md font-bold"
          >
            +
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
