// src/components/AuthWrapper.jsx
'use client';
import MainPage_h from "./MainPage_h";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("Checking authentication status...");
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      console.log("User is logged in");
    } else {
      console.log("User is not logged in, redirecting to login or signup page");
      if (pathname !== "/auth/login" && pathname !== "/auth/signup") {
        router.push("/auth/login");
      }
    }
  }, [pathname, router]);

  if (pathname === "/auth/login" || pathname === "/auth/signup") {
    return children;
  }

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return <MainPage_h>{children}</MainPage_h>;
};

export default AuthWrapper;
