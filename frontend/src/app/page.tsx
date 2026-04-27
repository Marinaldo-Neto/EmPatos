import HeaderHome from "@/components/layout/header/HeaderHome";
import ProviderCard from "@/components/layout/providercard/Card";
import CategoryCard from "@/components/ui/CategoryCard";
import SearchBar from "@/components/ui/SearchBar";
import StepCard from "@/components/ui/StepCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh pt-14">

      {/* FIXME: Ajustar os itens de #Categorias e #ComoFunciona, transformar em componentes também. */}

      <HeaderHome/>

      {/* Hero Section */}
      <section className="flex flex-col w-full min-h-[calc(100dvh-57px)] px-4 py-8 text-center items-center justify-center md:flex-row md:gap-4 lg:gap-8">
        <article>
          <div className="flex flex-1 flex-col w-full max-w-2xl gap-2 pb-8 md:text-left">
              <h1 className="font-bold text-4xl">Encontre profissionais de confiança em
                <span className="text-(--primary-color)"> Patos - PB</span>
              </h1>
              <p className="text-(--secondary-text) text-base">
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
            loading="eager"
            fill
            sizes="(max-width: 768px)"
            className="object-cover rounded-lg"
          />
        </article>
      </section>

      {/* Categories Section */}
      <section className="flex flex-col w-full min-h-[calc(100dvh-57px)] px-4 py-8 text-center items-center justify-center bg-(--component-bg)">
        <div className="flex flex-col w-full gap-2 pb-8">
          <h2 className="font-bold text-3xl">Categorias em destaque</h2>
          <p className="text-(--secondary-text) text-base">
            Explore os serviços mais procurados da cidade
          </p>
        </div>
        <div className="grid grid-cols-2 w-10/12 gap-4 lg:grid-cols-3 lg:w-4/6">

          {/* FIXME: Adicionar link funcional real. */}
          <CategoryCard
            icon="bi-tools"
            label="Reformas"
            href="/"
          />

          {/* FIXME: Adicionar link funcional real. */}
          <CategoryCard
            icon="bi-stars"
            label="Limpeza"
            href="/"
          />

          {/* FIXME: Adicionar link funcional real. */}
          <CategoryCard
            icon="bi-scissors"
            label="Beleza"
            href="/"
          />

          {/* FIXME: Adicionar link funcional real. */}
          <CategoryCard
            icon="bi-mortarboard"
            label="Aulas"
            href="/"
          />

          {/* FIXME: Adicionar link funcional real. */}
          <CategoryCard
            icon="bi-bandaid"
            label="Saúde"
            href="/"
          />

          {/* FIXME: Adicionar link funcional real. */}
          <CategoryCard
            icon="bi-car-front"
            label="Mecânica"
            href="/"
          />
        </div>
        <Link href="/" className="flex items-center cursor-pointer text-base text-(--primary-color) font-bold pt-4">
          Ver todas
        </Link>
      </section>

      {/* Providers Section */}
      <section className="flex flex-col w-full min-h-[calc(100dvh-57px)] px-4 py-8 text-center items-center justify-center">
        <div className="flex flex-col w-full gap-2 pb-8">
          <h3 className="font-bold text-3xl">Profissionais bem avaliados</h3>
          <p className="text-(--secondary-text) text-base">
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
            <StepCard
              icon="bi-search"
              title="1. Busque"
              description="Digite o serviço que precisa e explore centenas de perfis"
            />

            <StepCard
              icon="bi-chat-left-text"
              title="2. Conecte-se"
              description="Analise avaliações e entre em contato direto pelo WhatsApp"
            />

            <StepCard
              icon="bi-check-square"
              title="2. Contrate"
              description="Feche o negócio direto com o profissional sem taxas extras"
            />
          </div>
        </article>
      </section>
    </main>
  );
}