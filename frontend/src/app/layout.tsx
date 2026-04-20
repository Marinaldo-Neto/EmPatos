import { Lexend } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

const lexend = Lexend({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${lexend.variable} h-full antialiased`}
    >
      <body className="flex flex-col">
        {children}
        <Footer/>
      </body>
    </html>
  );
}
