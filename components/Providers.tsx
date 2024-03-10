"use client";
import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return children;

  return <ThemeProvider forcedTheme="light" attribute="class">{children}</ThemeProvider>;
};

export default Providers;
