import Header from "@/components/layout/header/Header";
import PageIntro from "@/components/ui/PageIntro";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function NotFound () {
    return (
        <main className="flex flex-col min-h-dvh pt-14 items-center">
            <Header/>
             <div className="flex flex-1 flex-col w-full p-4 text-center items-center justify-center gap-8 md:max-w-1/2 lg:max-w-1/3">
                <PageIntro
                  icon="bi-x-octagon"
                  title="Eita! Se perdeu?"
                  description="Parece que esse caminho não existe por aqui. Não se preocupe, vamos te ajudar a encontrar a rota certa!"
                />
                <PrimaryButton href="/" className="p-3">
                  Voltar à Página Inicial
                </PrimaryButton>
             </div>
        </main>
    );
}