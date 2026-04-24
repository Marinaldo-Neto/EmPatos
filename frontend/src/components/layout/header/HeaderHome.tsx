'use client';

import { useState, useEffect } from 'react'; // Sidebar
import { usePathname } from 'next/navigation'; // Sidebar
import Sidebar from '../sidebar/Sidebar'; // Sidebar
import Link from "next/link";
import styles from "./Header.module.css";

export default function HeaderHome () {

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