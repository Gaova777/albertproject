export const WHATSAPP_NUMBER = "573137314694";

export const buildWhatsappLink = (
  message = "Hola, quisiera información sobre los buzos de UrbanSwag."
): string => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const whatsappForProduct = (productName: string): string =>
  buildWhatsappLink(
    `Hola, me interesa el ${productName}. ¿Podrías darme más información sobre tallas, colores y disponibilidad?`
  );
