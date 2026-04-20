'use client';

import { useState, useEffect} from 'react'; // Sidebar
import { usePathname, useRouter } from 'next/navigation'; // Sidebar
import Sidebar from '../Sidebar/Sidebar'; // Sidebar
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header () {

    const router = useRouter(); // Botão Voltar

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
                <button className='text-2xl h-10 w-10' onClick={() => router.back()}>
                    <i className='bi bi-arrow-left'></i>
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
            </header>

            <Sidebar isOpen={isOpen} onClose={closeSidebar} />
        </>
    );
}