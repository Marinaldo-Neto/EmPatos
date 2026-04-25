import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer () {
    return (
        <footer className={styles.footer}> {/* FIXME: Alterar o flex-col e padding no @media */}
            <article className="flex flex-col w-full gap-4 md:flex-row">
                <div className="flex flex-1 flex-col items-center gap-2">
                  <Link href="/" className="flex items-center text-lg font-bold gap-2">
                      <i className="bi bi-square-fill text-2xl"></i>
                      Em Patos
                  </Link>
                  <p className="text-sm">O maior portal de conexão entre profissionais e clientes da região de Patos - Paraíba.</p>
                  <span className="flex text-xl gap-2">
                      <Link href="/"> {/* FIXME: Adicionar link funcional*/}
                          <i className="bi bi-instagram"></i>
                      </Link>
                      <Link href="/"> {/* FIXME: Adicionar link funcional*/}
                          <i className="bi bi-youtube"></i>
                      </Link>
                      <Link href="/"> {/* FIXME: Adicionar link funcional*/}
                          <i className="bi bi-envelope"></i>
                      </Link>
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h4 className="text-sm font-bold">PARA CLIENTES</h4>
                  <ul className="text-sm">
                      <li>
                          <Link href="/">Como funciona?</Link> {/* FIXME: Adicionar link funcional*/}
                      </li>
                      <li>
                          <Link href="/">Buscar serviços</Link> {/* FIXME: Adicionar link funcional*/}
                      </li>
                      <li>
                          <Link href="/">Dicas de segurança</Link> {/* FIXME: Adicionar link funcional*/}
                      </li>
                  </ul>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h4 className="text-sm font-bold">PARA PROFISSIONAIS</h4>
                  <ul className="text-sm">
                      <li>
                          <Link href="/">Anuncie seus serviços</Link> {/* FIXME: Adicionar link funcional*/}
                      </li>
                      <li>
                          <Link href="/">Planos e Preços</Link> {/* FIXME: Adicionar link funcional*/}
                      </li>
                      <li>
                          <Link href="/">Suporte ao parceiro</Link> {/* FIXME: Adicionar link funcional*/}
                      </li>
                  </ul>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h4 className="text-sm font-bold">INSTITUCIONAL</h4>
                  <ul className="text-sm">
                      <li>
                          <Link href="/">Sobre nós</Link> {/* FIXME: Adicionar link funcional*/}
                      </li>
                      <li>
                          <Link href="/">Privacidade</Link> {/* FIXME: Adicionar link funcional*/}
                      </li>
                      <li>
                          <Link href="/">Fale conosco</Link> {/* FIXME: Adicionar link funcional*/}
                      </li>
                  </ul>
                </div>
            </article>
            <hr/>
            <p className="text-xs w-full text-center">© 2026 Em Patos - Guia de Serviços. Todos os direitos reservados.</p>
        </footer>
    );
}