import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Next App",
  description: "A Next.js app with Tailwind and SCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
