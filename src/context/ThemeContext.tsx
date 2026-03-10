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

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("xenblocks");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTheme("xenblocks");
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const changeTheme = (theme?: string) => {
    setIsDark(DARK_THEMES[theme as ThemeKey] ?? false);
  };
  return (
    <ThemeContext.Provider value={{ theme, changeTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
