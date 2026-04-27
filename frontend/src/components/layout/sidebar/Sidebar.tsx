"use client";

import styles from "./Sidebar.module.css";
import { useAuth } from "@/hooks/useAuth";
import GuestSidebarContent from "@/components/layout/sidebar/GuestSidebarContent";
import ClientSidebarContent from "@/components/layout/sidebar/ClientSidebarContent";
import ProviderSidebarContent from "@/components/layout/sidebar/ProviderClientContent";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { isAuthenticated, accountType } = useAuth();

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
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="text-xl">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="h-10 w-10 text-xl"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {!isAuthenticated && <GuestSidebarContent onClose={onClose} />}

        {isAuthenticated && accountType === "client" && (
          <ClientSidebarContent onClose={onClose} />
        )}

        {isAuthenticated && accountType === "provider" && (
          <ProviderSidebarContent onClose={onClose} />
        )}
      </aside>
    </>
  );
}