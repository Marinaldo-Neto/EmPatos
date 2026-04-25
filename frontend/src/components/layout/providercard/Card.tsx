import PrimaryButton from "../../ui/PrimaryButton";

export default function ProviderCard (){
    return (
        <main className="
          flex 
          flex-col 
          bg-(--component-bg) 
          border-2 
          border-(--border-color) 
          rounded-lg
          text-left 
          p-4
          gap-2
        ">
            <span className="bg-(--secondary-text) aspect-video w-full h-auto rounded-lg"></span>
            <span className="w-fit h-fit px-2 py-1 bg-(--blue-bg) rounded-lg text-xs text-(--secondary-text) font-semibold">
                Categoria
            </span>
            <div className="flex flex-col">
                <h4 className="text-lg text-(--primary-text) font-semibold">Nome do Profissional</h4>
                <p className="text-sm text-(--secondary-text)">Biografia ou breve descrição do que ele faz.</p>
            </div>
            <div className="flex w-full h-fit">
                <span className="flex w-full gap-1 items-center text-lg text-(--primary-text) font-semibold">
                    <i className="bi bi-star-fill text-(--star)"></i>
                    5.0
                </span>
                <PrimaryButton href="/" className="p-2">
                    Ver Perfil
                </PrimaryButton>
            </div>
        </main>
    );
}