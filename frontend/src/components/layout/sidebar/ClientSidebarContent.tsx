"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type ClientSidebarContentProps = {
  onClose: () => void;
};

export default function ClientSidebarContent({
  onClose,
}: ClientSidebarContentProps) {
  const router = useRouter();
  const { logout, user } = useAuth();

  async function handleLogout() {
    await logout();
    onClose();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="flex flex-col gap-4 p-4 text-lg text-(--secondary-text)">
      <div className="text-center pb-4">
        <p className="text-(--secondary-text)">Olá,</p>
        <p className="font-semibold text-(--primary-text)">
          {user?.name}
        </p>
      </div>

      <Link
        href="/perfil"
        onClick={onClose}
        className="flex items-center justify-center gap-2 text-lg"
      >
        <i className="bi bi-person text-2xl" />
        Meu Perfil
      </Link>

      <Link
        href="/favoritos"
        onClick={onClose}
        className="flex items-center justify-center gap-2 text-lg"
      >
        <i className="bi bi-star text-2xl" />
        Favoritos
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 text-lg text-(--danger) cursor-pointer"
      >
        <i className="bi bi-box-arrow-right text-2xl" />
        Sair
      </button>
    </nav>
  );
}