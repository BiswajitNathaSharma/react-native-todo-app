import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

export const lightColors = {
  background: "#F4F7FB",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  text: "#0B1220",
  subText: "#5B6B84",
  border: "#D6E0F0",
  input: "#FFFFFF",
  primary: "#7C3AED",
  shadow: "rgba(15, 23, 42, 0.10)",
};

export const darkColors = {
  background: "#050816",
  surface: "#0F172A",
  card: "#111827",
  text: "#F8FAFC",
  subText: "#94A3B8",
  border: "#1E293B",
  input: "#0B1120",
  primary: "#A855F7",
  shadow: "rgba(0, 0, 0, 0.45)",
};

export interface AppColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  subText: string;
  border: string;
  input: string;
  primary: string;
  shadow: string;
}

export type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeMode;
  colors: AppColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = useMemo(
    () => (theme === "dark" ? darkColors : lightColors),
    [theme],
  );

  const value = useMemo(
    () => ({
      theme,
      colors,
      toggleTheme,
    }),
    [theme, colors],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeProvider");
  }

  return context;
};
