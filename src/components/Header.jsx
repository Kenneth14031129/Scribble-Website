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
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl rotate-45 group-hover:rotate-[50deg] transition-transform duration-300"></div>
              <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl rotate-12 group-hover:rotate-[15deg] transition-transform duration-300 opacity-70"></div>
            </div>
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
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-50 rounded-full scale-100"></div>
                  )}
                  <div className="absolute inset-0 bg-gray-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/80 transition-all duration-300"
          >
            <div
              className={`w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "mt-1"
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${
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
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50 px-4 py-6 space-y-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-100"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
