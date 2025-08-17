import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Star, Users, Target, Sparkles } from "lucide-react";

import HandsSvg from "../assets/Hands1.svg";

const About = () => {
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

      {/* Our Story Section */}
      <section className="py-32 bg-gradient-to-b from-white via-orange-50 to-amber-50 relative">
        <div
          className="absolute top-16 right-16 text-5xl animate-spin"
          style={{ animationDuration: "12s" }}
        >
          🌸
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story text */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-orange-800 leading-relaxed">
                <p className="text-xl">
                  🌱 <strong>Founded in 2018</strong>, Scribble Therapy Center
                  began with a simple yet powerful vision: create a place where
                  children feel genuinely excited to engage in their healing
                  journey.
                </p>
                <p>
                  Our founder, Dr. Sarah Mitchell, noticed that traditional
                  therapy settings often felt intimidating to young clients. She
                  envisioned a space that would feel more like a magical
                  playground than a clinical environment.
                </p>
                <p>
                  Today, we've helped over <strong>500 families</strong>{" "}
                  discover the joy in growth, turning therapy sessions into
                  adventures that children look forward to each week. Our
                  colorful, welcoming space is designed to spark imagination
                  while providing the safety and structure that effective
                  therapy requires.
                </p>
                <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-6 rounded-2xl border-l-4 border-orange-400">
                  <p className="font-medium text-orange-900 italic">
                    "Every scribble tells a story, every color reveals an
                    emotion, and every session plants a seed of resilience that
                    will bloom for years to come."
                    <span className="block mt-2 text-sm">
                      - Dr. Sarah Mitchell, Founder
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Visual element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-200 to-amber-200 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="space-y-2">
                      <div className="text-4xl font-black text-orange-600">
                        500+
                      </div>
                      <div className="text-sm text-orange-800">
                        Families Helped
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-black text-amber-600">
                        6
                      </div>
                      <div className="text-sm text-orange-800">
                        Years of Care
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-black text-red-500">
                        95%
                      </div>
                      <div className="text-sm text-orange-800">
                        Success Rate
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-black text-yellow-500">
                        ∞
                      </div>
                      <div className="text-sm text-orange-800">
                        Smiles Created
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decorations */}
              <div className="absolute -top-6 -right-6 text-6xl animate-bounce">
                📚
              </div>
              <div className="absolute -bottom-4 -left-4 text-5xl animate-pulse">
                🎨
              </div>
            </div>
          </div>
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

      {/* Meet Our Team Section */}
      <section className="py-32 bg-gradient-to-b from-white via-orange-50 to-amber-50 relative">
        <div className="absolute top-20 left-20 text-5xl animate-pulse">👨‍👩‍👧‍👦</div>
        <div className="absolute bottom-20 right-20 text-4xl animate-wave">
          🌟
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto leading-relaxed">
              Passionate professionals dedicated to helping every child thrive
              🌟
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-100"
              >
                {/* Profile Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 text-2xl animate-pulse">
                    {index === 0 ? "🌸" : index === 1 ? "🎈" : "🌟"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-orange-600 font-medium text-lg">
                      {member.role}
                    </p>
                    <p className="text-amber-600 font-semibold">
                      {member.experience} experience
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-orange-800 mb-2">
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-200">
                    <p className="text-orange-800 italic">{member.fun}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Floating elements */}
        <div
          className="absolute top-16 left-16 text-6xl animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          🎈
        </div>
        <div
          className="absolute bottom-16 right-16 text-5xl animate-pulse"
          style={{ animationDuration: "2s" }}
        >
          ✨
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8">
            Ready to Begin
            <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              This Journey?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-orange-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let's create a personalized path to healing and growth that your
            child will love!
            <span className="block text-white font-bold mt-4">
              🌟 Your child's story of transformation starts here 🌟
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="group relative px-12 py-5 bg-white text-orange-600 font-black rounded-full hover:bg-orange-100 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-white/25 text-xl border-4 border-orange-300"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>🎯 Schedule Consultation</span>
              </span>
            </Link>

            <Link
              to="/services"
              className="group px-12 py-5 border-4 border-white text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-xl"
            >
              <span className="flex items-center space-x-2">
                <span>💫 Explore Services</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
