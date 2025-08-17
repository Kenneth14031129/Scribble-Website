import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SafeSvg from "../assets/Safe.svg";
import FunSvg from "../assets/Fun.svg";
import ExpertSvg from "../assets/Expert.svg";
import DoctorSvg from "../assets/Doctor.svg";
import CardSwap, { Card } from "../CardSwap/CardSwap";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [setScrollY] = useState(0);
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

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Two-column layout: Text on left, Doctor SVG on right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-160px)]">
            {/* Left side: Text content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Kid-Friendly Main Headline */}
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-none mb-8">
                  <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
                    Scribble
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    Therapy Center
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
                <p className="text-xl md:text-2xl text-blue-800 leading-relaxed mb-8">
                  Where healing happens through play and every child feels safe
                  to grow 🌱
                  <br className="hidden md:block" />
                  <span className="text-blue-900 font-medium">
                    Professional therapy that kids actually love!
                  </span>
                </p>
              </div>

              {/* Fun CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6 mb-12 transition-all duration-1000 delay-700 ${
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
            </div>

            {/* Right side: Doctor SVG */}
            <div className="relative flex items-center justify-center lg:justify-end overflow-visible">
              <div
                className={`transition-all duration-1000 delay-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <div className="relative">
                  {/* Decorative background circle */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-cyan-100/20 to-sky-200/30 rounded-full blur-3xl animate-pulse"
                    style={{
                      width: "800px",
                      height: "800px",
                      left: "-100px",
                      top: "-100px",
                    }}
                  ></div>

                  {/* Doctor SVG - Force Large Size */}
                  <img
                    src={DoctorSvg}
                    alt="Friendly Doctor"
                    className="relative z-10 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    style={{
                      width: "600px",
                      height: "auto",
                      minWidth: "600px",
                    }}
                  />

                  {/* Floating elements around doctor */}
                  <div
                    className="absolute text-5xl animate-pulse"
                    style={{
                      bottom: "120px",
                      left: "80px",
                      animationDuration: "2s",
                      animationDelay: "1s",
                    }}
                  >
                    ✨
                  </div>
                  <div
                    className="absolute text-5xl animate-bounce"
                    style={{
                      top: "200px",
                      left: "50px",
                      animationDuration: "4s",
                      animationDelay: "1.5s",
                    }}
                  >
                    🌟
                  </div>
                  <div
                    className="absolute text-4xl animate-pulse"
                    style={{
                      top: "300px",
                      right: "50px",
                      animationDuration: "3s",
                      animationDelay: "2s",
                    }}
                  >
                    🎨
                  </div>
                  <div
                    className="absolute text-4xl animate-bounce"
                    style={{
                      bottom: "200px",
                      right: "120px",
                      animationDuration: "2.5s",
                      animationDelay: "1.2s",
                    }}
                  >
                    🌈
                  </div>
                  <div
                    className="absolute text-3xl animate-pulse"
                    style={{
                      top: "150px",
                      right: "200px",
                      animationDuration: "3.5s",
                      animationDelay: "0.8s",
                    }}
                  >
                    🏥
                  </div>
                </div>
              </div>
            </div>
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
            {features.map((feature, index) => {
              // Define which SVG to use for each card
              const getSvgComponent = () => {
                switch (index) {
                  case 0:
                    return SafeSvg; // Safe & Caring
                  case 1:
                    return FunSvg; // Fun & Engaging
                  case 2:
                    return ExpertSvg; // Expert Care
                  default:
                    return SafeSvg;
                }
              };

              const SvgComponent = getSvgComponent();

              return (
                <div
                  key={feature.title}
                  className="group relative h-80 w-full perspective-1000"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Card Container with 3D Flip */}
                  <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                    {/* Front Side - SVG Only */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-2 border-blue-200 shadow-xl flex items-center justify-center p-8">
                      {/* SVG Container */}
                      <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={SvgComponent}
                          alt={feature.title}
                          className="w-full h-full object-contain max-w-[240px] max-h-[240px] filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-500 to-sky-500 border-2 border-blue-400 shadow-2xl flex flex-col items-center justify-center p-8 text-center text-white overflow-hidden">
                      {/* Animated background */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                        <div
                          className="absolute bottom-0 left-0 w-28 h-28 bg-white/15 rounded-full blur-xl animate-pulse"
                          style={{ animationDelay: "1s" }}
                        ></div>
                      </div>

                      {/* Back content */}
                      <div className="relative z-10">
                        {/* Large emoji */}
                        <div
                          className="text-6xl mb-6 animate-bounce"
                          style={{ animationDuration: "2s" }}
                        >
                          {feature.emoji}
                        </div>

                        {/* Full description */}
                        <p className="text-white/95 text-lg leading-relaxed mb-6">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
          {/* Two-column layout: Text on left, CardSwap on right */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side: Text content */}
            <div className="space-y-8 flex flex-col justify-center min-h-[500px]">
              <h2 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
                Happy Parents
              </h2>
              <p className="text-xl text-blue-700 leading-relaxed mb-8">
                Real families sharing their amazing transformation stories 💫
              </p>

              {/* Additional content */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-200/50 transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl">💬</div>
                  <div>
                    <h3 className="font-bold text-blue-900 text-lg">
                      Real Stories
                    </h3>
                    <p className="text-blue-700">
                      Authentic experiences from loving families
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-200/50 transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl">🌟</div>
                  <div>
                    <h3 className="font-bold text-blue-900 text-lg">
                      Excellent Star Rated
                    </h3>
                    <p className="text-blue-700">Excellent care and results</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-200/50 transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <h3 className="font-bold text-blue-900 text-lg">
                      Proven Results
                    </h3>
                    <p className="text-blue-700">
                      Transformative outcomes for every child
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: CardSwap Container */}
            <div className="relative min-h-[500px] w-full flex items-center justify-center">
              {/* Desktop emoji */}
              <CardSwap
                width={420}
                height={320}
                cardDistance={40}
                verticalDistance={50}
                delay={4000}
                pauseOnHover={true}
                skewAmount={4}
                easing="elastic"
              >
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={testimonial.name}
                    customClass="bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-2 border-blue-200/50 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="w-full h-full p-6 flex flex-col justify-between relative overflow-hidden">
                      {/* Floating decoration */}
                      <div className="absolute top-4 right-4 text-2xl opacity-60">
                        {index === 0 ? "🌟" : index === 1 ? "💫" : "✨"}
                      </div>

                      {/* Quote mark */}
                      <div className="absolute -top-2 -left-2 text-4xl text-blue-300/40 font-serif">
                        "
                      </div>

                      {/* Main content */}
                      <div className="relative z-10 flex-1 flex flex-col justify-center">
                        {/* Testimonial text */}
                        <blockquote className="text-blue-900/90 font-medium leading-relaxed mb-4 italic text-center">
                          "{testimonial.content}"
                        </blockquote>

                        {/* Author info */}
                        <div className="flex items-center justify-center space-x-3 mb-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                          />
                          <div className="text-center">
                            <div className="font-bold text-blue-900 text-sm">
                              {testimonial.name}
                            </div>
                            <div className="text-blue-600 text-xs font-medium">
                              Parent of {testimonial.child}
                            </div>
                          </div>
                        </div>

                        {/* Star rating */}
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-lg">
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom gradient border */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 rounded-b-xl"></div>

                      {/* Floating heart */}
                      <div className="absolute bottom-2 right-2 text-lg animate-pulse">
                        💙
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
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
          className="absolute bottom-20 right-10 text-5xl animate-bounce"
          style={{ animationDuration: "4s" }}
        >
          🦋
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>
    </div>
  );
};

export default Home;
