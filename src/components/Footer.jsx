import { Link } from "react-router-dom";
import HandsSvg from "../assets/Hands1.svg";

const Footer = () => {
  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      name: "Instagram",
      href: "#",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      name: "YouTube",
      href: "#",
      icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
  ];

  const footerLinks = {
    services: [
      { name: "Play Therapy", href: "/services" },
      { name: "Family Counseling", href: "/services" },
      { name: "Group Sessions", href: "/services" },
      { name: "Assessment", href: "/services" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link to="/" className="flex items-center space-x-3 group mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-500 rounded-xl rotate-45 group-hover:rotate-[50deg] transition-transform duration-500 shadow-lg"></div>
                  <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl rotate-12 group-hover:rotate-[15deg] transition-transform duration-500 opacity-70"></div>
                </div>
                <div>
                  <span className="block text-2xl font-black bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                    Scribble
                  </span>
                  <span className="block text-sm text-orange-700 font-medium">
                    Therapy Center
                  </span>
                </div>
              </Link>

              <p className="text-orange-800 text-lg leading-relaxed mb-8 max-w-md">
                Where healing happens through play and every child feels safe to
                grow. Professional therapy that kids actually love! 🌱
              </p>

              {/* Enhanced Social Links */}
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="group relative p-3 rounded-2xl bg-orange-100/50 backdrop-blur-sm border border-orange-200/50 hover:bg-orange-200/60 hover:border-orange-300/60 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-orange-600 group-hover:text-orange-800 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={social.icon} />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 to-amber-300/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {/* Services */}
                <div>
                  <h3 className="text-orange-900 font-bold text-sm uppercase tracking-wider mb-6 relative flex items-center space-x-2">
                    <span>🎨 Our Services</span>
                    <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
                  </h3>
                  <ul className="space-y-4">
                    {footerLinks.services.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-orange-700 hover:text-orange-900 transition-colors duration-300 text-sm flex items-center space-x-2 group"
                        >
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-orange-900 font-bold text-sm uppercase tracking-wider mb-6 relative flex items-center space-x-2">
                    <span>🏠 Company</span>
                    <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                  </h3>
                  <ul className="space-y-4">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-orange-700 hover:text-orange-900 transition-colors duration-300 text-sm flex items-center space-x-2 group"
                        >
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hands SVG Section */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={HandsSvg}
                      alt="Caring Hands"
                      className="w-64 h-64 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-orange-200/30">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-orange-700 text-sm">
                  © 2024 Scribble Therapy Center. All rights reserved.
                </p>
                <div className="h-4 w-px bg-orange-300/30"></div>
                <p className="text-orange-600 text-xs flex items-center space-x-1">
                  <span>Made with</span>
                  <span className="text-red-400 animate-pulse">💙</span>
                  <span>for families</span>
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-orange-100/60 border border-orange-200/50 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-orange-700 text-xs">
                    Licensed & Certified
                  </span>
                </div>

                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-200/40 to-amber-200/40 border border-orange-300/40 text-orange-700 text-sm rounded-full hover:from-orange-300/50 hover:to-amber-300/50 hover:border-orange-400/60 transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  <span>Back to top</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"></div>
    </footer>
  );
};

export default Footer;
