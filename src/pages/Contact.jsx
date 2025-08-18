/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Calendar,
  Heart,
  Smile,
} from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingElements, setFloatingElements] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    childAge: "",
    serviceType: "",
    message: "",
    urgency: "normal",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Generate floating elements for kid-friendly atmosphere
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 25 + 12,
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

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[+]?[0-9()\-\s]+$/.test(formData.phone)) {
      errors.phone = "Phone number format is invalid";
    }

    if (!formData.childAge.trim()) {
      errors.childAge = "Child's age is required";
    }

    if (!formData.serviceType) {
      errors.serviceType = "Please select a service type";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        childAge: "",
        serviceType: "",
        message: "",
        urgency: "normal",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      primary: "(555) 123-4567",
      secondary: "Mon-Fri 8AM-6PM",
      color: "from-blue-400 to-cyan-400",
      action: "tel:+15551234567",
    },
    {
      icon: Mail,
      title: "Email Us",
      primary: "hello@scribbletherapy.com",
      secondary: "We'll respond within 24hrs",
      color: "from-green-400 to-emerald-400",
      action: "mailto:hello@scribbletherapy.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "123 Therapy Lane",
      secondary: "Wellness City, WC 12345",
      color: "from-purple-400 to-violet-400",
      action: "#location",
    },
    {
      icon: Calendar,
      title: "Book Online",
      primary: "Schedule Appointment",
      secondary: "Available 7 days a week",
      color: "from-pink-400 to-rose-400",
      action: "#booking",
    },
  ];

  const quickContact = [
    {
      type: "Emergency",
      description: "Immediate support needed",
      icon: AlertCircle,
      color: "from-red-500 to-orange-500",
      action: "Emergency Contact",
    },
    {
      type: "New Client",
      description: "First time consultation",
      icon: Heart,
      color: "from-orange-500 to-amber-500",
      action: "New Client Form",
    },
    {
      type: "Existing Client",
      description: "Current client support",
      icon: Smile,
      color: "from-amber-500 to-yellow-500",
      action: "Client Portal",
    },
  ];

  const serviceOptions = [
    "Individual Play Therapy",
    "Cognitive Behavioral Therapy",
    "Family Therapy",
    "Art Therapy",
    "Music Therapy",
    "Group Therapy",
    "Assessment & Evaluation",
    "Other",
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
                  Get In Touch
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
                Ready to start your child's journey to wellness? We're here to
                help every step of the way ✨
                <br className="hidden md:block" />
                <span className="text-orange-900 font-medium">
                  Let's create a brighter future together
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
                href="#contact-form"
                className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 text-lg"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start Conversation</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Contact Information
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Multiple ways to reach our dedicated team 📞
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.a
                  key={info.title}
                  href={info.action}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                  }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${info.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-orange-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-orange-800 font-medium mb-1">
                      {info.primary}
                    </p>
                    <p className="text-orange-600 text-sm">{info.secondary}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Contact Form */}
      <section
        id="contact-form"
        className="py-20 bg-gradient-to-b from-white via-orange-50 to-amber-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-orange-900 mb-6">
              Send Us a Message
            </h2>
            <p className="text-lg text-orange-700 max-w-2xl mx-auto">
              Tell us about your child's needs and we'll create a personalized
              plan 📝
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-100"
          >
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  Message Sent Successfully! 🎉
                </h3>
                <p className="text-green-700">
                  We'll get back to you within 24 hours to discuss your child's
                  needs.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-bold text-orange-900 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      formErrors.name
                        ? "border-red-300 bg-red-50"
                        : "border-orange-200 hover:border-orange-300 focus:border-orange-500"
                    }`}
                    placeholder="Your full name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-bold text-orange-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      formErrors.email
                        ? "border-red-300 bg-red-50"
                        : "border-orange-200 hover:border-orange-300 focus:border-orange-500"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-bold text-orange-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      formErrors.phone
                        ? "border-red-300 bg-red-50"
                        : "border-orange-200 hover:border-orange-300 focus:border-orange-500"
                    }`}
                    placeholder="(555) 123-4567"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Child Age Field */}
                <div>
                  <label className="block text-sm font-bold text-orange-900 mb-2">
                    Child's Age *
                  </label>
                  <input
                    type="text"
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      formErrors.childAge
                        ? "border-red-300 bg-red-50"
                        : "border-orange-200 hover:border-orange-300 focus:border-orange-500"
                    }`}
                    placeholder="e.g., 7 years old"
                  />
                  {formErrors.childAge && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {formErrors.childAge}
                    </p>
                  )}
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-bold text-orange-900 mb-2">
                  Service of Interest *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                    formErrors.serviceType
                      ? "border-red-300 bg-red-50"
                      : "border-orange-200 hover:border-orange-300 focus:border-orange-500"
                  }`}
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {formErrors.serviceType && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.serviceType}
                  </p>
                )}
              </div>

              {/* Urgency Level */}
              <div>
                <label className="block text-sm font-bold text-orange-900 mb-2">
                  Urgency Level
                </label>
                <div className="flex gap-4">
                  {[
                    {
                      value: "normal",
                      label: "Normal",
                      color: "from-green-400 to-emerald-400",
                    },
                    {
                      value: "urgent",
                      label: "Urgent",
                      color: "from-yellow-400 to-orange-400",
                    },
                    {
                      value: "emergency",
                      label: "Emergency",
                      color: "from-red-400 to-pink-400",
                    },
                  ].map((urgency) => (
                    <label key={urgency.value} className="flex-1">
                      <input
                        type="radio"
                        name="urgency"
                        value={urgency.value}
                        checked={formData.urgency === urgency.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center ${
                          formData.urgency === urgency.value
                            ? `bg-gradient-to-r ${urgency.color} text-white border-transparent`
                            : "border-orange-200 hover:border-orange-300 bg-white"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {urgency.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-bold text-orange-900 mb-2">
                  Tell us about your child's needs *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none ${
                    formErrors.message
                      ? "border-red-300 bg-red-50"
                      : "border-orange-200 hover:border-orange-300 focus:border-orange-500"
                  }`}
                  placeholder="Please describe your child's situation, any concerns, and what kind of support you're looking for..."
                />
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 px-8 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm text-orange-600">
              <p>
                By submitting this form, you agree to our privacy policy and
                consent to be contacted by our team.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
