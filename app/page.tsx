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
            width={28}
            height={28}
            className="h-7 w-auto object-contain"
          />
          <span className="text-base font-bold tracking-wider text-black">SCISSOR SUCKS</span>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
          aria-label="Favoritos"
        >
          <Image
            src="/1000038295.jpg"
            alt="Favoritos"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
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
