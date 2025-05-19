import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-[#70587C] hover:text-[#C8B8DB] transition-colors duration-300">
                icosnet
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/Dashboard"
                className={`$${
                  isActive("/Dashboard")
                    ? "border-[#70587C] text-[#70587C]"
                    : "border-transparent text-gray-500 hover:border-[#C8B8DB] hover:text-[#70587C]"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300`}
              >
                Dashboard
              </Link>
              <Link
                to="/visiteurs"
                className={`$${
                  isActive("/visiteurs")
                    ? "border-[#70587C] text-[#70587C]"
                    : "border-transparent text-gray-500 hover:border-[#C8B8DB] hover:text-[#70587C]"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300`}
              >
                Visiteurs
              </Link>
              <Link
                to="/services"
                className={`$${
                  isActive("/services")
                    ? "border-[#70587C] text-[#70587C]"
                    : "border-transparent text-gray-500 hover:border-[#C8B8DB] hover:text-[#70587C]"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300`}
              >
                Services
              </Link>
              <Link
                to="/satisfaction"
                className={`$${
                  isActive("/satisfaction")
                    ? "border-[#70587C] text-[#70587C]"
                    : "border-transparent text-gray-500 hover:border-[#C8B8DB] hover:text-[#70587C]"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300`}
              >
                Satisfaction
              </Link>
              <Link
                to="/satisfaction-scan"
                className={`$${
                  isActive("/satisfaction-scan")
                    ? "border-[#70587C] text-[#70587C]"
                    : "border-transparent text-gray-500 hover:border-[#C8B8DB] hover:text-[#70587C]"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300`}
              >
                Scan Satisfaction
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
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
              className="inline-flex items-center justify-center p-2 rounded-md text-[#70587C] hover:text-[#C8B8DB] hover:bg-gray-100 transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/Dashboard"
            className={`$${
              isActive("/Dashboard")
                ? "bg-[#C8B8DB]/20 border-[#70587C] text-[#70587C]"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-[#C8B8DB] hover:text-[#70587C]"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300`}
          >
            Dashboard
          </Link>
          <Link
            to="/visiteurs"
            className={`$${
              isActive("/visiteurs")
                ? "bg-[#C8B8DB]/20 border-[#70587C] text-[#70587C]"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-[#C8B8DB] hover:text-[#70587C]"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300`}
          >
            Visiteurs
          </Link>
          <Link
            to="/services"
            className={`$${
              isActive("/services")
                ? "bg-[#C8B8DB]/20 border-[#70587C] text-[#70587C]"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-[#C8B8DB] hover:text-[#70587C]"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300`}
          >
            Services
          </Link>
          <Link
            to="/satisfaction"
            className={`$${
              isActive("/satisfaction")
                ? "bg-[#C8B8DB]/20 border-[#70587C] text-[#70587C]"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-[#C8B8DB] hover:text-[#70587C]"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300`}
          >
            Satisfaction
          </Link>
          <Link
            to="/satisfaction-scan"
            className={`$${
              isActive("/satisfaction-scan")
                ? "bg-[#C8B8DB]/20 border-[#70587C] text-[#70587C]"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-[#C8B8DB] hover:text-[#70587C]"
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300`}
          >
            Scan Satisfaction
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-[#C8B8DB] hover:text-[#70587C] transition-all duration-300"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
