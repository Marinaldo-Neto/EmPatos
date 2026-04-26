"use client";

import { useState } from "react";
import { Upload, ImagePlus, X } from "lucide-react";
import Image from "next/image";

export default function PortfolioPage() {
  const [images, setImages] = useState<string[]>([
    "/fotoportfolio (1).jpeg",
    "/fotoportfolio (2).jpeg",
    "/fotoportfolio (3).jpeg",
    "/fotoportfolio (4).jpeg",
    "/fotoportfolio (5).jpeg",
  ]);

  const MAX_IMAGES = 20;

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );

    setImages((prev) => [...prev, ...newImages].slice(0, MAX_IMAGES));
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold">Seu Portfólio</h1>
            <p className="text-sm text-gray-500">
              Gerencie as imagens exibidas no seu perfil
            </p>
          </div>

          <div className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
            {images.length} / {MAX_IMAGES} Fotos
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-24 rounded-lg overflow-hidden group"
            >
              <Image src={img} alt="Imagem" fill className="object-cover" />

              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {images.length < MAX_IMAGES && (
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-24 cursor-pointer hover:bg-gray-50">
              <ImagePlus className="text-gray-400" />
              <span className="text-xs text-gray-400">Adicionar</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleAddImage}
              />
            </label>
          )}
        </div>

        <label className="flex items-center justify-center gap-2 mt-4 border rounded-lg py-2 cursor-pointer hover:bg-gray-50 text-sm">
          <Upload size={16} />
          Adicionar Imagem
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleAddImage}
          />
        </label>

        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
          Salvar Alterações
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          As alterações ficarão visíveis imediatamente no portal.
        </p>
      </div>
    </main>
  );
}
