"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { productos } from "../../lib/data";

export default function FavoritosPage() {
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

  const favoritosProductos = productos.filter((producto) => favoritos.includes(producto.id));

  return (
    <main className="min-h-screen bg-white text-black px-4 py-6">
      <section className="mt-10 flex min-h-[calc(100vh-96px)] flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-black sm:text-5xl">Tus Favoritos</h1>
        {favoritosProductos.length === 0 ? (
          <p className="mt-4 max-w-xl text-base text-neutral-600 sm:text-lg">
            Aún no hay productos guardados.
          </p>
        ) : (
          <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {favoritosProductos.map((producto) => {
              const activo = favoritos.includes(producto.id);
              return (
                <Link
                  key={producto.id}
                  href={`/producto/${producto.id}`}
                  className="group space-y-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <article className="space-y-3">
                    <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100 relative">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          toggleFavorito(producto.id);
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
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black">{producto.nombre}</p>
                      <p className="text-xs text-neutral-500">{producto.estilo}</p>
                      <p className="mt-2 text-sm font-semibold text-black">{producto.precio}</p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
