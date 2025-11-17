import {Button, ButtonGroup} from "@heroui/button";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { CldImage } from 'next-cloudinary';
import { FaWhatsapp } from "react-icons/fa";


interface ProductCardProps {
  name: string;
  price: string;
  public_id: string;
  whatsappNumber?: string;
}

const ProductCard = ({
  name,
  price,
  public_id,
  whatsappNumber = "3108006524",
}: ProductCardProps) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola, estoy interesado en: ${name} - ${price}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <Card
      className="flex flex-col items-center justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-gray-100 border border-gray-300 rounded-xl w-full"
    >
      <CardHeader className="flex justify-center items-center ">
        <CldImage
          src={public_id}
          width={500}
          height={200}
          crop="fill"
          gravity="auto"
          alt={name}
        />
      </CardHeader>

     { <CardBody className="flex flex-col gap-2 px-4 py-3 bg-gray-50 w-full text-center  bg-gray-100">
        <h3 className="font-semibold text-lg text-black">{name}</h3>
        <p className="text-2xl font-bold text-green-600">{price}</p>
      </CardBody>}

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
