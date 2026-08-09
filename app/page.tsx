"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { productos } from "../lib/data";

export default function Home() {
  const [favoritos, setFavoritos] = useState<string[]>([]);

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

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      window.localStorage.setItem("favoritos", JSON.stringify(next));
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-white text-black px-3 py-4">
      <section className="grid grid-cols-2 gap-3">
        {productos.map((producto) => {
          const productId = producto.id.toString();
          const activo = favoritos.includes(productId);
          const imageUrl = producto.imagenes[0] ?? "";

          return (
            <Link key={producto.id} href={`/producto/${producto.id.toString()}`} className="space-y-3">
              <article className="space-y-3">
                <div className="aspect-square bg-neutral-100 rounded-lg relative overflow-hidden border border-neutral-200">
                  <img
                    src={imageUrl}
                    alt={producto.nombre}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorito(productId);
                    }}
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
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-neutral-500 bg-white/70">
                    [SCISSOR SUCKS]
                  </div>
                </div>
                <div className="px-1">
                  <p className="text-sm font-semibold text-black">{producto.nombre}</p>
                  <p className="text-xs text-neutral-500">{producto.marca}</p>
                  <p className="text-sm font-semibold text-black">S/ {producto.precio.toFixed(2)}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
