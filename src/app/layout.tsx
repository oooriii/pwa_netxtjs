import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PWA Next.js Template",
  description: "Template PWA amb Next.js + DDD + SOLID",
<<<<<<< HEAD
  manifest: "manifest.webmanifest",
=======
  manifest: "/manifest.webmanifest",
>>>>>>> origin/main
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
