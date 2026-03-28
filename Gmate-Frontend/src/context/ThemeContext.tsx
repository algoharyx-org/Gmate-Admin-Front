import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState.ts";

const DarkModeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    },
    [isDarkMode],
  );

  function toggleDarkMode() {
    // Support for Chrome View Transitions API for "Rocket Fast" seamless cross-fade
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setIsDarkMode((isDark: boolean) => !isDark);
      });
    } else {
      setIsDarkMode((isDark: boolean) => !isDark);
    }
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { ThemeProvider, useDarkMode };
