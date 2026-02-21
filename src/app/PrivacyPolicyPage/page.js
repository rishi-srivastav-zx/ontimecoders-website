'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  Cookie, 
  Mail, 
  UserCheck, 
  Clock,
  ChevronRight,
  FileText,
  Globe,
  Trash2
} from 'lucide-react';

const sections = [
  {
    id: 'intro',
    title: 'Introduction',
    icon: Shield,
    content: `At OntimeCoders, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.`
  },
  {
    id: 'collection',
    title: 'Information We Collect',
    icon: Eye,
    content: `We collect information that you provide directly to us, including:
    • Personal identification information (Name, email address, phone number)
    • Account credentials and authentication data
    • Payment and billing information
    • Communication preferences and history`
  },
  {
    id: 'usage',
    title: 'How We Use Your Information',
    icon: Server,
    content: `Your information helps us:
    • Provide, maintain, and improve our services
    • Process transactions and send related information
    • Send technical notices, updates, and support messages
    • Respond to your comments and questions`
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    icon: Cookie,
    content: `We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`
  },
  {
    id: 'security',
    title: 'Data Security',
    icon: Lock,
    content: `We implement appropriate technical and organizational security measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.`
  },
  {
    id: 'rights',
    title: 'Your Rights',
    icon: UserCheck,
    content: `You have the right to:
    • Access your personal data
    • Request correction or deletion
    • Object to processing
    • Request data portability
    • Withdraw consent at any time`
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: Mail,
    content: `If you have any questions about this Privacy Policy, please contact us at:
    Email: privacy@ontimecoders.com
    Address: 123 Tech Street, Innovation City, IC 12345`
  }
];

export default function PrivacyPolicy() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0.3]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden font-sans selection:bg-cyan-500/30">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-50" />
              <Clock className="w-8 h-8 text-cyan-400 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              OntimeCoders
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-slate-400"
          >
            Last updated: February 20, 2026
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Your Data, Protected</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-100 via-cyan-200 to-slate-100 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            
            <motion.p 
              className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              We believe in transparency. Learn how we collect, use, and protect your personal information.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-32 flex gap-12 relative">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 sticky top-32 h-fit">
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                  activeSection === section.id 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <section.icon className={`w-4 h-4 ${activeSection === section.id ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="text-sm font-medium">{section.title}</span>
                {activeSection === section.id && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </aside>

        {/* Content Cards */}
        <main className="flex-1 space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group"
            >
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ opacity: hoveredCard === index ? 0.5 : 0 }}
              />
              
              <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <motion.div 
                    className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <section.icon className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                      {section.title}
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: hoveredCard === index ? 1 : 0, x: hoveredCard === index ? 0 : -10 }}
                      >
                        <ChevronRight className="w-5 h-5 text-cyan-400" />
                      </motion.span>
                    </h2>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-10">
                  <section.icon className="w-24 h-24" />
                </div>
              </div>
            </motion.section>
          ))}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 to-purple-600 p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Questions about your privacy?</h3>
                <p className="text-cyan-100">Our team is here to help you understand your rights.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-cyan-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-cyan-400" />
              <span className="font-bold text-slate-200">OntimeCoders</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 OntimeCoders. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}