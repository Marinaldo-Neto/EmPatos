'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

import PageIntro from "@/components/ui/PageIntro";
import FormInput from "@/components/ui/FormInput";
import FormError from "@/components/ui/FormError";
import FormButton from "@/components/ui/FormButton";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setIsLoading(true);

    try {
      await login({ email, password });

      router.push("/");
      router.refresh();
    } catch {
      setError("Email ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex w-full flex-1 flex-col items-center justify-center gap-4 p-4 md:max-w-1/2 lg:max-w-1/3"
    >
      <PageIntro
        icon="bi-person-lock"
        title="Bem-vindo de volta"
        description="Acesse sua conta para utilizar 100% das funcionalidades do nosso portal"
      />

      <FormError message={error} />

      <FormInput
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
      />

      <FormInput
        id="password"
        label="Senha"
        type="password"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
        required
      />

      <span className="flex w-full justify-end text-right">
        <Link href="/" className="text-sm text-(--primary-color) underline">  {/* FIXME: Adicionar link funcional*/}
            Esqueceu a senha?
        </Link>
      </span>

      <FormButton className="py-2" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </FormButton>

      <p className="text-sm text-(--secondary-text)">
        Ainda não tem uma conta?{" "}
        <Link href="/cadastro" className="text-(--primary-color) underline">
          Criar conta
        </Link>
      </p>
    </form>
  );
}