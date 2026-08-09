import Link from "next/link";
import { productos } from "../../../data";

interface ProductoPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductoPage({ params }: ProductoPageProps) {
  const { slug } = await params;
  const gorra = productos.find((producto) => producto.slug === slug);

  if (!gorra) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Gorra no encontrada</h1>
          <Link href="/" className="text-neutral-400 hover:text-white transition">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-neutral-400 hover:text-white transition">
          ← Volver al catálogo
        </Link>
      </div>

      <div className="mx-auto max-w-6xl rounded-2xl border border-neutral-800 bg-neutral-950/70 p-6 shadow-2xl shadow-black/40 md:p-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex h-96 items-center justify-center overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_50%)]" />
              <p className="relative z-10 text-center text-lg font-medium tracking-[0.25em] text-neutral-500 uppercase">
                [ Foto de {gorra.nombre} ]
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
              {gorra.marca}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
              {gorra.nombre}
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-neutral-500">
              {gorra.estilo}
            </p>
            <p className="mt-4 text-2xl font-semibold text-white">{gorra.precio}</p>

            <a
              href={`https://wa.me/51999999999?text=${encodeURIComponent(`Hola, quiero comprar ${gorra.nombre}`)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 font-medium text-white transition duration-200 hover:bg-green-500"
            >
              Comprar por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8">
          <div>
            <h2 className="text-lg font-semibold text-white">Descripción</h2>
            <p className="mt-3 text-neutral-300 leading-relaxed">
              {gorra.descripcion}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm text-neutral-400">Material</p>
            <p className="mt-1 text-white">{gorra.material}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Características
            </h3>
            <ul className="mt-3 space-y-2 text-neutral-300">
              {gorra.caracteristicas.map((caracteristica) => (
                <li key={caracteristica} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-500" />
                  <span>{caracteristica}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
