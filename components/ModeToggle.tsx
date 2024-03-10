"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

const ModeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      <Image
        src={`icons/${currentTheme === "light" ? "lightMode" : "darkMode"}.svg`}
        height={32}
        width={32}
        alt="svg"
      />
    </button>
  );
};

export default ModeToggle;
