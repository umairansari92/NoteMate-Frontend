import { useContext } from "react";
import { ThemeContext } from "../utils/themeContext";

function Toggler() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-full border hover:opacity-80 transition"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default Toggler;
