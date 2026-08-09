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
      <main className="min-h-screen bg-white text-black flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Gorra no encontrada</h1>
          <Link href="/" className="text-neutral-600 hover:text-black transition">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black p-6 md:p-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-neutral-600 hover:text-black transition">
          ← Volver al catálogo
        </Link>
      </div>

      <div className="mx-auto max-w-6xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex h-96 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.03),_transparent_55%)]" />
              <div className="relative z-10 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-neutral-300 bg-white/80 shadow-sm animate-pulse opacity-40">
                  <span className="text-xl font-semibold tracking-[0.3em] text-black">SS</span>
                </div>
                <p className="text-lg font-medium tracking-[0.25em] text-neutral-500 uppercase">
                  [ Foto de {gorra.nombre} ]
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              {gorra.marca}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-black">
              {gorra.nombre}
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-neutral-500">
              {gorra.estilo}
            </p>
            <p className="mt-4 text-2xl font-semibold text-neutral-900">{gorra.precio}</p>

            <a
              href={`https://wa.me/51999999999?text=${encodeURIComponent(`Hola, quiero comprar ${gorra.nombre}`)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-md bg-black px-6 py-3 font-medium text-white transition duration-200 hover:bg-neutral-800"
            >
              Comprar por WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <div>
            <h2 className="text-lg font-semibold text-black">Descripción</h2>
            <p className="mt-3 text-neutral-700 leading-relaxed">
              {gorra.descripcion}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm text-neutral-500">Material</p>
            <p className="mt-1 text-black">{gorra.material}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Características
            </h3>
            <ul className="mt-3 space-y-2 text-neutral-700">
              {gorra.caracteristicas.map((caracteristica) => (
                <li key={caracteristica} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
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
