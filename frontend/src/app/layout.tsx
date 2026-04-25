import { Lexend } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { getServerSession } from "@/lib/auth/session";

  const lexend = Lexend({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const initialSession = await getServerSession();

  return (
    <html
      lang="pt-br"
      className={`${lexend.variable} h-full antialiased`}
    >
      <body className="flex flex-col">
        <AuthProvider initialSession={initialSession}>
          {children}
        </AuthProvider>
        <Footer/>
      </body>
    </html>
  );
}
