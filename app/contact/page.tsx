"use client"
import { MapPin, Phone, Mail} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import {Button, ButtonGroup} from "@heroui/button";
import Benefits from "../components/benefit";
import Map from "../components/map";
const Contact = () => {
  const whatsappNumber = "1234567890";
  const address = "Calle Principal #123, Ciudad, País";
  const email = "contacto@minegocio.com";
  const phone = "+1 234 567 890";

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hola, me gustaría obtener más información");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="contacto" className="py-16 md:py-24 flex-col ">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold  mb-4">
              Contáctanos
            </h2>
            <p className="">
              Estamos aquí para ayudarte. Escríbenos por WhatsApp o visítanos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6  flex-shrink-0 mt-1 text-green-600" />
                <div>
                  <h3 className="font-bold  mb-1">Dirección</h3>
                  <p className="text-muted-foreground">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1 text-green-600" />
                <div>
                  <h3 className="font-bold mb-1">Teléfono</h3>
                  <p className="text-muted-foreground">{phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1 text-green-600" />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-muted-foreground">{email}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font mb-4">Síguenos en Redes</h3>
              <div className="flex gap-4">
                <Button
                  variant="solid"
                  size="sm"
                  className="rounded-full"
                  onClick={() => window.open("https://instagram.com", "_blank")}
                >
                  <FaInstagram className="w-5 h-5" color= "#E1306C" />
                </Button>
                <Button
                  variant="solid"
                  size="md"
                  className="rounded-full"
                  onClick={() => window.open("https://facebook.com", "_blank")}
                >
                  <FaFacebook  className=" w-5 h-5" color="#1877F2"  />
                </Button>
              </div>

              <div className="bg-green-400 rounded-md text-white bg-green-500  rounded-lg shadow-md 
               hover:bg-green-600 hover:shadow-xl hover:scale-105 
               active:scale-95 active:shadow-sm transition-all duration-150 cursor-pointer">
                <Button
                  variant="solid"
                  size="md"
                  className="w-full"
                  onClick={handleWhatsAppClick}
                >
                  <Phone className=" h-5 w-5 text-white " />
                  Escríbenos por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Benefits />
      </div>
      <div className="w-full flex-1">
      <Map />
      </div>
    </section>
  );
};

export default Contact;