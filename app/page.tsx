import Link from "next/link";
import { productos } from "../data";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <header className="flex justify-between items-center mb-12 border-b border-neutral-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest uppercase">
          SCISSOR SUCKS
        </h1>
        <span className="text-xs tracking-widest text-neutral-400">
          EDICIÓN LIMITADA • 3 AMIGOS
        </span>
      </header>

      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-wide">Catálogo Oficial</h2>
        <p className="text-neutral-400 text-sm">
          Hecho sin intermediarios. Directo al WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((gorra) => (
          <div
            key={gorra.id}
            className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col"
          >
            <div className="h-64 bg-neutral-800 flex items-center justify-center text-neutral-500">
              <span>[ Foto: {gorra.nombre} ]</span>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <span className="text-xs text-neutral-400 uppercase tracking-wider">
                {gorra.estilo}
              </span>
              <h3 className="text-lg font-bold mt-1">{gorra.nombre}</h3>
              <p className="text-white font-semibold mt-2">{gorra.precio}</p>

              <Link
                href={`/producto/${gorra.slug}`}
                className="mt-auto pt-4 w-full bg-white text-black font-bold py-2 rounded uppercase text-sm tracking-wider hover:bg-neutral-200 transition text-center"
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
