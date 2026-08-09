"use client";

import { useEffect, useState } from "react";
import { productos } from "../../data";

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
            {favoritosProductos.map((producto) => (
              <article key={producto.id} className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">{producto.nombre}</p>
                  <p className="text-xs text-neutral-500">{producto.estilo}</p>
                  <p className="mt-2 text-sm font-semibold text-black">{producto.precio}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
