"use client";

import { useEffect, useState } from "react";
import { productos } from "../lib/data";

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

interface Reseña {
  rating: number;
  comentario: string;
  fecha: string;
}

type ReseñasPorProducto = Record<string, Reseña[]>;

export default function Home() {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [reseñas, setReseñas] = useState<ReseñasPorProducto>({});
  const [ratingTemp, setRatingTemp] = useState(0);
  const [comentarioTemp, setComentarioTemp] = useState("");

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

  useEffect(() => {
    const stored = window.localStorage.getItem("scissor_reseñas");
    if (stored) {
      try {
        setReseñas(JSON.parse(stored));
      } catch {
        setReseñas({});
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

  const agregarReseña = (productoId: string) => {
    const comentario = comentarioTemp.trim();
    if (ratingTemp === 0 || comentario.length === 0) {
      return;
    }

    const nuevaReseña: Reseña = {
      rating: ratingTemp,
      comentario,
      fecha: new Date().toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setReseñas((prev) => {
      const prevList = prev[productoId] ?? [];
      const next = {
        ...prev,
        [productoId]: [nuevaReseña, ...prevList],
      };
      window.localStorage.setItem("scissor_reseñas", JSON.stringify(next));
      return next;
    });

    setRatingTemp(0);
    setComentarioTemp("");
  };

  const reseñasActuales = productoSeleccionado
    ? reseñas[productoSeleccionado.id.toString()] ?? []
    : [];

  return (
    <main className="min-h-screen bg-white text-black px-3 py-4">
      <section className="grid grid-cols-2 gap-3">
        {productos.map((producto) => {
          const productId = producto.id.toString();
          const activo = favoritos.includes(productId);
          const imageUrl = producto.imagenes[0] ?? "";

          return (
            <article
              key={producto.id}
              className="space-y-3 cursor-pointer"
              onClick={() => {
                setProductoSeleccionado(producto);
                setRatingTemp(0);
                setComentarioTemp("");
              }}
            >
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
              </div>
              <div className="px-1">
                <p className="text-sm font-semibold text-black">{producto.nombre}</p>
                <p className="text-xs text-neutral-500">{producto.marca}</p>
                <p className="text-sm font-semibold text-black">S/ {producto.precio.toFixed(2)}</p>
              </div>
            </article>
          );
        })}
      </section>

      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white p-5 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setProductoSeleccionado(null)}
              className="absolute right-4 top-4 rounded-full bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200"
              aria-label="Cerrar modal de producto"
            >
              X
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (productoSeleccionado) {
                  toggleFavorito(productoSeleccionado.id.toString());
                }
              }}
              className="absolute right-16 top-4 rounded-full bg-white p-2 shadow-sm ring-1 ring-neutral-200 transition hover:bg-neutral-100"
              aria-pressed={productoSeleccionado ? favoritos.includes(productoSeleccionado.id.toString()) : false}
              aria-label={favoritos.includes(productoSeleccionado.id.toString()) ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className={`w-6 h-6 transition-all ${
                  productoSeleccionado && favoritos.includes(productoSeleccionado.id.toString())
                    ? "fill-pink-500 stroke-pink-500"
                    : "fill-transparent stroke-gray-900"
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>

            <div className="space-y-6">
              <img
                src={productoSeleccionado.imagenes[0]}
                alt={productoSeleccionado.nombre}
                className="w-full h-48 md:h-64 object-contain rounded-[1.25rem] border border-neutral-200 bg-neutral-100"
              />

              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{productoSeleccionado.marca}</p>
                  <h1 className="text-2xl font-bold text-black">{productoSeleccionado.nombre}</h1>
                  <p className="text-2xl font-semibold text-black">S/ {productoSeleccionado.precio.toFixed(2)}</p>
                </div>

                <div className="space-y-4 rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">Descripción</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{productoSeleccionado.descripcion}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">Color</p>
                      <p className="mt-1 text-sm text-neutral-600">{productoSeleccionado.color}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">Tallas</p>
                      <p className="mt-1 text-sm text-neutral-600">{productoSeleccionado.tallas.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">Código</p>
                      <p className="mt-1 text-sm text-neutral-600">{productoSeleccionado.id}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">Reseñas</p>
                    {reseñasActuales.length === 0 ? (
                      <p className="mt-2 text-sm text-neutral-600">Sé el primero en dejar una reseña.</p>
                    ) : (
                      <div className="mt-3 space-y-3 max-h-32 overflow-y-auto pr-2">
                        {reseñasActuales.map((reseña, index) => (
                          <div key={index} className="rounded-2xl bg-white p-3 border border-neutral-200">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <span
                                  key={i}
                                  className={`text-lg ${i < reseña.rating ? "text-yellow-400" : "text-neutral-300"}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <p className="mt-2 text-sm text-neutral-700">{reseña.comentario}</p>
                            <p className="mt-2 text-xs text-neutral-500">{reseña.fecha}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRatingTemp(i + 1)}
                          className={`rounded-full px-2 py-1 text-lg transition ${
                            i < ratingTemp ? "text-yellow-400" : "text-neutral-300"
                          }`}
                          aria-label={`Seleccionar ${i + 1} estrellas`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={comentarioTemp}
                      onChange={(event) => setComentarioTemp(event.target.value)}
                      rows={4}
                      placeholder="Escribe tu reseña..."
                      className="w-full rounded-3xl border border-neutral-200 bg-white p-3 text-sm text-neutral-700 outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                    />
                    <button
                      type="button"
                      onClick={() => productoSeleccionado && agregarReseña(productoSeleccionado.id.toString())}
                      className="w-full rounded-3xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900"
                    >
                      Publicar Reseña
                    </button>
                  </div>
                </div>

                <div className="grid gap-3">
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
      )}
    </main>
  );
}
