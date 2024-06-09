// ThemeContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const customTheme = extendTheme({
    config: {
      initialColorMode: theme,
      useSystemColorMode: false,
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
