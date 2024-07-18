import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import NavbarC from "@/components/nav-bar";
import { NextUIProvider } from "@nextui-org/react";

import { ModalProvider } from "../providers/modal-provider";
import ToasterProvider from "../providers/toast-provider";

import Container from "@/components/ui/container";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tarif Dünyası",
  description: "En sevdiğiniz yemeklerin tarifi işte burada.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="tr">
        <body className={inter.className}>
        <Toaster />
          <NextUIProvider>
            <ToasterProvider />
            <ModalProvider />
            <NavbarC />
            <Container>
              {children}
              <Footer />
            </Container>
          </NextUIProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
