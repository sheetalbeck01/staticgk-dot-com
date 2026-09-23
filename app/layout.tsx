import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import { Orbitron } from "next/font/google";
import "./globals.css";
import QueryProvider from "./query-provider";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-body",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-logo-face",
  subsets: ["latin"],
  weight: "900",
});

export const metadata: Metadata = {
  title: "StaticGK.com — Practice Lucent's General Knowledge with MCQs",
  description:
    "Read a topic in Lucent's General Knowledge, find it on StaticGK.com by topic name or ref no., practice MCQs and save your progress.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${googleSansFlex.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
