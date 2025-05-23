// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // Clears token from Zustand and localStorage
    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClasses = (path) =>
    `${
      isActive(path)
        ? "border-[#70587C] text-[#70587C]"
        : "border-transparent text-gray-500 hover:border-[#C8B8DB] hover:text-[#70587C]"
    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300`;

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#70587C]">Spintechs</h1>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 ml-8">
              <Link to="/dashboard" className={navLinkClasses("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/visiteurs" className={navLinkClasses("/visiteurs")}>
                Visiteurs
              </Link>
              <Link to="/services" className={navLinkClasses("/services")}>
                Services
              </Link>
              <Link to="/visites" className={navLinkClasses("/visites")}>
                Visites
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <button
              onClick={handleLogout}
              className="bg-[#70587C] text-white px-4 py-2 rounded-lg hover:bg-[#C8B8DB] transition-colors duration-300"
            >
              Déconnexion
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#70587C] hover:text-[#C8B8DB]"
            >
              {isMobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-1">
          <Link to="/dashboard" className={navLinkClasses("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/visiteurs" className={navLinkClasses("/visiteurs")}>
            Visiteurs
          </Link>
          <Link to="/services" className={navLinkClasses("/services")}>
            Services
          </Link>
          <Link to="/visites" className={navLinkClasses("/visites")}>
            Visites
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left text-gray-500 hover:text-[#70587C]"
          >
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
}
