import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/auth-provider";
import { IconsProvider } from "../context/IconsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IconWizard - Generate Designer-Grade iOS App Icons",
  description: "Create stunning iOS app icons in seconds. No design skills required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <IconsProvider>
            {children}
          </IconsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
