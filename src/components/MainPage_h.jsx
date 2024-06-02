// src/components/MainPage_h.jsx
import React from "react";
import Header from "@/components/Header";
import Providers from "@/app/Providers";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import { Nunito } from "next/font/google";

const inter = Nunito({ subsets: ["latin"] });

const MainPage_h = ({ children }) => {
  return (
    <Providers>
      <Header />
      <Navbar />
      <SearchBox />
      {children}
    </Providers>
  );
};

export default MainPage_h;
