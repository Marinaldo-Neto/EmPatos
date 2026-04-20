import styles from "./Sidebar.module.css";
import Link from "next/link";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}
      
      <aside
        id="mobile-sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      >
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="text-xl font-bold">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="text-xl h-10 w-10"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* TODO: Adicionar imagem */}
        <nav className="flex flex-col gap-4 p-4 mt-4">
            <Link 
              href="/" 
              onClick={onClose}
              className="flex items-center justify-center text-lg gap-2"
            >
                <i className="bi bi-person-plus text-2xl"></i>
                Criar Conta
            </Link>
            <Link 
              href="/login" 
              onClick={onClose}
              className="flex items-center justify-center text-lg gap-2"
            >
                <i className="bi bi-box-arrow-in-right text-2xl"></i>
                Entrar
            </Link>
        </nav>
      </aside>
    </>
  );
}