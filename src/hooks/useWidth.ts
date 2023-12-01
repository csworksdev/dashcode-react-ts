import { useState, useMemo } from "react";

interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

interface WidthData {
  width: number;
  breakpoints: Breakpoints;
}

export default function useWidth(): WidthData {
  const [width, setWidth] = useState(window.innerWidth);

  const breakpoints: Breakpoints = {
    sm: "640",
    md: "768",
    lg: "1024",
    xl: "1280",
  };

  useMemo(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, breakpoints };
}