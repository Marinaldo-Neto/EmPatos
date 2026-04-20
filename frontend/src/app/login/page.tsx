import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex flex-col min-h-dvh bg-(--gray-bg)">

      {/* Topo */}
      <div className="w-full max-w-5xl mx-auto px-4 py-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-(--primary-color) font-medium hover:underline"
        >
          <i className="bi bi-arrow-left"></i>
          Voltar
        </Link>
      </div>

      {/* Centro */}
      <div className="flex flex-1 items-center justify-center px-4">
        <section className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Form */}
          <div className="flex flex-col justify-center w-full md:w-1/2 p-8 gap-4">
            
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="bg-(--primary-color)/20 p-3 rounded-full">
                <i className="bi bi-geo-alt text-(--primary-color) text-xl"></i>
              </div>

              <h1 className="text-2xl font-bold text-center md:text-left">
                Bem-vindo de volta
              </h1>

              <p className="text-(--secondary-text) text-sm text-center md:text-left">
                Acesse sua conta para continuar no portal
              </p>
            </div>

            <form className="flex flex-col gap-4 mt-4">
              <input
                type="email"
                placeholder="exemplo@email.com"
                className="border border-(--border-color) rounded-md p-3 outline-none focus:border-(--primary-color)"
              />

              <div className="flex flex-col gap-1">
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  className="border border-(--border-color) rounded-md p-3 outline-none focus:border-(--primary-color)"
                />
                <span className="text-xs text-right text-(--primary-color) cursor-pointer">
                  Esqueceu a senha?
                </span>
              </div>

              <button
                type="submit"
                className="bg-(--primary-color) text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
              >
                Entrar →
              </button>
            </form>

            <p className="text-sm text-center text-(--secondary-text)">
              Ainda não tem uma conta?{" "}
              <Link href="/register" className="text-(--primary-color) font-semibold">
                Cadastre-se
              </Link>
            </p>
          </div>

          {/* Imagem */}
          <div className="relative hidden md:block md:w-1/2">
            <Image
              src="/patos.jpeg"
              alt="Cidade"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold flex items-center gap-2">
                <i className="bi bi-tools"></i>
                Em Patos
              </h2>
            </div>
          </div>

        </section>
      </div>

    </main>
  );
}