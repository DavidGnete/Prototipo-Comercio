"use client";

export default function handleWhatsAppClick(whatsappNumber: string) {
  if (typeof window === 'undefined') return;
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");

  // Filtramos solo los productos con quantity > 0
  const filteredCart = Object.fromEntries(
    Object.entries(cart).filter(([key, item]: [string, any]) => item.quantity > 0)
  );

  let message = "Hola, quiero hacer un pedido:\n\n";

  for (const id in filteredCart) {
    const item = filteredCart[id] as {name:string; quantity:number};
    message += `- ${item.name}: ${item.quantity} unidad(es)\n`;
  }

  if (Object.keys(filteredCart).length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const encoded = encodeURIComponent(message);
  if (typeof window !== 'undefined') {
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  }

  // Limpiamos el carrito después de enviar
  try {
    localStorage.removeItem("cart");
  } catch {}
}
