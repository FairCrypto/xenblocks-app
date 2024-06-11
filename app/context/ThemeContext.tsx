"use client";
import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme?: string;
  changeTheme?: (nextTheme?: string) => void;
  isDark?: boolean;
}
export const ThemeContext = createContext<ThemeContextType>({});

const DARK_THEMES = {
  dark: true,
  synthwave: true,
  forest: true,
  aqua: true,
  black: true,
  luxury: true,
  dracula: true,
  business: true,
  night: true,
  coffee: true,
  dim: true,
  sunset: true,
  halloween: true,
};

type ThemeKey = keyof typeof DARK_THEMES;

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<string>("xenblocks");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   let defaultTheme = "myCustomTheme";
  //   if (
  //     window.matchMedia &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches
  //   ) {
  //     defaultTheme = "myCustomTheme";
  //   }
  //   setIsMounted(true);
  //   const storedTheme = localStorage.getItem("theme") || defaultTheme;
  //   setIsDark(DARK_THEMES[storedTheme as ThemeKey] ?? false);
  //   setTheme(storedTheme);
  // }, [theme]);

  useEffect(() => {
    setTheme("xenblocks");
    setIsMounted(true);

  }, []);

  if (!isMounted) return null;

  const changeTheme = (theme: any) => {
    // setTheme(theme);
    setIsDark(DARK_THEMES[theme as ThemeKey] ?? false);
    // localStorage.setItem("theme", theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, changeTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
