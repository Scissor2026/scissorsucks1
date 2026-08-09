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
          <Link href="/" className="text-white underline">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="mb-6">
        <Link href="/" className="inline-block text-sm text-neutral-400 hover:text-white">
          ← Volver al inicio
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div className="space-y-4">
          <div className="h-80 bg-neutral-900 rounded-lg" />
          <div className="flex gap-3">
            <a
              href={`https://wa.me/51999999999?text=${encodeURIComponent(`Hola, quiero comprar ${gorra.nombre}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded bg-green-500 px-5 py-3 font-semibold text-black hover:bg-green-400 transition"
            >
              Comprar por WhatsApp
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
            {gorra.estilo}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">{gorra.nombre}</h1>
          <p className="text-lg text-neutral-300">{gorra.marca}</p>
          <p className="text-2xl font-semibold">{gorra.precio}</p>
          <p className="text-neutral-400 leading-relaxed">{gorra.descripcion}</p>
        </div>
      </div>
    </main>
  );
}
