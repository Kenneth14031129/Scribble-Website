/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Brain,
  Users,
  Palette,
  Music,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingElements, setFloatingElements] = useState([]);
  const heroRef = useRef(null);

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

  const coreServices = [
    {
      icon: Heart,
      title: "Individual Play Therapy",
      description: (
        <>
          One-on-one sessions using play as the primary
          <br />
          therapeutic tool to help children process emotions and experiences.
        </>
      ),
      features: [
        "Trauma-informed care",
        "Emotion regulation",
        "Self-expression support",
        "Coping skills development",
      ],
      color: "from-orange-400 to-amber-400",
    },
    {
      icon: Brain,
      title: "Cognitive Behavioral Therapy",
      description: (
        <>
          Evidence-based approach helping children identify
          <br />
          and change negative thought patterns and behaviors.
        </>
      ),
      features: [
        "Anxiety management",
        "Depression support",
        "Behavioral modification",
        "Problem-solving skills",
      ],
      color: "from-amber-400 to-yellow-400",
    },
    {
      icon: Users,
      title: "Family Therapy",
      description: (
        <>
          Collaborative sessions involving the whole family
          <br />
          to improve communication and strengthen relationships.
        </>
      ),
      features: [
        "Family dynamics",
        "Communication skills",
        "Conflict resolution",
        "Parenting support",
      ],
      color: "from-orange-400 to-red-400",
    },
    {
      icon: Palette,
      title: "Art Therapy",
      description: (
        <>
          Creative expression through art to help children
          <br />
          communicate feelings they can't put into words.
        </>
      ),
      features: [
        "Creative expression",
        "Non-verbal processing",
        "Self-esteem building",
        "Motor skill development",
      ],
      color: "from-red-400 to-orange-400",
    },
    {
      icon: Music,
      title: "Music Therapy",
      description: (
        <>
          Using rhythm, melody, and sound to promote
          <br />
          emotional, cognitive, and social development.
        </>
      ),
      features: [
        "Emotional regulation",
        "Social skills",
        "Memory enhancement",
        "Sensory processing",
      ],
      color: "from-orange-400 to-amber-400",
    },
    {
      icon: MessageCircle,
      title: "Group Therapy",
      description: (
        <>
          Peer-supported healing in small, age-appropriate groups
          <br />
          with shared experiences or challenges.
        </>
      ),
      features: [
        "Social skills development",
        "Peer support",
        "Communication practice",
        "Shared experiences",
      ],
      color: "from-amber-400 to-yellow-400",
    },
  ];

  const specializedServices = [
    {
      title: "Autism Spectrum Support",
      description:
        "Specialized interventions designed for children on the autism spectrum.",
      highlights: [
        "Social skills training",
        "Sensory integration",
        "Communication development",
        "Behavioral support",
      ],
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "ADHD Management",
      description:
        "Comprehensive support for attention and hyperactivity challenges.",
      highlights: [
        "Focus enhancement",
        "Organization skills",
        "Impulse control",
        "Academic support",
      ],
      color: "from-green-400 to-emerald-400",
    },
    {
      title: "Trauma Recovery",
      description:
        "Gentle, trauma-informed approaches to help children heal from difficult experiences.",
      highlights: [
        "Safety establishment",
        "Trust building",
        "Processing support",
        "Resilience development",
      ],
      color: "from-purple-400 to-violet-400",
    },
    {
      title: "Anxiety & Depression",
      description:
        "Specialized care for children experiencing anxiety, depression, or mood disorders.",
      highlights: [
        "Mood stabilization",
        "Coping strategies",
        "Stress management",
        "Confidence building",
      ],
      color: "from-pink-400 to-rose-400",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description:
        "Meet with our team to discuss your child's needs and develop a personalized care plan.",
    },
    {
      step: "02",
      title: "Assessment & Planning",
      description:
        "Comprehensive evaluation to understand your child's unique strengths and challenges.",
    },
    {
      step: "03",
      title: "Therapeutic Sessions",
      description:
        "Regular, engaging sessions tailored to your child's specific therapeutic goals.",
    },
    {
      step: "04",
      title: "Progress & Growth",
      description:
        "Ongoing monitoring and adjustment of therapy approaches to ensure continuous progress.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100">
      {/* Floating Animation Styles + Smooth Scroll */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
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
          <div className="text-center min-h-[calc(100vh-160px)] flex flex-col justify-center">
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none mb-8">
                <span className="block bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Our Services
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
              <p className="text-xl md:text-2xl text-orange-800 leading-relaxed mb-12 max-w-4xl mx-auto">
                Comprehensive therapeutic services designed to help every child
                thrive, grow, and discover their inner strength ✨
                <br className="hidden md:block" />
                <span className="text-orange-900 font-medium">
                  Personalized care plans tailored to each child's unique
                  journey
                </span>
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 transition-all duration-1000 delay-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <a
                href="#core-therapy-services"
                className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 text-lg"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Learn More</span>
                  <ChevronDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section
        id="core-therapy-services"
        className="py-32 bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Core Therapy Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Evidence-based therapeutic approaches designed to meet each child
              where they are 🌟
            </p>
          </motion.div>

          {/* Flowing Services Layout */}
          <div className="space-y-24">
            {coreServices.map((service, index) => {
              const IconComponent = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative group flex flex-col lg:flex-row ${
                    isEven ? "" : "lg:flex-row-reverse"
                  } gap-12 lg:gap-20 items-center lg:items-start`}
                >
                  {/* Service Content */}
                  <div
                    className={`w-full lg:w-1/2 ${
                      isEven ? "lg:pr-12" : "lg:pl-12"
                    } space-y-6`}
                  >
                    {/* Icon and Title Container */}
                    <div className={`flex items-center gap-6 justify-start`}>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        <IconComponent className="w-10 h-10 text-white" />
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                          whileHover={{ scale: 1.05 }}
                        />
                      </motion.div>

                      <div className="text-left">
                        <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 group-hover:text-slate-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                      className="text-left"
                    >
                      <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                        {service.description}
                      </p>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl`}
                    >
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + 0.7 + idx * 0.1,
                            duration: 0.5,
                          }}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 border border-white/30`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.3 }}
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} flex-shrink-0`}
                          />
                          <span className="text-sm font-medium text-slate-700">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Decorative Element */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      duration: 1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={`w-full lg:w-1/2 flex justify-center lg:justify-center relative`}
                  >
                    <div
                      className={`w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br ${service.color} opacity-10 relative`}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`absolute inset-4 rounded-full bg-gradient-to-br ${service.color} opacity-20`}
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, -3, 3, 0],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                        className={`absolute inset-8 rounded-full bg-gradient-to-br ${service.color} opacity-30`}
                      />
                    </div>
                  </motion.div>

                  {/* Connection Line to Next Service */}
                  {index < coreServices.length - 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      whileInView={{ height: "60px", opacity: 0.3 }}
                      transition={{ delay: index * 0.1 + 1, duration: 0.8 }}
                      className={`absolute -bottom-12 ${
                        isEven ? "right-1/4" : "left-1/4"
                      } w-px bg-gradient-to-b from-slate-300 to-transparent hidden lg:block`}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialized Services Section */}
      <section className="py-32 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 relative overflow-hidden">
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
              Specialized Care
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Targeted interventions for specific needs and conditions 💛
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {specializedServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold text-orange-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-orange-700 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {service.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-orange-800"
                    >
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3`}
                      ></div>
                      <span className="text-sm font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-gradient-to-b from-white via-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6">
              Our Process
            </h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto leading-relaxed">
              A clear, supportive journey from first contact to lasting growth
              🌱
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                    {step.step}
                  </div>
                  <div className="absolute -top-2 -right-2 text-3xl">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-orange-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-orange-700 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-8 rounded-3xl border-l-4 border-orange-400 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-orange-900 mb-4">
                Ready to Begin Your Child's Journey?
              </h3>
              <p className="text-lg text-orange-800 mb-6">
                Every child deserves a chance to thrive. Let us be part of their
                story of growth and resilience.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Schedule Your Consultation Today
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
