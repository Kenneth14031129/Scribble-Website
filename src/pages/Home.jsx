import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [floatingElements, setFloatingElements] = useState([]);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Generate floating elements for kid-friendly atmosphere
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
      shape: ["circle", "star", "heart", "triangle"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setFloatingElements(elements);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const stats = [
    { number: "500+", label: "Happy Kids", emoji: "😊" },
    { number: "50+", label: "Therapists", emoji: "👩‍⚕️" },
    { number: "24/7", label: "Care Support", emoji: "🤗" },
    { number: "5", label: "Parent Rating", emoji: "⭐" },
  ];

  const features = [
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: "Safe & Caring",
      description:
        "A warm, secure environment where children feel comfortable to express themselves and grow",
      emoji: "🛡️",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
      title: "Fun & Engaging",
      description:
        "Interactive therapy sessions that feel like play, making healing an enjoyable journey",
      emoji: "🎨",
      color: "from-cyan-400 to-blue-400",
    },
    {
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Expert Care",
      description:
        "Licensed child therapists specialized in helping kids overcome challenges and thrive",
      emoji: "👨‍⚕️",
      color: "from-blue-400 to-indigo-400",
    },
  ];

  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Parent",
      child: "Emma, age 8",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face",
      content:
        "Emma loves coming to Scribble! The therapists are amazing and she has made incredible progress with her anxiety.",
    },
    {
      name: "David Chen",
      role: "Parent",
      child: "Lucas, age 6",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      content:
        "The play therapy approach helped Lucas open up in ways we never imagined. Thank you for giving our son his confidence back!",
    },
    {
      name: "Jennifer Smith",
      role: "Parent",
      child: "Sophia, age 10",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      content:
        "Sophia actually looks forward to her sessions! The team made therapy feel like a fun adventure rather than something scary.",
    },
  ];

  const renderFloatingShape = (element) => {
    const baseClasses = "absolute animate-float opacity-40";
    const colors = [
      "bg-blue-300",
      "bg-cyan-300",
      "bg-sky-300",
      "bg-indigo-300",
    ];
    const colorClass = colors[element.id % colors.length];

    switch (element.shape) {
      case "star":
        return (
          <div
            key={element.id}
            className={`${baseClasses} ${colorClass}`}
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
        );
      case "heart":
        return (
          <div
            key={element.id}
            className={`${baseClasses} ${colorClass}`}
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              transform: "rotate(-45deg)",
            }}
          />
        );
      case "triangle":
        return (
          <div
            key={element.id}
            className={`${baseClasses} ${colorClass}`}
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
        );
      default:
        return (
          <div
            key={element.id}
            className={`${baseClasses} ${colorClass} rounded-full`}
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-sky-100">
      {/* Floating Animation Styles + 3D Card Flip */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) rotate(270deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "80px" }}
      >
        {/* Dynamic Blue Gradient Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-200 via-cyan-100 to-sky-200 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
            }}
          />

          {/* Kid-Friendly Floating Shapes */}
          {floatingElements.map(renderFloatingShape)}

          {/* Additional decorative elements */}
          <div
            className="absolute top-10 right-10 text-6xl animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            🌟
          </div>
          <div
            className="absolute top-1/4 left-10 text-4xl animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            🌈
          </div>
          <div
            className="absolute bottom-20 left-10 text-5xl animate-bounce"
            style={{ animationDuration: "4s" }}
          >
            🎈
          </div>
          <div
            className="absolute bottom-32 right-20 text-4xl animate-pulse"
            style={{ animationDuration: "2.5s" }}
          >
            ☁️
          </div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Kid-Friendly Main Headline */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-black leading-none mb-8">
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
                Scribble Therapy Center
              </span>
            </h1>
          </div>

          {/* Warm, Parent-Focused Subtitle */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xl md:text-2xl text-blue-800 max-w-4xl mx-auto leading-relaxed mb-16">
              Where healing happens through play and every child feels safe to
              grow 🌱
              <br className="hidden md:block" />
              <span className="text-blue-900 font-medium">
                Professional therapy that kids actually love!
              </span>
            </p>
          </div>

          {/* Fun CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              to="/contact"
              className="group relative px-12 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 text-lg"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>🎨 Start Their Journey</span>
              </span>
            </Link>
          </div>

          {/* Fun Stats with Emojis */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group p-6 bg-white/90 backdrop-blur-sm border-2 border-blue-200 rounded-3xl hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-2">{stat.emoji}</div>
                <div className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-blue-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Why Kids Love Us */}
      <section
        ref={featuresRef}
        className="py-32 bg-gradient-to-b from-blue-50 via-white to-cyan-50 relative"
      >
        {/* Decorative elements */}
        <div
          className="absolute top-10 left-10 text-5xl animate-spin"
          style={{ animationDuration: "8s" }}
        >
          🌺
        </div>
        <div
          className="absolute top-20 right-20 text-4xl animate-pulse"
          style={{ animationDuration: "3s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-20 left-1/4 text-6xl animate-bounce"
          style={{ animationDuration: "4s" }}
        >
          🦋
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
              Our Therapy
            </h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              We make therapy feel like the best playtime ever, where every
              child discovers their superpowers! 🦸‍♀️🦸‍♂️
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative h-80 w-full perspective-1000"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Card Container with 3D Flip */}
                <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                  
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl flex flex-col items-center justify-center p-8 text-center">
                    {/* Floating background elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-blue-300/20 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-cyan-300/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    
                    {/* Main Icon */}
                    <div className="relative mb-6">
                      <div className={`w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-4 border-white`}>
                        <div className="text-4xl">{feature.emoji}</div>
                      </div>
                      {/* Pulsing ring */}
                      <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping"></div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">
                      {feature.title}
                    </h3>
                    
                    {/* Brief description */}
                    <p className="text-blue-700 text-sm leading-relaxed">
                      {feature.description.split(' ').slice(0, 8).join(' ')}...
                    </p>
                    
                    {/* Hover indicator */}
                    <div className="absolute bottom-4 right-4 text-blue-400 opacity-70">
                      <div className="text-2xl animate-bounce">✨</div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-500 to-sky-500 border-2 border-blue-400 shadow-2xl flex flex-col items-center justify-center p-8 text-center text-white overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                      <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                    
                    {/* Back content */}
                    <div className="relative z-10">
                      {/* Large emoji */}
                      <div className="text-6xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>
                        {feature.emoji}
                      </div>
                      
                      {/* Full description */}
                      <p className="text-white/95 text-lg leading-relaxed mb-6">
                        {feature.description}
                      </p>
                      
                      {/* Interactive elements based on feature */}
                      {index === 0 && (
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <div className="text-2xl mb-1">🔒</div>
                            <div className="text-xs font-medium">Secure</div>
                          </div>
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <div className="text-2xl mb-1">🤗</div>
                            <div className="text-xs font-medium">Caring</div>
                          </div>
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <div className="text-2xl mb-1">🏠</div>
                            <div className="text-xs font-medium">Safe</div>
                          </div>
                        </div>
                      )}
                      
                      {index === 1 && (
                        <div className="flex justify-center space-x-4">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                            <div className="text-2xl">🎪</div>
                          </div>
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                            <div className="text-2xl">🎲</div>
                          </div>
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
                            <div className="text-2xl">🎈</div>
                          </div>
                        </div>
                      )}
                      
                      {index === 2 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-center space-x-3 p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <div className="text-xl">🏆</div>
                            <span className="text-sm font-medium">Licensed Professionals</span>
                          </div>
                          <div className="flex items-center justify-center space-x-3 p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <div className="text-xl">📚</div>
                            <span className="text-sm font-medium">Child Psychology Experts</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-white via-blue-50 to-cyan-50 relative">
        {/* Decorative background elements */}
        <div
          className="absolute top-16 right-16 text-5xl animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          💙
        </div>
        <div
          className="absolute bottom-16 left-16 text-4xl animate-pulse"
          style={{ animationDuration: "2s" }}
        >
          🌟
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
              Happy Parents
            </h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              Real families sharing their amazing transformation stories 💫
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="group p-8 bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-blue-200 hover:border-cyan-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-blue-300"
                  />
                  <div>
                    <div className="font-bold text-blue-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-cyan-600">
                      {testimonial.child}
                    </div>
                  </div>
                </div>

                <p className="text-blue-800 leading-relaxed text-lg mb-6">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl text-yellow-400">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <div className="text-2xl">💙</div>
                </div>

                {/* Cute decorative bottom border */}
                <div className="mt-6 h-2 bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-300 rounded-full group-hover:animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-cyan-500 to-sky-400 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20"></div>
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Floating fun elements */}
        <div
          className="absolute top-10 left-10 text-6xl animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          🎈
        </div>
        <div
          className="absolute top-20 right-20 text-5xl animate-spin"
          style={{ animationDuration: "6s" }}
        >
          🌟
        </div>
        <div
          className="absolute bottom-10 left-1/4 text-7xl animate-pulse"
          style={{ animationDuration: "2s" }}
        >
          🌈
        </div>
        <div
          className="absolute bottom-20 right-10 text-5xl animate-bounce"
          style={{ animationDuration: "4s" }}
        >
          🦋
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div
            className="text-8xl mb-8 animate-bounce"
            style={{ animationDuration: "2s" }}
          >
            🎨
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8">
            Ready to Start Your
            <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              Child's Journey?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Book a free consultation and let's create a personalized therapy
            plan that your child will love!
            <span className="text-white font-bold">
              🌟 No pressure, just pure care! 🌟
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <Link
              to="/contact"
              className="group relative px-12 py-5 bg-white text-blue-600 font-black rounded-full hover:bg-yellow-100 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-white/25 text-xl border-4 border-yellow-300"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>🎯 Book Free Session</span>
              </span>
            </Link>

            <Link
              to="/about"
              className="group px-12 py-5 border-4 border-white text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-xl"
            >
              <span className="flex items-center space-x-2">
                <span>💫 Learn More</span>
              </span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-white font-semibold text-sm">Licensed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <div className="text-white font-semibold text-sm">Safe</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">😊</div>
              <div className="text-white font-semibold text-sm">Fun</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💙</div>
              <div className="text-white font-semibold text-sm">Caring</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
