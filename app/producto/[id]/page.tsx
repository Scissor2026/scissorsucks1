"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { productos } from "../../../lib/data";

interface ProductoPageProps {
  params: {
    id: string;
  };
}

export default function ProductoPage({ params }: ProductoPageProps) {
  const { id } = params;
  const producto = productos.find((item) => item.id === id);
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

  const imagenes = producto.imagenes.length > 0 ? producto.imagenes : [producto.imagen];
  const activo = favoritos.includes(producto.id);

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
              onClick={(event) => toggleFavorito(event, producto.id)}
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
              <p className="text-sm text-neutral-500">{producto.estilo}</p>
              <p className="text-3xl font-semibold text-black">{producto.precio}</p>
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
                  <p className="text-sm font-semibold text-neutral-900">Material</p>
                  <p className="mt-1 text-sm text-neutral-600">{producto.material}</p>
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

              <div>
                <p className="text-sm font-semibold text-neutral-900">Características</p>
                <div className="mt-3 grid gap-2">
                  {producto.caracteristicas.map((caracteristica) => (
                    <span key={caracteristica} className="inline-flex rounded-2xl bg-neutral-100 px-3 py-2 text-sm text-neutral-600">
                      {caracteristica}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
