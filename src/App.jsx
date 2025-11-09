import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const [theme, setTheme] = useState("light");

  console.log(theme)
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  return <AppRoutes />;

}

export default App
