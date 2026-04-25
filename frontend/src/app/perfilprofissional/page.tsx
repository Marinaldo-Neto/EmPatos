import Image from "next/image";
import { Star, MapPin, Briefcase } from "lucide-react";

export default function PerfilProfissional() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center py-8 px-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <button className="text-gray-600 text-xl">←</button>
          <button className="text-gray-600 text-xl">≡</button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-blue-500 overflow-hidden">
              <Image
                src="/fotoperfil.jpeg"
                alt="Marco Oliveira"
                width={112}
                height={112}
                className="object-cover"
              />
            </div>

            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          <h2 className="mt-3 text-lg font-semibold">Marco Oliveira</h2>
          <p className="text-gray-500 text-sm">
            Ar Condicionado & Refrigeração
          </p>

          <p className="flex items-center gap-1 text-gray-400 text-xs mt-1">
            <MapPin size={14} /> Patos, PB - Bairro Belo Horizonte
          </p>

          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Contato
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-xl font-bold">4.9</p>
            <p className="text-xs text-gray-500 flex justify-center items-center gap-1">
              <Star size={14} /> Avaliação
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-xl font-bold">150+</p>
            <p className="text-xs text-gray-500">Serviços</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-xl font-bold">12 anos</p>
            <p className="text-xs text-gray-500 flex justify-center items-center gap-1">
              <Briefcase size={14} /> Carreira
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {["Manutenção", "Instalação", "Limpeza", "Industrial"].map((item) => (
            <span
              key={item}
              className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>

        <section className="mt-6 text-center max-w-2xl mx-auto">
          <h3 className="font-semibold mb-2">Sobre</h3>
          <p className="text-gray-500 text-sm">
            Especialista em climatização residencial e comercial em Patos e
            região. Atendimento ágil com garantia de qualidade. Trabalhamos com
            todas as marcas de split e centrais de ar.
          </p>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-center mb-4">
            Galeria de Serviços
          </h3>

          <div className="flex justify-center gap-4 flex-wrap">
            <div className="w-32 h-32 relative rounded-lg overflow-hidden">
              <Image
                src="/foto1ar.jpeg"
                alt="serviço"
                fill
                className="object-cover"
              />
            </div>

            <div className="w-32 h-32 relative rounded-lg overflow-hidden">
              <Image
                src="/foto2ar.jpeg"
                alt="serviço"
                fill
                className="object-cover"
              />
            </div>

            <div className="w-32 h-32 relative rounded-lg overflow-hidden">
              <Image
                src="/foto3ar.jpeg"
                alt="serviço"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 text-center">
          <h3 className="font-semibold">Avaliações dos Clientes</h3>
        </section>
      </div>
    </main>
  );
}
