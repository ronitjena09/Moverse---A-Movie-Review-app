import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "./Providers";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";

const inter = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "MoVerse - A Movie Search App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers>

        <Header />
        <Navbar />
        <SearchBox />
        {children}
      </Providers>
        </body>
    </html>
  );
}
