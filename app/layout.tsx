import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Folder São Bento do Sul — A4 tríptico",
  description: "Folder turístico editável sobre São Bento do Sul, Santa Catarina.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
