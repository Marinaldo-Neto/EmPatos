import Image from "next/image";
import { Star, Eye, Pencil, Image as ImageIcon } from "lucide-react";

export default function PerfilprofissionalPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <button className="text-gray-600 text-xl">←</button>
          <button className="text-gray-600 text-xl">≡</button>
        </div>

        {/* PERFIL */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
            <Image
              src="/fotoperfil.jpeg"
              alt="Joana Silva"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>

          <h2 className="font-semibold text-lg flex items-center gap-1">
            Joana Silva
            <span className="text-blue-500">✔</span>
          </h2>

          <p className="text-gray-500 text-sm">Esteticista</p>

          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Ver Perfil Público
          </button>
        </div>

        {/* ESTATÍSTICAS */}
        <section className="mt-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Estatísticas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visualizações */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <span>Visualizações (30d)</span>
                <Eye size={16} />
              </div>

              <p className="text-2xl font-bold mt-2">1.248</p>
              <p className="text-green-500 text-xs mt-1">
                +12% vs mês anterior
              </p>
            </div>

            {/* Avaliação */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <span>Avaliação Média</span>
                <Star size={16} className="text-yellow-400" />
              </div>

              <p className="text-2xl font-bold mt-2">4.9</p>
              <p className="text-gray-400 text-xs mt-1">
                24 depoimentos ativos
              </p>
            </div>
          </div>
        </section>

        {/* GESTÃO */}
        <section className="mt-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Gestão de Perfil
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Editar */}
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Pencil className="text-blue-600" />
              </div>
              <p className="text-sm font-medium">Editar Perfil</p>
            </div>

            {/* Fotos */}
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <ImageIcon className="text-blue-600" />
              </div>
              <p className="text-sm font-medium">Minhas Fotos</p>
            </div>
          </div>
        </section>

        {/* SUPORTE */}
        <div className="mt-6">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm cursor-pointer hover:shadow-md transition">
            <p className="text-sm text-gray-600">❓ Suporte ao Prestador</p>
          </div>
        </div>
      </div>
    </main>
  );
}
