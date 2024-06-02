// src/app/layout.js
import { Nunito } from "next/font/google";
import "./globals.css";
import AuthWrapper from "@/components/AuthWrapper";

const inter = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "MoVerse - A Movie Search App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
