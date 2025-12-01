"use client";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Button } from "@heroui/button";
import handleWhatsAppClick from "./whattsap";

interface Props { whatsappNumber: string }

export default function ContactActions({ whatsappNumber }: Props) {
  // guard: ensure we are in the browser
  const openUrl = (url: string) => {
    if (typeof window === 'undefined') return;
    window.open(url, "_blank");
  };

  return (
    <>
      <h3 className="font mb-4">Síguenos en Redes</h3>
      <div className="flex gap-4">
        <Button
          variant="solid"
          size="sm"
          className="rounded-full"
          onClick={() => openUrl("https://instagram.com")}
        >
          <FaInstagram className="w-5 h-5" color="#E1306C" />
        </Button>

        <Button
          variant="solid"
          size="md"
          className="rounded-full"
          onClick={() => openUrl("https://facebook.com")}
        >
          <FaFacebook className=" w-5 h-5" color="#1877F2" />
        </Button>
      </div>

      <div className="bg-green-400 rounded-md text-white bg-green-500 rounded-lg shadow-md 
               hover:bg-green-600 hover:shadow-xl hover:scale-105 
               active:scale-95 active:shadow-sm transition-all duration-150 cursor-pointer mt-4">
        <Button
          variant="solid"
          size="md"
          className="w-full"
          onClick={() => handleWhatsAppClick(whatsappNumber)}
        >
          <span className="mr-2">📞</span>
          Escríbenos por WhatsApp
        </Button>
      </div>
    </>
  );
}
