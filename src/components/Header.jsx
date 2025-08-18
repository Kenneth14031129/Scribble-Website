import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

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

  // Close menu when clicking outside or resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest("header")) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo - More responsive sizing */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-lg sm:rounded-xl rotate-45 group-hover:rotate-[50deg] transition-transform duration-300 shadow-lg"></div>
              <div className="absolute inset-0 w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-lg sm:rounded-xl rotate-12 group-hover:rotate-[15deg] transition-transform duration-300 opacity-70"></div>
            </div>
            <span className="text-base xs:text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent group-hover:from-amber-500 group-hover:via-orange-500 group-hover:to-red-500 transition-all duration-300">
              Scribble
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`relative px-4 xl:px-6 py-2 xl:py-2.5 rounded-full text-sm xl:text-base font-medium transition-all duration-300 group whitespace-nowrap ${
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

          {/* Tablet Navigation (medium screens) */}
          <div className="hidden md:flex lg:hidden items-center space-x-1">
            {navItems.slice(0, 2).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* More button for tablet */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-300"
            >
              More
            </button>
          </div>

          {/* CTA Button - Responsive sizing */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="group relative px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs sm:text-sm lg:text-base font-bold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 whitespace-nowrap"
            >
              <span className="relative z-10">
                <span className="hidden sm:inline">Contact Us</span>
                <span className="sm:hidden">Contact</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-orange-200 bg-orange-50/50 backdrop-blur-sm flex items-center justify-center hover:bg-orange-50/80 transition-all duration-300 active:scale-95"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-5 h-5">
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                }`}
              >
                <Menu className="w-5 h-5 text-orange-600" />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                }`}
              >
                <X className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-orange-200/50 px-3 sm:px-4 py-4 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-orange-50 text-orange-600 border border-orange-200"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-orange-200/30">
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="block w-full px-3 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-base font-bold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-98 text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
