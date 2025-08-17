import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-xl rotate-45 group-hover:rotate-[50deg] transition-transform duration-300 shadow-lg"></div>
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl rotate-12 group-hover:rotate-[15deg] transition-transform duration-300 opacity-70"></div>
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent group-hover:from-amber-500 group-hover:via-orange-500 group-hover:to-red-500 transition-all duration-300">
              Scribble
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                    isActive
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-orange-50 rounded-full scale-100"></div>
                  )}
                  <div className="absolute inset-0 bg-gray-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/contact"
              className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Contact Us</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-lg border border-orange-200 bg-orange-50/50 backdrop-blur-sm flex items-center justify-center hover:bg-orange-50/80 transition-all duration-300"
          >
            <div
              className={`w-5 h-0.5 bg-orange-600 rounded-full transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-orange-600 rounded-full transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "mt-1"
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-orange-600 rounded-full transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1" : "mt-1"
              }`}
            ></div>
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-orange-200/50 px-4 py-6 space-y-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-orange-50 text-orange-600 border border-orange-200"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-orange-200 space-y-3">
            <Link
              to="/contact"
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-base font-bold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center justify-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
