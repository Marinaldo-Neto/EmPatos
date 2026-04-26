"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function AvaliacaoPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-xl font-semibold text-center">Sua Experiência</h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Como foi o atendimento do Profissional? Sua avaliação ajuda outros
          usuários.
        </p>

        <div className="mt-6 border rounded-lg p-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-3xl font-bold">4.8</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-gray-500">128 avaliações</p>
            </div>

            <div className="flex-1 space-y-1 text-xs text-gray-500">
              {[85, 10, 3, 1, 1].map((value, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span>{5 - i}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded">
                    <div
                      className="h-full bg-blue-500 rounded"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span>{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Selecione sua nota</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer transition ${
                  (hover || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill={(hover || rating) >= star ? "currentColor" : "none"}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Muito ruim</span>
            <span>Excelente</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium mb-2">
            O que você achou do serviço?
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte detalhes sobre a pontualidade, qualidade e atendimento..."
            className="w-full h-24 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
          onClick={() => {
            console.log({ rating, comment });
          }}
        >
          Enviar Avaliação
        </button>

        <div className="text-center mt-6 text-xs text-gray-400">
          <p className="font-medium text-gray-600">Em Patos</p>
          <p className="mt-1">
            Ao enviar, você concorda com nossos termos de uso e diretrizes.
          </p>
        </div>
      </div>
    </main>
  );
}
