export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  marca: string;
  color: string;
  tallas: string[];
  descripcion: string;
  imagenes: string[];
}

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "New Era 59FIFTY Yankees Paisley",
    precio: 120.0,
    marca: "New Era",
    color: "Negro/Blanco",
    tallas: ["7", "7 1/8", "7 1/4", "7 3/8"],
    descripcion:
      "Gorra ajustada edición especial con bordado Paisley bandana en la visera y logo clásico de los NY Yankees.",
    imagenes: ["/gorra-59fifty-mlb-new-york-yankees-paisley-embroidery-negro-14952264.jpg"],
  },
  {
    id: 2,
    nombre: "New Era 59FIFTY Yankees Classic Blue",
    precio: 95.0,
    marca: "New Era",
    color: "Azul Rey",
    tallas: ["7 1/8", "7 1/4", "7 1/2"],
    descripcion:
      "La gorra oficial on-field de los New York Yankees en su característico color azul marino. Un clásico que no pasa de moda.",
    imagenes: ["/Gorra-New-York-Yankees-MLB-59Fifty-Blue.jpg"],
  },
  {
    id: 3,
    nombre: "Urban Streetwear Cap - Minimalist",
    precio: 65.0,
    marca: "Street Kings",
    color: "Variado",
    tallas: ["Ajustable"],
    descripcion:
      "Diseño minimalista para el día a día. Cierre tipo snapback para un ajuste perfecto en cualquier tamaño.",
    imagenes: ["/images.jpeg"],
  },
  {
    id: 4,
    nombre: "Retro Snapback Series",
    precio: 72.0,
    marca: "Vintage Apparel",
    color: "Multicolor",
    tallas: ["Ajustable"],
    descripcion:
      "Gorra estilo retro con corona alta y visera plana. Materiales premium transpirables.",
    imagenes: ["/images (1).jpeg"],
  },
  {
    id: 5,
    nombre: "Scissor Premium Graphic Cap",
    precio: 85.0,
    marca: "Scissor",
    color: "Negro/Gris",
    tallas: ["M", "L"],
    descripcion:
      "Edición limitada con gráfico exclusivo. Construcción de 6 paneles y ojales bordados para mayor ventilación.",
    imagenes: ["/full_image-2016343004030.webp"],
  },
  {
    id: 6,
    nombre: "Classic Trucker Hat",
    precio: 55.0,
    marca: "Scissor Sucks",
    color: "Malla/Sólido",
    tallas: ["Ajustable"],
    descripcion:
      "La clásica gorra de camionero con malla trasera para mantenerte fresco. Logo frontal en relieve.",
    imagenes: ["/20190614151508608.jpg.webp"],
  },
];
