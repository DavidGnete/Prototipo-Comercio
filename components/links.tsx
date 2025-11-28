"use client"
import Link from "next/link";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure} from "@heroui/modal";
import { Button } from "@heroui/button";
import handleWhatsAppClick from './whattsap';

export default function Links() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isOpen: isOpenModal, onOpen, onOpenChange } = useDisclosure();

  const [cartCount, setCartCount] = useState(0); 

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Load categories when drawer opens for the first time
  useEffect(() => {
    let mounted = true;
    if (!isOpen || categories.length) return;
    setLoading(true);

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        setCategories(data.categories || []);
      })
      .catch((err) => setError("No se pudieron cargar las categorías"))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [isOpen]);


  const computeCartTotal = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '{}');
      return Object.values(cart).reduce((s:any, it:any) => s + (it.quantity || 0), 0);
    } catch { return 0; }
  };

  
  useEffect(() => {
    setCartCount(Number(computeCartTotal()));
    const onCartChange = (e: any) => setCartCount(Number(e?.detail?.total ?? computeCartTotal()));
    const onStorage = () => setCartCount(Number(computeCartTotal()));
    window.addEventListener('cart:change', onCartChange); /* ADDED */
    window.addEventListener('storage', onStorage); /* ADDED */
    return () => {
      window.removeEventListener('cart:change', onCartChange); /* ADDED */
      window.removeEventListener('storage', onStorage); /* ADDED */
    };
  }, []);


  const onSelectCategory = (slug: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (slug) params.set("category", slug);
    else params.delete("category");

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);

    setIsOpen(false);
  };

  // close on escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      
      <main className="bg-white text-black font-sold shadow-md rounded-md">
        {/* <div className="flex "> */}
          <nav className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-white z-50 shadow-md rounded-md w-full">
            <div className="flex gap-4">
              <div className="flex items-center">
              <h3 className="text-xl font-semibold">Categorías</h3>
              <button
                onClick={() => setIsOpen(true)}
                aria-label="Abrir categorias"
                aria-expanded={isOpen}
                className="p-2 rounded hover:bg-gray-100 cursor-pointer"
              >
                
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
              </div>

              <svg
                className="w-8 text-black"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12"></rect>
                <rect x="3" y="17" width="7" height="6"></rect>
                <rect x="14" y="1" width="7" height="6"></rect>
                <rect x="14" y="11" width="7" height="12"></rect>
              </svg>
              
            </div>

            <div className="flex items-center gap-6">
              

              <Link href="/Home" className="hover:text-gray-300 transition-colors font-bold">Inicio</Link>
              <Link href="/contact" className="hover:text-gray-200 transition-colors font-bold">Contactanos</Link>
              <Link href="/media" className="hover:text-gray-200 transition-colors font-bold">configuracion</Link>
            
              <div className="relative">
                <Button aria-label="Ver carrito" onPress={onOpen} className="p-2 rounded-full  cursor-pointer text-3xl transition-transform duration-300 hover:scale-150 ">🛒/</Button>
        
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full  ">{cartCount}</span>
                )}
              </div>
                <Navbar />
            </div>
          </nav>
        {/* </div> */}
      </main>

      {/* Drawer overlay and panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex ">
          <div className="fixed inset-0 bg-black/50 " onClick={() => setIsOpen(false)} />
          <aside className="fixed left-0 top-0 w-80 h-full bg-white shadow-xl p-6 z-50">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Categorías</h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar"
                className="p-1 rounded hover:bg-gray-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {loading && <div>Cargando categorías...</div>}
            {error && <div className="text-red-500">{error}</div>}

            <ul className="flex flex-col gap-2">
              <li>
                <button
                  onClick={() => onSelectCategory("")}
                  className="text-left w-full py-2 px-3 rounded hover:bg-gray-200 cursor-pointer"
                >
                  Todas
                </button>
              </li>

              {categories.map((cat: any) => (
                <li key={cat._id}>
                  <button
                    onClick={() => onSelectCategory(cat.slug)}
                    className="text-left w-full py-2 px-3 rounded hover:bg-gray-200 cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}

      {/* Cart modal (opened by the cart button) - minimal and non-invasive */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => onOpenChange()} />

          <div className="relative bg-white rounded-lg p-6 z-10 w-full max-w-xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Carrito</h3>
              <button onClick={() => onOpenChange()} className="p-1 rounded hover:bg-gray-100">✕</button>
            </div>

            <div className="space-y-3 max-h-72 overflow-auto">

              {(() => {
                try {
                  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
                  const keys = Object.keys(cart);
                  if (!keys.length) return <div className="text-center text-sm text-gray-500">Tu carrito está vacío</div>;
                  return (
                    <ul className="space-y-2">
                      {keys.map((k) => (
                        <li key={k} className="flex justify-between items-center p-2 border rounded">
                          <div>
                            <div className="font-medium">{cart[k].name}</div>
                            <div className="text-xs text-gray-500">{cart[k].category}</div>
                          </div>
                          <div className="font-semibold">{cart[k].quantity} × ${cart[k].price}</div>
                        </li>
                      ))}
                    </ul>
                  );
                } catch { return <div className="text-center text-sm text-gray-500">Carrito inválido</div>; }
              })()}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Button
                onPress={() => handleWhatsAppClick('+573147754339')}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                aria-label="Comprar via WhatsApp"
              >
                Comprar
              </Button>

              <Button onPress={() => onOpenChange()} className="bg-indigo-600 text-white cursor-pointer">Cerrar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
