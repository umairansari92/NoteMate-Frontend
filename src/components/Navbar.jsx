import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "./themeContext";


export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext); // using global theme

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="w-full bg-white/80 dark:bg-slate-900/70 backdrop-blur border-b border-gray-100 dark:border-slate-800 text-gray-900 dark:text-slate-100 shadow-sm px-6 py-3 flex items-center justify-between transition-colors">

      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}> 
        <img src="/images/logo-1.png" alt="NoteMate Logo" className="w-10 h-10 object-cover rounded" />
        <h1 className="text-lg font-semibold">NoteMate</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        <li className="hover:text-blue-600">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-blue-600">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="hover:text-blue-600">
          <Link to="/all-notes">All Notes</Link>
        </li>
      </ul>

      {/* Right Section Buttons */}
      <div className="flex items-center gap-3">
        
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <FiLogOut size={18} />
          Logout
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur z-1 shadow-md py-4 flex flex-col items-center gap-5 md:hidden border-b border-gray-100 dark:border-slate-800 text-gray-900 dark:text-white transition-colors">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
          <Link to="/all-notes" onClick={() => setIsMenuOpen(false)}>All Notes</Link>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </ul>
      )}
    </nav>
  );
}
