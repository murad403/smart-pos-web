"use client";
import { useEffect, useState } from "react";
import Splash from "@/components/shared/Splash";
import WelCome from "@/components/shared/Welcome";



const Page = () => {
  const [showSplash, setShowSplash] = useState(() => true);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return showSplash ? <Splash /> : <WelCome />;
};

export default Page;
