'use client';

import { useState, useEffect } from 'react'; // Sidebar
import { usePathname } from 'next/navigation'; // Sidebar
import Sidebar from '../sidebar/Sidebar'; // Sidebar
import Link from "next/link";
import styles from "./Header.module.css";
import { useAuth } from "@/hooks/useAuth"; // Session
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

export default function HeaderHome () {

  // Session
  const { isAuthenticated } = useAuth();

  // Sidebar
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function openSidebar() {
    setIsOpen(true);
  }

  function closeSidebar() {
    setIsOpen(false);
  }

  // fecha ao trocar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // trava o scroll quando a sidebar estiver aberta
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isAuthenticated) {
    return (
      <>
        <header className={styles.header}>
          <Link href="/" className="flex items-center text-xl font-bold gap-2">
            <i className="bi bi-square-fill text-4xl"></i>
            Em Patos
          </Link>
          <nav className='flex items-center gap-2'>
            {/* Normal */}
            <SecondaryButton href='/cadastro' className='px-4 py-2 text-sm whitespace-nowrap hidden md:block'>
              Criar Conta
            </SecondaryButton>
            <PrimaryButton href='/login' className='px-4 py-2 text-sm hidden md:flex gap-2 items-center'>
              <i className='bi bi-box-arrow-in-right text-xl'></i>
              Entrar
            </PrimaryButton>

            {/* Mobile */}
            <button type="button" className='text-xl h-10 w-10 md:hidden'>
              <i className='bi bi-search'></i>
            </button>
            <button
              type="button"
              onClick={openSidebar}
              aria-label="Abrir menu"
              aria-expanded={isOpen}
              aria-controls="mobile-sidebar"
              className='text-2xl h-10 w-10 md:hidden'
            >
              <i className='bi bi-list'></i>
            </button>
          </nav>
        </header>

        <Sidebar isOpen={isOpen} onClose={closeSidebar} />
      </>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className="flex items-center text-xl font-bold gap-2">
          <i className="bi bi-square-fill text-4xl"></i>
          Em Patos
        </Link>
        <nav className='flex gap-2'>
          <button type="button" className='text-xl h-10 w-10'>
            <i className='bi bi-search'></i>
          </button>
          <button
            type="button"
            onClick={openSidebar}
            aria-label="Abrir menu"
            aria-expanded={isOpen}
            aria-controls="mobile-sidebar"
            className='text-2xl h-10 w-10'
          >
            <i className='bi bi-list'></i>
          </button>
        </nav>
      </header>

      <Sidebar isOpen={isOpen} onClose={closeSidebar} />
    </>
    );
}