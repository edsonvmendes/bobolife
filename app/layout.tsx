import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { SimulationHeartbeat } from "@/components/simulation-heartbeat";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Bob Inbox",
  description:
    "A social simulation inbox where Bob's relationships, drama, and group chats evolve in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--ink)]">
        <SimulationHeartbeat />
        {children}
      </body>
    </html>
  );
}
