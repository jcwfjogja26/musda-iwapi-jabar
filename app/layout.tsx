import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUSDA IWAPI Jawa Barat",
  description:
    "Musyawarah Daerah Ikatan Wanita Pengusaha Indonesia Jawa Barat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}