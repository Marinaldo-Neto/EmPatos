import Header from "@/components/Header/Header";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function NotFound () {
    return (
        <main className="flex flex-col min-h-dvh pt-14 items-center">
            <Header/>
             <div className="flex flex-1 flex-col w-full p-4 text-center items-center justify-center gap-8 md:max-w-1/2">
                <div className="flex w-fit text-6xl text-(--primary-color) bg-(--blue-bg) rounded-full p-6">
                    <i className="bi bi-x-octagon"></i>
                </div>
                <div className="flex flex-col w-full gap-2">
                    <h1 className="font-bold text-3xl">Eita! Se perdeu?</h1>
                    <p className="text-(--secondary-text) text-base">
                        Parece que esse caminho não existe por aqui em Patos. 
                        Não se preocupe, vamos te ajudar a encontrar a rota certa!
                    </p>
                </div>
                <PrimaryButton href="/" className="p-3">
                  Voltar à Página Inicial
                </PrimaryButton>
             </div>
        </main>
    );
}