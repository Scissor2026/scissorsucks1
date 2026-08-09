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
  tallas: string[];
  imagen: string;
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
    tallas: ["S", "M", "L"],
    imagen: "/logo.png",
    imagenes: ["/logo.png", "/gorra.jpg", "/logo.png"],
    reseñas: []
  },
  {
    id: "scissor-satin-red",
    slug: "scissor-satin-red",
    nombre: "Scissor Satin Red",
    marca: "SCISSOR SUCKS",
    precio: "S/ 72.00",
    estilo: "Retro",
    descripcion: "Gorra de satén con perfil clásico y cierre ajustable.",
    caracteristicas: ["Textura satinada", "Cierre trasero", "Costuras reforzadas"],
    material: "Mezcla de poliéster",
    color: "Rojo",
    tallas: ["S", "M", "L"],
    imagen: "/gorra.jpg",
    imagenes: ["/gorra.jpg", "/logo.png", "/gorra.jpg", "/logo.png"],
    reseñas: []
  },
  {
    id: "scissor-peak-grey",
    slug: "scissor-peak-grey",
    nombre: "Scissor Peak Grey",
    marca: "SCISSOR SUCKS",
    precio: "S/ 68.00",
    estilo: "Minimal",
    descripcion: "Gorra neutra con visera plana y diseño sobrio.",
    caracteristicas: ["Visera plana", "Ajuste suave", "Forro transpirable"],
    material: "100% Algodón",
    color: "Gris",
    tallas: ["S", "M", "L"],
    imagen: "/logo.png",
    imagenes: ["/logo.png", "/IMG_20260809_133253.jpg", "/logo.png"],
    reseñas: []
  },
  {
    id: "scissor-camouflage",
    slug: "scissor-camouflage",
    nombre: "Scissor Camouflage",
    marca: "SCISSOR SUCKS",
    precio: "S/ 75.00",
    estilo: "Military",
    descripcion: "Gorra camuflada con estilo urbano y cierre ajustable.",
    caracteristicas: ["Patrón camuflado", "Cierre ajustable", "Material resistente"],
    material: "Mezcla de algodón",
    color: "Verde camo",
    tallas: ["S", "M", "L"],
    imagen: "/gorra.jpg",
    imagenes: ["/gorra.jpg", "/logo.png", "/gorra.jpg"],
    reseñas: []
  },
  {
    id: "scissor-denim-blue",
    slug: "scissor-denim-blue",
    nombre: "Scissor Denim Blue",
    marca: "SCISSOR SUCKS",
    precio: "S/ 70.00",
    estilo: "Vintage",
    descripcion: "Gorra denim con costuras desgastadas y estilo clásico.",
    caracteristicas: ["Denim lavado", "Ajuste cómodo", "Etiqueta de cuero"],
    material: "100% Denim",
    color: "Azul",
    tallas: ["S", "M", "L"],
    imagen: "/logo.png",
    imagenes: ["/logo.png", "/gorra.jpg", "/logo.png", "/gorra.jpg"],
    reseñas: []
  },
  {
    id: "scissor-white-trucker",
    slug: "scissor-white-trucker",
    nombre: "Scissor White Trucker",
    marca: "SCISSOR SUCKS",
    precio: "S/ 62.00",
    estilo: "Trucker",
    descripcion: "Gorra trucker blanca con frente estructurado y malla trasera.",
    caracteristicas: ["Malla trasera", "Ajuste snapback", "Frente estructurado"],
    material: "Algodón y malla",
    color: "Blanco",
    tallas: ["S", "M", "L"],
    imagen: "/gorra.jpg",
    imagenes: ["/gorra.jpg", "/logo.png", "/gorra.jpg"],
    reseñas: []
  }
];
