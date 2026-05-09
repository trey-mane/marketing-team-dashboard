import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Team Dashboard — Micheletti Media",
  description: "Micheletti Media Marketing Team Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
