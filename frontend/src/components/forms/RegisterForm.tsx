"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

import PageIntro from "@/components/ui/PageIntro";
import FormInput from "@/components/ui/FormInput";
import FormError from "@/components/ui/FormError";
import FormButton from "@/components/ui/FormButton";

export function RegisterForm() {
  const router = useRouter();
  const { refreshSession } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setError("");

    if (password !== passwordConfirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      await refreshSession();

      router.push("/");
      router.refresh();
    } catch {
      setError("Não foi possível criar sua conta.");
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
      className="flex w-full flex-1 flex-col items-center justify-center gap-4 py-8 px-4 md:max-w-1/2 lg:max-w-1/3"
    >
      <PageIntro
        icon="bi-person-add"
        title="Bem-vindo ao Em Patos"
        description="Cadastre-se para acessar todos os recursos do nosso portal"
      />

      <FormError message={error} />

      <FormInput
        id="name"
        label="Nome"
        type="text"
        value={name}
        onChange={setName}
        autoComplete="name"
        required
      />

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
        autoComplete="new-password"
        required
      />

      <FormInput
        id="passwordConfirmation"
        label="Confirmar senha"
        type="password"
        value={passwordConfirmation}
        onChange={setPasswordConfirmation}
        autoComplete="new-password"
        required
      />

      <FormButton className="py-2" disabled={isLoading}>
        {isLoading ? "Criando conta..." : "Criar conta"}
      </FormButton>

      <p className="text-sm text-(--secondary-text)">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-(--primary-color) underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}