"use client";

import { useEffect, useState } from "react";
import { productos } from "../data";

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
          const activo = favoritos.includes(producto.id);
          return (
            <article key={producto.id} className="space-y-3">
              <div className="aspect-square bg-neutral-100 rounded-lg relative overflow-hidden border border-neutral-200">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => toggleFavorito(producto.id)}
                  className="absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-sm ring-1 ring-neutral-200 transition hover:bg-neutral-100"
                  aria-pressed={activo}
                  aria-label={activo ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={activo ? "#ec4899" : "transparent"}
                    stroke={activo ? "#ec4899" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M20.8 4.6c-1.3-1.3-3.4-1.3-4.7 0L12 8.7 7.9 4.6c-1.3-1.3-3.4-1.3-4.7 0-1.3 1.3-1.3 3.4 0 4.7l4.6 4.6c.2.2.4.4.7.5.3.2.6.2.9 0 .3-.1.5-.3.7-.5l4.6-4.6c1.3-1.3 1.3-3.4 0-4.7z" />
                  </svg>
                </button>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-neutral-500 bg-white/70">
                  [SCISSOR SUCKS]
                </div>
              </div>
              <div className="px-1">
                <p className="text-sm font-semibold text-black">{producto.nombre}</p>
                <p className="text-xs text-neutral-500">{producto.estilo}</p>
                <p className="text-sm font-semibold text-black">{producto.precio}</p>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
