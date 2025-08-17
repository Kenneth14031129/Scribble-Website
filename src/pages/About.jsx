/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Star, Users, Target, Sparkles } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

import HandsSvg from "../assets/Hands1.svg";

// Timeline Progress Component with Scroll-based Animation
const TimelineProgress = ({ timelineEvents }) => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={timelineRef} className="relative">
      {/* Central Timeline Line Background */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-200 via-amber-200 to-yellow-200 rounded-full opacity-30" />

      {/* Animated Central Timeline Line */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 via-amber-500 to-yellow-500 rounded-full origin-top"
        style={{ height: lineHeight }}
      />

      {/* Glowing Effect */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-gradient-to-b from-orange-400 via-amber-400 to-yellow-400 rounded-full blur-sm origin-top opacity-60"
        style={{ height: lineHeight }}
      />

      {/* Timeline Events */}
      <div className="space-y-24 relative z-10">
        {timelineEvents.map((event, index) => {
          const isLeft = index % 2 === 0;
          const eventProgress = (index + 1) / timelineEvents.length;
          const nodeOpacity = useTransform(
            scrollYProgress,
            [eventProgress - 0.1, eventProgress],
            [0, 1]
          );
          const nodeScale = useTransform(
            scrollYProgress,
            [eventProgress - 0.1, eventProgress],
            [0.5, 1]
          );

          return (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              {/* Timeline Node with Scroll Animation */}
              <motion.div
                style={{ opacity: nodeOpacity, scale: nodeScale }}
                className="absolute left-1/2 transform -translate-x-1/2 z-20"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 bg-gradient-to-r ${event.color} rounded-full flex items-center justify-center border-4 border-white shadow-xl`}
                >
                  <span className="text-2xl">{event.icon}</span>
                </motion.div>

                {/* Pulsing Ring Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${event.color} rounded-full border-4 border-white opacity-30`}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                className={`w-full lg:w-5/12 ${isLeft ? "pr-16" : "pl-16"}`}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-orange-100 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                  <div className={`${isLeft ? "text-left" : "text-right"}`}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className={`inline-block px-4 py-2 bg-gradient-to-r ${event.color} text-white rounded-full text-lg font-bold mb-4 shadow-lg`}
                    >
                      {event.year}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-orange-900 mb-4">
                      {event.title}
                    </h3>
                    <p className="text-orange-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Multi-Card Team Carousel Component
const TeamCarousel = ({ team }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const paginate = (newDirection) => {
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === team.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? team.length - 1 : prevIndex - 1;
      }
    });
  };

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const getCardPosition = (index) => {
    const diff = index - currentIndex;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(team.length - 1)) return "right1";
    if (diff === 2 || diff === -(team.length - 2)) return "right2";
    if (diff === -1 || diff === team.length - 1) return "left1";
    if (diff === -2 || diff === team.length - 2) return "left2";
    return "hidden";
  };

  const getCardVariants = (position) => {
    switch (position) {
      case "center":
        return {
          x: 0,
          scale: 1,
          zIndex: 5,
          opacity: 1,
          rotateY: 0,
        };
      case "left1":
        return {
          x: -180,
          scale: 0.85,
          zIndex: 4,
          opacity: 0.8,
          rotateY: 20,
        };
      case "left2":
        return {
          x: -340,
          scale: 0.7,
          zIndex: 3,
          opacity: 0.6,
          rotateY: 35,
        };
      case "right1":
        return {
          x: 180,
          scale: 0.85,
          zIndex: 4,
          opacity: 0.8,
          rotateY: -20,
        };
      case "right2":
        return {
          x: 340,
          scale: 0.7,
          zIndex: 3,
          opacity: 0.6,
          rotateY: -35,
        };
      case "hidden":
        return {
          x: 0,
          scale: 0.5,
          zIndex: 1,
          opacity: 0,
          rotateY: 0,
        };
      default:
        return {
          x: 0,
          scale: 0.5,
          zIndex: 1,
          opacity: 0,
          rotateY: 0,
        };
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Multi-Card Display */}
      <div className="relative h-[600px] flex items-start justify-center overflow-hidden pt-16">
        {team.map((member, index) => {
          const position = getCardPosition(index);
          const isSelected = index === currentIndex;
          const variants = getCardVariants(position);

          return (
            <motion.div
              key={member.name}
              className="absolute w-80 cursor-pointer"
              animate={variants}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              onClick={() => setCurrentIndex(index)}
              whileHover={
                isSelected ? { scale: 1.02, y: -5 } : { scale: 0.9, y: -3 }
              }
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={`rounded-3xl shadow-2xl overflow-hidden border-2 transition-all duration-500 ${
                  isSelected
                    ? "border-orange-300 bg-white"
                    : "border-gray-300 bg-gray-100"
                }`}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-96">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isSelected ? "" : "grayscale brightness-75"
                    }`}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: isSelected ? 1 : 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isSelected
                        ? "bg-gradient-to-t from-orange-900/30 to-transparent"
                        : "bg-gradient-to-t from-gray-900/60 to-gray-400/30"
                    }`}
                  />
                </div>
              </div>

              {/* Name and Position - Only for Selected Card */}
              {isSelected && (
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="text-lg font-bold mb-1 text-orange-900">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-orange-600">
                    {member.role}
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-16 z-20">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgb(249 115 22)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(-1)}
          className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -right-16 z-20">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgb(249 115 22)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(1)}
          className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingElements, setFloatingElements] = useState([]);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Generate floating elements for kid-friendly atmosphere
    const elements = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      size: Math.random() * 30 + 15,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
      shape: ["circle", "star", "heart"][Math.floor(Math.random() * 3)],
    }));
    setFloatingElements(elements);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const renderFloatingShape = (element) => {
    const baseClasses = "absolute animate-float opacity-30";
    const colors = [
      "bg-orange-300",
      "bg-amber-300",
      "bg-yellow-300",
      "bg-red-300",
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

  const values = [
    {
      icon: Star,
      title: "Child-Centered Care",
      description:
        "Every therapy plan is uniquely crafted around your child's personality, interests, and needs.",
      color: "from-orange-400 to-amber-400",
    },
    {
      icon: Users,
      title: "Family Partnership",
      description:
        "We work closely with families to ensure therapy extends beyond our sessions into daily life.",
      color: "from-amber-400 to-yellow-400",
    },
    {
      icon: Target,
      title: "Evidence-Based",
      description:
        "Our methods are grounded in research and proven to deliver lasting positive outcomes.",
      color: "from-orange-400 to-red-400",
    },
    {
      icon: Sparkles,
      title: "Joyful Growth",
      description:
        "We believe healing happens best when children feel safe, happy, and engaged in the process.",
      color: "from-red-400 to-orange-400",
    },
  ];

  const timelineEvents = [
    {
      year: "2018",
      title: "The Vision Begins",
      description:
        "Dr. Sarah Mitchell founded Scribble Therapy Center with a simple yet powerful vision: create a place where children feel genuinely excited to engage in their healing journey.",
      icon: "🌱",
      color: "from-orange-400 to-amber-400",
    },
    {
      year: "2019",
      title: "First Breakthrough",
      description:
        "Our innovative play therapy approach helped 50+ children in the first year. Traditional therapy settings were transformed into magical playground experiences.",
      icon: "✨",
      color: "from-amber-400 to-yellow-400",
    },
    {
      year: "2020",
      title: "Adapting & Growing",
      description:
        "During challenging times, we pioneered virtual therapy sessions for kids, ensuring continuous care while maintaining the joy and engagement children love.",
      icon: "🌈",
      color: "from-yellow-400 to-orange-400",
    },
    {
      year: "2021",
      title: "Expanding Our Team",
      description:
        "Added specialized therapists in autism support, family therapy, and behavioral care. Our multidisciplinary approach began helping more diverse needs.",
      icon: "👥",
      color: "from-orange-400 to-red-400",
    },
    {
      year: "2023",
      title: "Recognition & Awards",
      description:
        "Received the 'Child-Friendly Healthcare Excellence Award' and expanded to serve 200+ families annually with 95% success rate.",
      icon: "🏆",
      color: "from-red-400 to-orange-400",
    },
    {
      year: "2024",
      title: "500+ Families Served",
      description:
        "Reached the milestone of helping over 500 families discover joy in growth. Every scribble continues to tell a story of resilience and transformation.",
      icon: "💫",
      color: "from-orange-400 to-amber-400",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Clinical Director & Child Psychologist",
      experience: "15+ years",
      specialties: ["Anxiety & Depression", "Trauma Recovery", "ADHD Support"],
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      fun: "Loves painting with watercolors and has two rescue cats! 🐱",
    },
    {
      name: "Maria Gonzalez",
      role: "Licensed Play Therapist",
      experience: "10+ years",
      specialties: ["Play Therapy", "Social Skills", "Behavioral Support"],
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      fun: "Marathon runner who makes the best homemade cookies! 🍪",
    },
    {
      name: "Dr. James Park",
      role: "Child & Family Therapist",
      experience: "12+ years",
      specialties: ["Family Therapy", "Autism Support", "Communication"],
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      fun: "Board game enthusiast and weekend hiking adventurer! 🎲",
    },
    {
      name: "Dr. Emily Watson",
      role: "Behavioral Specialist",
      experience: "8+ years",
      specialties: [
        "Behavioral Therapy",
        "ADHD Support",
        "Learning Disabilities",
      ],
      image:
        "https://images.unsplash.com/photo-1594824388295-7c64464062b3?w=300&h=300&fit=crop&crop=face",
      fun: "Yoga instructor who loves baking organic treats for the kids! 🧘‍♀️",
    },
    {
      name: "Michael Chen",
      role: "Art & Music Therapist",
      experience: "7+ years",
      specialties: ["Art Therapy", "Music Therapy", "Creative Expression"],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      fun: "Professional guitarist who plays at local children's hospitals! 🎸",
    },
    {
      name: "Dr. Rachel Thompson",
      role: "Developmental Psychologist",
      experience: "11+ years",
      specialties: [
        "Autism Spectrum",
        "Developmental Delays",
        "Early Intervention",
      ],
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face",
      fun: "Rock climbing enthusiast and children's book author! 📚",
    },
    {
      name: "Alex Rivera",
      role: "Speech & Language Therapist",
      experience: "9+ years",
      specialties: [
        "Speech Therapy",
        "Language Development",
        "Communication Skills",
      ],
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      fun: "Fluent in 4 languages and teaches pottery on weekends! 🏺",
    },
    {
      name: "Dr. Sophia Lee",
      role: "Child Psychiatrist",
      experience: "14+ years",
      specialties: [
        "Child Psychiatry",
        "Medication Management",
        "Crisis Intervention",
      ],
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba94c3a?w=300&h=300&fit=crop&crop=face",
      fun: "Competitive swimmer and volunteer at animal shelters! 🏊‍♀️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100">
      {/* Floating Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(90deg);
          }
          50% {
            transform: translateY(-8px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(5deg);
          }
          75% {
            transform: rotate(-5deg);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "80px" }}
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-200 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)`,
            }}
          />

          {/* Kid-Friendly Floating Shapes */}
          {floatingElements.map(renderFloatingShape)}

          {/* Decorative elements */}
          <div
            className="absolute top-20 left-16 text-4xl animate-wave"
            style={{ animationDuration: "2s" }}
          >
            🌈
          </div>
          <div
            className="absolute bottom-32 right-20 text-5xl animate-pulse"
            style={{ animationDuration: "3s" }}
          >
            ✨
          </div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-160px)]">
            {/* Left side: Text content */}
            <div className="space-y-8 text-center lg:text-left">
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-none mb-8">
                  <span className="block bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                    About Scribble
                  </span>
                </h1>
              </div>

              <div
                className={`transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <p className="text-xl md:text-2xl text-orange-800 leading-relaxed mb-8">
                  Where every child's unique story unfolds through compassionate
                  care and joyful healing ✨
                  <br className="hidden md:block" />
                  <span className="text-orange-900 font-medium">
                    Dedicated to nurturing young minds since 2018
                  </span>
                </p>
              </div>

              <div
                className={`flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6 mb-12 transition-all duration-1000 delay-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Link
                  to="/contact"
                  className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 text-lg"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Meet Our Team</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Right side: Hands SVG */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div
                className={`transition-all duration-1000 delay-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-amber-100/20 to-yellow-200/30 rounded-full blur-3xl animate-pulse"
                    style={{
                      width: "700px",
                      height: "700px",
                      left: "-50px",
                      top: "-50px",
                    }}
                  ></div>

                  <img
                    src={HandsSvg}
                    alt="Caring Hands"
                    className="relative z-10 drop-shadow-2xl transform transition-transform duration-500"
                    style={{
                      width: "500px",
                      height: "auto",
                      minWidth: "500px",
                    }}
                  />

                  {/* Floating elements around hands */}
                  <div
                    className="absolute text-4xl animate-pulse"
                    style={{
                      bottom: "100px",
                      left: "60px",
                      animationDuration: "2s",
                      animationDelay: "1s",
                    }}
                  >
                    💝
                  </div>
                  <div
                    className="absolute text-4xl animate-bounce"
                    style={{
                      top: "150px",
                      right: "80px",
                      animationDuration: "3s",
                      animationDelay: "1.5s",
                    }}
                  >
                    🌟
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section
        ref={timelineRef}
        className="py-32 bg-gradient-to-b from-white via-orange-50 to-amber-50 relative overflow-hidden"
      >
        <div
          className="absolute top-16 right-16 text-5xl animate-spin"
          style={{ animationDuration: "12s" }}
        >
          🌸
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto leading-relaxed">
              From a simple vision to transforming young lives - discover the
              milestones that shaped our story ✨
            </p>
          </motion.div>

          {/* Timeline Container */}
          <TimelineProgress timelineEvents={timelineEvents} />

          {/* Founder Quote */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-32 text-center"
          >
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-8 rounded-3xl border-l-4 border-orange-400 max-w-4xl mx-auto">
              <p className="text-xl font-medium text-orange-900 italic mb-4">
                "Every scribble tells a story, every color reveals an emotion,
                and every session plants a seed of resilience that will bloom
                for years to come."
              </p>
              <p className="text-orange-700 font-semibold">
                - Dr. Sarah Mitchell, Founder & Clinical Director
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-32 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
          <div
            className="absolute bottom-32 right-32 w-40 h-40 bg-orange-200 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              The principles that guide every interaction, every session, and
              every smile we nurture 💛
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.title}
                  className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-white/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <IconComponent
                        size={48}
                        className="text-orange-500 group-hover:text-orange-600 transition-colors duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-orange-900">
                      {value.title}
                    </h3>
                    <p className="text-orange-700 leading-relaxed">
                      {value.description}
                    </p>
                    <div
                      className={`h-1 bg-gradient-to-r ${value.color} rounded-full mx-auto w-12 group-hover:w-full transition-all duration-300`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team Carousel */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-white via-orange-50 to-amber-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-0"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto leading-relaxed">
              Passionate professionals dedicated to helping every child thrive -
              click to explore! 🌟
            </p>
          </motion.div>

          <div>
            <TeamCarousel team={team} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
