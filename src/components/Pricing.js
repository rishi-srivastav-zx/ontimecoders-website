'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Rocket, Zap, Crown, Sparkles, Calendar, ArrowRight, Send, Loader2, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { SectionHeading } from './shared';

// ── Contact Form Modal ───────────────────────────────────────────────────────
function ContactModal({ isOpen, onClose, planName = '', currency = 'USD' }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
          >
            <X size={20} />
          </button>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-white/60">We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {planName ? `Get Started with ${planName}` : 'Get in Touch'}
                </h3>
                <p className="text-white/50">
                  {planName 
                    ? `Fill in your details and we'll reach out about the ${planName} plan.`
                    : 'Tell us about your project and we\'ll get back to you shortly.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-400 hover:to-blue-500 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── USD plan data ────────────────────────────────────────────────────────────
const usdPlans = [
  {
    name: 'Starter', price: '$299', popular: false, cta: 'Get Started',
    desc: 'Ideal for businesses launching their first professional presence.',
    features: ['Up to 5 Pages Website','Fully Responsive Design','SEO-Optimized Structure','Speed Optimization','Contact Form Integration','14 Days Post-Launch Support'],
  },
  {
    name: 'Growth', price: '$899', popular: true, cta: 'Book a Strategy Call',
    desc: 'Built for businesses ready to grow faster and convert better.',
    features: ['Up to 12 Pages','Advanced UI/UX Design','Custom Animations','CMS / Admin Integration','Analytics Setup','30 Days Priority Support'],
  },
  {
    name: 'Scale', price: '$1299', popular: false, cta: 'Schedule Consultation',
    desc: 'Engineered for companies that demand performance and scalability.',
    features: ['Fully Custom Architecture','SaaS / Dashboard Dev','API Integrations','Advanced Performance Eng.','Security Optimization','60 Days Dedicated Support'],
  },
];

// ── Indian plan data ─────────────────────────────────────────────────────────
const indianPlans = [
  {
    name: 'Starter', price: '₹5000', monthlyPrice: '₹1000/month', highlighted: false,
    description: 'Perfect for small businesses and personal brands starting their digital journey.',
    features: ['5 Pages Website','Premium Template Design','Basic SEO Setup','Contact Form Integration','1 Month Support','Mobile Responsive'],
    icon: <Rocket className="w-6 h-6" />, ctaText: 'Get Started',
  },
  {
    name: 'Growth', price: '₹15000', monthlyPrice: '₹3000/month', highlighted: true,
    description: 'Ideal for growing startups and SMEs ready to scale their online presence.',
    features: ['15 Pages Website','Custom UI/UX Design','Advanced SEO + Schema','WhatsApp & Payment Gateway','Speed Optimization','6 Months Priority Support','Analytics Dashboard','Social Media Integration'],
    icon: <Zap className="w-6 h-6" />, ctaText: 'Start Growing',
  },
  {
    name: 'Scale', price: '₹25000+', highlighted: false,
    description: 'Enterprise-grade solutions for established businesses demanding excellence.',
    features: ['2500 pages website','Fully Bespoke Design','Headless CMS Architecture','Cloud Hosting + CDN','Enterprise SEO Suite','12 Months Dedicated Support','Custom Integrations','Performance Monitoring','Dedicated Account Manager'],
    icon: <Crown className="w-6 h-6" />, ctaText: 'Contact Sales',
  },
];

const trustBadges = ['No hidden charges', 'GST included', '100% Indian owned', 'Money-back guarantee'];

// ── Indian Pricing Card ──────────────────────────────────────────────────────
function IndianPricingCard({ plan, index, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -10 }}
      className={cn(
        'relative rounded-3xl p-8 transition-all duration-500 backdrop-blur-xl',
        plan.highlighted
          ? 'bg-gradient-to-b from-blue-600/20 to-blue-900/10 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-105 z-10'
          : 'bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08]',
      )}
    >
      {plan.highlighted && (
        <div className="absolute -inset-px bg-gradient-to-b from-blue-500/20 to-transparent rounded-3xl blur-xl opacity-50 pointer-events-none" />
      )}
      {plan.highlighted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2"
        >
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular
          </div>
        </motion.div>
      )}

      <div className="relative">
        <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-6', plan.highlighted ? 'bg-blue-500 text-white' : 'bg-white/10 text-blue-400')}>
          {plan.icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-white/50 text-sm mb-6 leading-relaxed">{plan.description}</p>
        <div className="mb-8">
          <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
          {plan.monthlyPrice && (
            <p className="text-white/40 text-sm mt-2">or {plan.monthlyPrice}</p>
          )}
        </div>
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={cn('w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5', plan.highlighted ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/60')}>
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(plan.name)}
          className={cn(
            'w-full py-4 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300',
            plan.highlighted
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-400 hover:to-blue-500'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
          )}
        >
          {plan.ctaText}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Indian Pricing Modal Content ─────────────────────────────────────────────
function IndianPricingContent({ onSelectPlan }) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220] via-[#0F1B2E] to-[#0B1220]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6"
          >
            <span className="text-2xl">🇮🇳</span>
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">India Pricing Plans</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Choose the Right Plan for Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-green-500">
              Business Growth
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg md:text-xl leading-relaxed"
          >
            Transparent pricing built for Indian startups, SMEs, and growing brands. No hidden fees. No surprises.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 items-start mb-20">
          {indianPlans.map((plan, index) => (
            <IndianPricingCard key={plan.name} plan={plan} index={index} onSelect={onSelectPlan} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-3xl bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-600/10 border border-blue-500/20 p-8 md:p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Not sure which plan fits you?</h3>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Book a free 30-minute consultation with our team. We'll analyse your needs and recommend the perfect solution.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPlan('Consultation')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-blue-50 transition-colors group"
            >
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-white/30 text-sm"
        >
          {trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Main Pricing Component ───────────────────────────────────────────────────
export default function Pricing({ onPlanSelect }) {
  const openContactModal = (planName) => {
    if (onPlanSelect) {
      onPlanSelect(planName);
    }
  };

  return (
    <>
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Transparent Pricing"
            subtitle="Choose a plan that fits your business stage. Every project is crafted with precision."
          />

          {/* 🇮🇳 Toggle */}
          <div className="flex justify-center mb-12">
            <button
              type="button"
              onClick={() => {
                if (onPlanSelect) {
                  onPlanSelect('openIndianModal');
                }
              }}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 via-white/20 to-green-500 text-white rounded-full font-bold shadow-lg hover:shadow-orange-500/30 transition-all duration-300 border border-white/10"
            >
              <span className="text-2xl">🇮🇳</span>
              <span className="flex flex-col items-start">
                <span className="text-xs opacity-70 uppercase tracking-wider">View Pricing in</span>
                <span className="text-lg leading-none">Indian Rupee (₹)</span>
              </span>
            </button>
          </div>

          {/* USD Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {usdPlans.map((plan, i) => (
              <motion.div
                key={i} whileHover={{ y: -10 }}
                className={cn(
                  'relative p-10 rounded-[3rem] overflow-hidden transition-all duration-500',
                  plan.popular
                    ? 'bg-blue-500/10 border-2 border-blue-500 shadow-2xl shadow-blue-500/20'
                    : 'bg-white/5 backdrop-blur-xl border border-white/10',
                )}
              >
                {plan.popular && (
                  <div className="absolute top-6 right-6 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">/ project</span>
                </div>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">{plan.desc}</p>
                <div className="space-y-4 mb-10">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-sm text-white/80">
                      <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => openContactModal(plan.name)}
                  className={cn(
                    'w-full py-4 rounded-2xl font-bold transition-all duration-300',
                    plan.popular
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
                  )}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Custom Projects */}
          <div className="mt-16 text-center bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] max-w-3xl mx-auto border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Custom Projects</h3>
            <p className="text-white/60 mb-8">
              Have something unique in mind? We build tailored digital systems designed around your business goals.
            </p>
            <button
              onClick={() => openContactModal('Custom Project')}
              className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Request a Custom Quote
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Pricing Modals (rendered outside Scroll) ────────────────────────────────────
export function PricingModals({ 
  showIndianModal, 
  showContactModal, 
  selectedPlan,
  onOpenIndianModal,
  onCloseIndianModal, 
  onCloseContactModal,
  onPlanSelect 
}) {
  const handlePlanSelect = (planName) => {
    onCloseIndianModal();
    setTimeout(() => {
      if (onPlanSelect) onPlanSelect(planName);
    }, 300);
  };

  return (
    <>
      {/* Indian Pricing Modal */}
      <AnimatePresence>
        {showIndianModal && (
          <motion.div
            key="indian-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={onCloseIndianModal}
          >
            <motion.div
              key="indian-panel"
              initial={{ opacity: 0, scale: 0.94, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 28 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative min-h-screen"
            >
              <button
                onClick={onCloseIndianModal}
                aria-label="Close"
                className="fixed top-5 right-5 z-[110] w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
              >
                <X size={22} />
              </button>
              <IndianPricingContent onSelectPlan={handlePlanSelect} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={onCloseContactModal} 
        planName={selectedPlan}
      />
    </>
  );
}