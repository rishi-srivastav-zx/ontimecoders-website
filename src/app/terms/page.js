'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  FileCheck, 
  AlertCircle, 
  Users, 
  Ban, 
  CreditCard, 
  ShieldAlert, 
  Gavel,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

const clauses = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: FileCheck,
    color: 'from-emerald-500 to-teal-500',
    description: 'By accessing or using OntimeCoders services, you agree to be bound by these Terms of Service.',
    points: [
      'You must be at least 18 years old to use our services',
      'You agree to comply with all applicable laws and regulations',
      'These terms constitute a legally binding agreement',
      'We reserve the right to modify these terms at any time'
    ]
  },
  {
    id: 'account',
    title: 'Account Registration',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    description: 'When you create an account with us, you must provide accurate and complete information.',
    points: [
      'You are responsible for safeguarding your password',
      'You must notify us immediately of any unauthorized access',
      'One person or legal entity may only maintain one account',
      'We reserve the right to terminate accounts for violations'
    ]
  },
  {
    id: 'prohibited',
    title: 'Prohibited Activities',
    icon: Ban,
    color: 'from-red-500 to-pink-500',
    description: 'You may not access or use our services for any purpose other than that for which we make them available.',
    points: [
      'No unauthorized access or circumventing security measures',
      'No interference with other users\' enjoyment of the services',
      'No uploading malicious code or viruses',
      'No scraping, data mining, or harvesting of content'
    ]
  },
  {
    id: 'payment',
    title: 'Payment Terms',
    icon: CreditCard,
    color: 'from-purple-500 to-violet-500',
    description: 'All purchases are subject to our pricing and payment terms.',
    points: [
      'All fees are exclusive of taxes unless stated otherwise',
      'Payments are processed securely through our providers',
      'Subscription fees are billed in advance on a recurring basis',
      'Refunds are provided according to our refund policy'
    ]
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    icon: ShieldAlert,
    color: 'from-amber-500 to-orange-500',
    description: 'OntimeCoders shall not be liable for any indirect, incidental, or consequential damages.',
    points: [
      'Services are provided "as is" without warranties',
      'We do not guarantee uninterrupted or error-free service',
      'Our liability is limited to the amount you paid us',
      'Some jurisdictions do not allow limitation of liability'
    ]
  },
  {
    id: 'termination',
    title: 'Termination',
    icon: Gavel,
    color: 'from-rose-500 to-red-500',
    description: 'We may terminate or suspend your account immediately for any reason.',
    points: [
      'You may terminate your account at any time',
      'Upon termination, all licenses granted to you will end',
      'Provisions that should survive termination will remain',
      'We are not liable for any loss or damage from termination'
    ]
  }
];

export default function TermsOfService() {
  const containerRef = useRef(null);
  const [expandedClause, setExpandedClause] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  });

  const headerOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const headerScale = useTransform(smoothProgress, [0, 0.1], [1, 0.95]);

  const handleAgree = () => {
    setAgreed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#1e293b_50%,#0f172a_100%)] opacity-50" />
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-50"
        style={{ 
          width: useTransform(smoothProgress, value => `${value * 100}%`),
          boxShadow: '0 0 20px rgba(6,182,212,0.5)'
        }}
      />

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative group">
              <motion.div 
                className="absolute inset-0 bg-cyan-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <Clock className="w-8 h-8 text-cyan-400 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              OntimeCoders
            </span>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.span 
              className="text-sm text-slate-400 hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Effective Date: February 20, 2026
            </motion.span>
            <motion.div
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                agreed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
              }`}
              animate={agreed ? { scale: [1, 1.1, 1] } : {}}
            >
              {agreed ? 'Accepted' : 'Pending'}
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="relative pt-32 pb-20 px-6 overflow-hidden"
        style={{ opacity: headerOpacity, scale: headerScale }}
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-8"
              whileHover={{ scale: 1.05, borderColor: 'rgba(6,182,212,0.5)' }}
            >
              <Scale className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Legal Agreement
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <motion.span 
                className="block bg-gradient-to-r from-slate-100 via-cyan-200 to-purple-200 bg-clip-text text-transparent"
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Terms of Service
              </motion.span>
            </h1>

            <motion.p 
              className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Please read these terms carefully before using our services. By using OntimeCoders, you agree to these terms.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: 'Sections', value: '6' },
              { label: 'Read Time', value: '5 min' },
              { label: 'Last Updated', value: '2026' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10">
        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-2">Important Notice</h2>
              <p className="text-slate-400 leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of OntimeCoders' website, products, and services. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the services.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Clauses */}
        <div className="space-y-6">
          {clauses.map((clause, index) => (
            <motion.div
              key={clause.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                  expandedClause === clause.id 
                    ? 'bg-slate-800/80 border-slate-600' 
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
                layout
              >
                {/* Gradient Line */}
                <motion.div 
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${clause.color}`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: expandedClause === clause.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <button
                  onClick={() => setExpandedClause(expandedClause === clause.id ? null : clause.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`p-3 rounded-xl bg-gradient-to-br ${clause.color} bg-opacity-10`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <clause.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {index + 1}. {clause.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-1">{clause.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedClause === clause.id ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedClause === clause.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-slate-800">
                        <p className="text-slate-300 mb-4 leading-relaxed">{clause.description}</p>
                        <ul className="space-y-3">
                          {clause.points.map((point, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-3 text-slate-400"
                            >
                              <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 bg-gradient-to-br ${clause.color} bg-clip-text text-transparent`} />
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Agreement Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 relative overflow-hidden"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.3),transparent_70%)]" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-cyan-400" />
              Do you agree to these terms?
            </h3>
            
            <p className="text-slate-400 mb-6">
              By clicking "I Agree", you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleAgree}
                disabled={agreed}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  agreed 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40'
                }`}
                whileHover={!agreed ? { scale: 1.02 } : {}}
                whileTap={!agreed ? { scale: 0.98 } : {}}
              >
                {agreed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Agreed on {new Date().toLocaleDateString()}
                  </>
                ) : (
                  <>
                    I Agree to Terms
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              <motion.button
                className="flex-1 py-4 px-6 rounded-xl font-semibold border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <XCircle className="w-5 h-5" />
                Decline
              </motion.button>
            </div>
          </div>

          {/* Success Confetti Effect */}
          <AnimatePresence>
            {showConfetti && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'][i % 4],
                      left: '50%',
                      top: '50%'
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 400,
                      y: (Math.random() - 0.5) * 400,
                      opacity: [1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-slate-500">
            Need clarification?{' '}
            <motion.a 
              href="mailto:legal@ontimecoders.com" 
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              whileHover={{ scale: 1.05 }}
            >
              Contact our legal team
            </motion.a>
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-cyan-400" />
              <span className="font-bold text-slate-200 text-lg">OntimeCoders</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <motion.a href="/privacy" className="hover:text-cyan-400 transition-colors" whileHover={{ y: -2 }}>
                Privacy Policy
              </motion.a>
              <span className="text-slate-700">•</span>
              <motion.a href="/terms" className="hover:text-cyan-400 transition-colors" whileHover={{ y: -2 }}>
                Terms of Service
              </motion.a>
              <span className="text-slate-700">•</span>
              <motion.a href="/cookies" className="hover:text-cyan-400 transition-colors" whileHover={{ y: -2 }}>
                Cookie Policy
              </motion.a>
            </div>

            <p className="text-slate-600 text-sm">
              © 2026 OntimeCoders. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}