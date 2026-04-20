import HeaderHome from "@/components/Header/HeaderHome";
import ProviderCard from "@/components/ProviderCard/Card";
import SearchBar from "@/components/ui/SearchBar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh pt-14">

        <HeaderHome/>

          {/* Hero Section */}
          <section className="flex flex-col w-full min-h-[calc(100dvh-57px)] px-4 py-8 text-center items-center justify-center md:flex-row md:gap-4 lg:gap-8">
            <article>
              <div className="flex flex-1 flex-col w-full max-w-2xl gap-2 pb-8 md:text-left">
                  <h1 className="font-bold text-4xl">Encontre profissionais de confiança em
                    <span className="text-(--primary-color)"> Patos - PB</span>
                  </h1>
                  <p className="text-(--secondary-text) text-lg">
                    Conectando você aos melhores prestadores de serviço
                     da região de forma rápida, segura e totalmente gratuita.
                  </p>
              </div>
              <SearchBar/>
            </article>
            <article className="relative aspect-square hidden md:block md:w-2/3 md:max-w-96 lg:w-full">
              <Image
                src="/Hero.png"
                alt="Prestador de serviços"
                fill
                className="object-cover rounded-lg"
              />
            </article>
          </section>

          {/* Categories Section */}
          <section className="flex flex-col w-full min-h-[calc(100dvh-57px)] px-4 py-8 text-center items-center justify-center bg-(--component-bg)">
            <div className="flex flex-col w-full gap-2 pb-8">
              <h2 className="font-bold text-3xl">Categorias em destaque</h2>
              <p className="text-(--secondary-text) text-lg">
                Explore os serviços mais procurados da cidade
              </p>
            </div>
            <div className="grid grid-cols-2 w-10/12 gap-4 lg:grid-cols-3 lg:w-4/6">
              <article className="
                flex 
                flex-col 
                bg-(--gray-bg) 
                border-2 
                border-(--border-color) 
                rounded-lg 
                text-(--secondary-text)
                text-sm
                font-semibold
                p-4
                gap-2
                cursor-pointer
              ">
                <i className="bi bi-tools text-3xl"></i>
                Reformas
              </article>

              <article className="
                flex 
                flex-col 
                bg-(--gray-bg) 
                border-2 
                border-(--border-color) 
                rounded-lg 
                text-(--secondary-text)
                text-sm
                font-semibold
                p-4
                gap-2
                cursor-pointer
              ">
                <i className="bi bi-stars text-3xl"></i>
                Limpeza
              </article>

              <article className="
                flex 
                flex-col 
                bg-(--gray-bg) 
                border-2 
                border-(--border-color) 
                rounded-lg 
                text-(--secondary-text)
                text-sm
                font-semibold
                p-4
                gap-2
                cursor-pointer
              ">
                <i className="bi bi-scissors text-3xl"></i>
                Beleza
              </article>

              <article className="
                flex 
                flex-col 
                bg-(--gray-bg) 
                border-2 
                border-(--border-color) 
                rounded-lg 
                text-(--secondary-text)
                text-sm
                font-semibold
                p-4
                gap-2
                cursor-pointer
              ">
                <i className="bi bi-mortarboard text-3xl"></i>
                Aulas
              </article>

              <article className="
                flex 
                flex-col 
                bg-(--gray-bg) 
                border-2 
                border-(--border-color) 
                rounded-lg 
                text-(--secondary-text)
                text-sm
                font-semibold
                p-4
                gap-2
                cursor-pointer
              ">
                <i className="bi bi-bandaid text-3xl"></i>
                Saúde
              </article>

              <article className="
                flex 
                flex-col 
                bg-(--gray-bg) 
                border-2 
                border-(--border-color) 
                rounded-lg 
                text-(--secondary-text)
                text-sm
                font-semibold
                p-4
                gap-2
                cursor-pointer
              ">
                <i className="bi bi-car-front text-3xl"></i>
                Mecânica
              </article>
            </div>
            <Link href="/" className="flex items-center cursor-pointer text-base text-(--primary-color) font-bold pt-4">
              Ver todas
            </Link>
          </section>

          {/* Providers Section */}
          <section className="flex flex-col w-full min-h-[calc(100dvh-57px)] px-4 py-8 text-center items-center justify-center">
            <div className="flex flex-col w-full gap-2 pb-8">
              <h3 className="font-bold text-3xl">Profissionais bem avaliados</h3>
              <p className="text-(--secondary-text) text-lg">
                Os talentos locais com as melhores notas da comunidade
              </p>
            </div>
            <div className="flex flex-col w-full justify-center gap-4 md:flex-row lg:gap-8">
              <ProviderCard/>
              <ProviderCard/>
              <ProviderCard/>
            </div>
          </section>

          {/* Tutorial Section */}
          <section className="flex flex-col w-full min-h-[calc(100dvh-57px)] px-4 py-8 text-center items-center justify-center bg-(--gray-bg)">
            <article className="flex flex-col gap-8 md:gap-16">
              <h5 className="font-bold text-3xl">Como funciona o Em Patos?</h5>

              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex flex-col w-full items-center">
                  <span className="bg-(--primary-color) rounded-lg text-xl text-(--button-item) py-2 px-4 w-fit h-fit mb-4">
                    <i className="bi bi-search"></i>
                  </span>
                  <h6 className="font-bold text-xl">1. Busque</h6>
                  <p className="text-(--secondary-text) text-base max-w-80">
                    Digite o serviço que precisa e explore centenas de perfis
                  </p>
                </div>

                <div className="flex flex-col w-full items-center">
                  <span className="bg-(--primary-color) rounded-lg text-xl text-(--button-item) py-2 px-4 w-fit h-fit mb-4">
                    <i className="bi bi-chat-left-text"></i>
                  </span>
                  <h6 className="font-bold text-xl">2. Conecte-se</h6>
                  <p className="text-(--secondary-text) text-base max-w-80">
                    Analise avaliações e entre em contato direto pelo WhatsApp
                  </p>
                </div>

                <div className="flex flex-col w-full items-center">
                  <span className="bg-(--primary-color) rounded-lg text-xl text-(--button-item) py-2 px-4 w-fit h-fit mb-4">
                    <i className="bi bi-check-square"></i>
                  </span>
                  <h6 className="font-bold text-xl">3. Contrate</h6>
                  <p className="text-(--secondary-text) text-base max-w-80">
                    Feche o negócio direto com o profissional sem taxas extras
                  </p>
                </div>
              </div>
            </article>
          </section>
    </main>   
  );
}
