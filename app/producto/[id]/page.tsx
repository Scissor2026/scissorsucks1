"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  marca: string;
  color: string;
  tallas: string[];
  descripcion: string;
  imagenes: string[];
}

const productos: Producto[] = [
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

interface ProductoPageProps {
  params: {
    id: string;
  };
}

export default function ProductoPage({ params }: ProductoPageProps) {
  const producto = productos.find((p) => String(p.id) === String(params?.id));
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [imagenIndex, setImagenIndex] = useState(0);

  useEffect(() => {
    const stored = window.localStorage.getItem("favoritos");
    if (stored) {
      try {
        setFavoritos(JSON.parse(stored));
      } catch {
        setFavoritos([]);
      }
    }
  }, []);

  if (!producto) {
    return (
      <main className="min-h-screen bg-white text-black px-4 py-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-base text-neutral-700">Producto no encontrado.</p>
          <Link href="/" className="mt-4 inline-flex rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800">
            Volver a la tienda
          </Link>
        </div>
      </main>
    );
  }

  const imagenes = producto.imagenes;
  const activo = favoritos.includes(producto.id.toString());

  const toggleFavorito = (event: React.MouseEvent<HTMLButtonElement>, productId: string) => {
    event.preventDefault();
    event.stopPropagation();

    setFavoritos((prev) => {
      const next = prev.includes(productId) ? prev.filter((item) => item !== productId) : [...prev, productId];
      window.localStorage.setItem("favoritos", JSON.stringify(next));
      return next;
    });
  };

  const handlePrevImage = () => {
    setImagenIndex((current) => (current === 0 ? imagenes.length - 1 : current - 1));
  };

  const handleNextImage = () => {
    setImagenIndex((current) => (current === imagenes.length - 1 ? 0 : current + 1));
  };

  return (
    <main className="min-h-screen bg-white text-black px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link href="/" className="text-sm font-medium text-neutral-600 transition hover:text-black">
          ← Volver a la tienda
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-100">
            <img
              src={imagenes[imagenIndex]}
              alt={`${producto.nombre} - imagen ${imagenIndex + 1}`}
              className="h-[520px] w-full object-cover"
            />

            <button
              type="button"
              onClick={(event) => toggleFavorito(event, producto.id.toString())}
              className="absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-sm ring-1 ring-neutral-200 transition hover:bg-neutral-100"
              aria-pressed={activo}
              aria-label={activo ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className={`w-6 h-6 transition-all ${
                  activo ? "fill-pink-500 stroke-pink-500" : "fill-transparent stroke-gray-900"
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-black shadow-sm ring-1 ring-neutral-200 transition hover:bg-white"
              aria-label="Ver imagen anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-black shadow-sm ring-1 ring-neutral-200 transition hover:bg-white"
              aria-label="Ver siguiente imagen"
            >
              →
            </button>
          </div>

          <div className="space-y-6 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{producto.marca}</p>
              <h1 className="text-3xl font-bold text-black">{producto.nombre}</h1>
              <p className="text-sm text-neutral-500">Gorra premium</p>
              <p className="text-3xl font-semibold text-black">S/ {producto.precio.toFixed(2)}</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-neutral-900">Descripción</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{producto.descripcion}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Color</p>
                  <p className="mt-1 text-sm text-neutral-600">{producto.color}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Tallas</p>
                  <p className="mt-1 text-sm text-neutral-600">{producto.tallas.join(", ")}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Código</p>
                  <p className="mt-1 text-sm text-neutral-600">{producto.id}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <a
                  href="https://wa.me/51982846339"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-3xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/madebyzeviq?igsh=dDY4a3UwdGk1bjN3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:from-purple-600 hover:to-pink-600"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
