import React, { createContext, useState } from "react";
import Home from "../Components/Home/Home";

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <div className="App">
        <Home />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
