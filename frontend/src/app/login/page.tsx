import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { LoginForm } from "@/components/forms/LoginForm";
import Header from "@/components/layout/header/Header";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session.isAuthenticated) {
    redirect("/");
  }

  return (
    <main className="flex flex-col min-h-dvh pt-14 items-center">
        <Header />
        <LoginForm />
    </main>
  );
}