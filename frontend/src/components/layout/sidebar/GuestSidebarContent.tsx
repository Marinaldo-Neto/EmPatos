import Link from "next/link";

type GuestSidebarContentProps = {
  onClose: () => void;
};

export default function GuestSidebarContent({
  onClose,
}: GuestSidebarContentProps) {
  return (
    <nav className="mt-4 flex flex-col gap-4 p-4 text-(--secondary-text)">
      <Link
        href="/cadastro"
        onClick={onClose}
        className="flex items-center justify-center gap-2 text-lg"
      >
        <i className="bi bi-person-plus text-2xl" />
        Criar Conta
      </Link>

      <Link
        href="/login"
        onClick={onClose}
        className="flex items-center justify-center gap-2 text-lg"
      >
        <i className="bi bi-box-arrow-in-right text-2xl" />
        Entrar
      </Link>
    </nav>
  );
}