import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Error = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-amber-200/20 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)`,
          }}
        />

        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute bg-gradient-to-br from-orange-300/30 to-amber-300/30 rounded-full blur-xl animate-pulse"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 404 Text with Glitch Effect */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black text-orange-900 relative">
            <span className="relative z-10 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              404
            </span>

            {/* Glitch Layers */}
            <span
              className="absolute inset-0 text-orange-400 opacity-70 animate-ping"
              style={{ animationDuration: "3s" }}
            >
              404
            </span>
            <span
              className="absolute inset-0 text-amber-400 opacity-50 transform translate-x-1 translate-y-1 animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              404
            </span>
          </h1>

          {/* Decorative Lines */}
          <div className="absolute -top-4 -left-4 w-16 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-1 bg-gradient-to-l from-amber-500 to-transparent rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-900">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-orange-700 max-w-2xl mx-auto leading-relaxed">
            Looks like you've ventured into uncharted digital territory. The
            page you're looking for has either moved, been deleted, or is hiding
            in another dimension.
          </p>
        </div>

        {/* Interactive Elements */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/"
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Home</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group px-8 py-4 border-2 border-orange-300 text-orange-700 font-semibold rounded-2xl hover:border-orange-400 hover:bg-orange-100 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                />
              </svg>
              <span>Go Back</span>
            </span>
          </button>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-300/20 to-transparent rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-amber-300/20 to-transparent rounded-tl-full"></div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-400/10 to-transparent animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>
    </div>
  );
};

export default Error;
