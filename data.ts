export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  marca: string;
  precio: string;
  estilo: string;
  descripcion: string;
  caracteristicas: string[];
  material: string;
  color: string;
  imagenes: string[];
  modelo3d?: string;
  reseñas: { nombre: string; estrellas: number; comentario: string; fecha: string }[];
}

export const productos: Producto[] = [
  {
    id: "scissor-classic-black",
    slug: "scissor-classic-black",
    nombre: "Scissor Classic Black",
    marca: "SCISSOR SUCKS",
    precio: "S/ 65.00",
    estilo: "Streetwear",
    descripcion: "Gorra urbana de visera curva con el bordado exclusivo de nuestra marca.",
    caracteristicas: ["Bordado de alta densidad", "Cierre ajustable", "Edición limitada"],
    material: "100% Algodón",
    color: "Negro",
    imagenes: ["/images/gorra-1.jpg"],
    reseñas: []
  }
];