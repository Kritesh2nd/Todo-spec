import React, {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

import {
  type ThemeMode,
  type ThemeColor,
  type ThemeValueContextType,
  type ThemeUpdateContextType,
} from "../type/index.tsx";

import { themeColorStyle } from "../constant/index.tsx";

const ThemeContext = createContext<ThemeValueContextType>({
  properties: themeColorStyle.light,
});

const ThemeContextUpdate = createContext<ThemeUpdateContextType>({
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
export const updateTheme = () => useContext(ThemeContextUpdate);

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const [properties, setProperties] = useState<ThemeColor>(
    themeColorStyle.light
  );

  const toggleTheme = () => {
    setProperties(
      mode === "light" ? themeColorStyle.dark : themeColorStyle.light
    );
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ properties }}>
      <ThemeContextUpdate value={{ toggleTheme }}>
        {children}
      </ThemeContextUpdate>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
