import React, { useContext, useLayoutEffect, useState } from 'react';

const ThemeContext = React.createContext(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const STORAGE_KEY = 'user-color-scheme';

  const [isDark, setIsDark] = useState(); // Set button position
  const [themeMode] = useState(localStorage.getItem(STORAGE_KEY));

  const userMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const root = document.documentElement;

  const initialTheme = () => {
    const applyTheme = (firstColorMode, secondColorMode, boolean) => {
      if (!themeMode) return setIsDark(boolean);
      if (themeMode === firstColorMode) {
        root.setAttribute('data-user-color-scheme', firstColorMode);
        return setIsDark(boolean);
      }
      if (themeMode === secondColorMode) {
        root.setAttribute('data-user-color-scheme', secondColorMode);
        return setIsDark(!boolean);
      }
      return setIsDark(!boolean);
    };

    userMode
      ? applyTheme('dark', 'light', true)
      : applyTheme('light', 'dark', false);
  };

  const changeTheme = () => {
    const applyNewTheme = (mode, boolean) => {
      document.documentElement.setAttribute('data-user-color-scheme', mode);
      localStorage.setItem(STORAGE_KEY, mode);

      return setIsDark(boolean);
    };

    isDark ? applyNewTheme('light', false) : applyNewTheme('dark', true);
  };

  useLayoutEffect(() => {
    initialTheme();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider
      value={{ themeIsDark: [isDark, setIsDark], changeTheme: changeTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
