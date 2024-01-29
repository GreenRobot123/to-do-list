import React, { useEffect, createContext, useState } from "react";

const ThemeContext = createContext();
const body = document.body;

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "dark-theme");
    return "dark-theme";
  } else {
    if (theme === "dark-theme") {
      body.style.backgroundImage =
        'url("https://i.pinimg.com/736x/b9/61/b0/b961b03ae9112674e1278849bc27732f.jpg")';
    } else {
      body.style.backgroundImage =
        'url("https://img.freepik.com/free-vector/cute-cafe-background-pink-wallpaper-vector_53876-136842.jpg?w=1380&t=st=1701933521~exp=1701934121~hmac=6e8fa70c0a102334291a6d072c28ec718dfa260d9451acffb590dac305afae17")';
    }
    return theme;
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    if (theme === "dark-theme") {
      body.style.backgroundImage =
        'url("https://img.freepik.com/free-vector/cute-cafe-background-pink-wallpaper-vector_53876-136842.jpg?w=1380&t=st=1701933521~exp=1701934121~hmac=6e8fa70c0a102334291a6d072c28ec718dfa260d9451acffb590dac305afae17")';
      setTheme("light-theme");
    } else {
      body.style.backgroundImage =
        'url("https://i.pinimg.com/736x/b9/61/b0/b961b03ae9112674e1278849bc27732f.jpg")';
      setTheme("dark-theme");
    }
  }

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem("theme", theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
