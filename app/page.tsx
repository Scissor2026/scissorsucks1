import { productos } from "../data";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black px-3 py-4">
      <section className="grid grid-cols-2 gap-3">
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
