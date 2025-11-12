import {Button, ButtonGroup} from "@heroui/button";
import { MessageCircle } from "lucide-react";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { StaticImageData } from "next/image";
interface ProductCardProps {
  name: string;
  price: string;
  image: string | StaticImageData;
  whatsappNumber?: string;
}

const ProductCard = ({
  name,
  price,
  image,
  whatsappNumber = "3108006524",
}: ProductCardProps) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola, estoy interesado en: ${name} - ${price}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <Card
      isPressable
      shadow="md"
      className="flex flex-col items-center justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-gray-100 border border-gray-300 rounded-xl w-full"
    >
      <CardHeader className="flex justify-center items-center ">
        <Image
          src={image}
          alt={name}
          className="w-full h-100 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </CardHeader>

      <CardBody className="flex flex-col gap-2 px-4 py-3 bg-gray-50 w-full text-center  bg-gray-100">
        <h3 className="font-semibold text-lg text-black">{name}</h3>
        <p className="text-2xl font-bold text-green-600">{price}</p>
      </CardBody>

      <CardFooter className="w-50 bg-green-500 rounded-full m-5">
        <Button
          color="success"
          variant="flat"
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md 
               hover:bg-green-600 hover:shadow-xl hover:scale-105 
               active:scale-95 active:shadow-sm transition-all duration-150 cursor-pointer"
          onClick={handleWhatsAppClick}>
          <FaWhatsapp className="size-8"/>
          Reserva por WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
