import Image from "next/image";
import { productos } from "../data";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="SCISSOR SUCKS logo"
            width={140}
            height={35}
            className="object-contain"
          />
        </div>

        <button
          type="button"
          className="text-neutral-700 hover:text-red-600 transition"
          aria-label="Favoritos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M20.8 4.6c-1.3-1.3-3.4-1.3-4.7 0L12 8.7 7.9 4.6c-1.3-1.3-3.4-1.3-4.7 0-1.3 1.3-1.3 3.4 0 4.7l4.6 4.6c.2.2.4.4.7.5.3.2.6.2.9 0 .3-.1.5-.3.7-.5l4.6-4.6c1.3-1.3 1.3-3.4 0-4.7z" />
          </svg>
        </button>
      </header>

      <section className="grid grid-cols-2 gap-3 px-3 py-4">
        {productos.map((producto) => (
          <article key={producto.id} className="space-y-3">
            <div className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center relative overflow-hidden border border-neutral-200">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="object-cover w-full h-full"
              />
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
        ))}
      </section>
    </main>
  );
}
