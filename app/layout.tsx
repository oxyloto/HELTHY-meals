import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HELTHY Meals - Concept Board",
  description: "Dijital konsept geliştirme workspace'i - Sağlıklı meal vending projesi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
