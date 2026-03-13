import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PWA Next.js Template",
  description: "Template PWA amb Next.js + DDD + SOLID",
  manifest: "manifest.webmanifest",
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours

=======
};
>>>>>>> theirs
=======
};
>>>>>>> theirs
=======
};
>>>>>>> theirs
=======
};
>>>>>>> theirs

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
