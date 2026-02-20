'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Rocket, Layout, Search, RefreshCw, Settings, ArrowRight, CheckCircle2, Zap, Shield, Clock } from 'lucide-react';
import { SectionHeading } from './shared';

const services = [
  { 
    icon: Code2,     
    title: 'Custom Website Development',     
    desc: 'Tailored digital experiences built with modern frameworks for speed and scalability.',
    details: {
      features: ['React/Next.js Architecture', 'Headless CMS Integration', 'Progressive Web Apps', 'API Development'],
      benefits: ['Blazing fast load times', 'SEO-friendly structure', 'Scalable codebase', 'Mobile-first design'],
      timeline: '2-4 weeks',
    }
  },
  { 
    icon: Rocket,    
    title: 'SaaS Application Development',   
    desc: 'Full-stack cloud applications designed to handle complex logic and high user loads.',
    details: {
      features: ['Multi-tenant Architecture', 'Real-time Data Sync', 'Authentication Systems', 'Payment Integration'],
      benefits: ['99.9% Uptime', 'Auto-scaling', 'Bank-grade security', 'Global CDN'],
      timeline: '6-12 weeks',
      }
  },
  { 
    icon: Layout,    
    title: 'E-commerce Development',         
    desc: 'High-converting online stores with seamless checkout experiences and robust backends.',
    details: {
      features: ['Custom Checkout Flows', 'Inventory Management', 'Multi-currency Support', 'Abandoned Cart Recovery'],
      benefits: ['Higher conversion rates', 'Faster checkout', 'Mobile optimized', 'Analytics dashboard'],
      timeline: '4-8 weeks',
    }
  },
  { 
    icon: Search,    
    title: 'SEO & Performance Optimization',  
    desc: 'Deep technical optimisation to ensure your site ranks high and loads instantly.',
    details: {
      features: ['Core Web Vitals', 'Schema Markup', 'Technical SEO Audit', 'Content Strategy'],
      benefits: ['Top Google rankings', '50%+ faster loads', 'Better user retention', 'Higher organic traffic'],
      timeline: '2-3 weeks',
    }
  },
  { 
    icon: RefreshCw, 
    title: 'Website Redesign',               
    desc: 'Modernising legacy platforms with cutting-edge UI/UX and improved performance.',
    details: {
      features: ['UX Research & Audit', 'Brand Identity Refresh', 'Content Migration', 'A/B Testing'],
      benefits: ['Fresh modern look', 'Improved UX', 'Better conversions', 'Future-proof tech'],
      timeline: '3-6 weeks',
    }
  },
  { 
    icon: Settings,  
    title: 'Maintenance & Support',          
    desc: 'Long-term technical partnership to keep your platform secure and up-to-date.',
    details: {
      features: ['24/7 Monitoring', 'Security Patches', 'Performance Reports', 'Priority Support'],
      benefits: ['Zero downtime', 'Always secure', 'Regular updates', 'Dedicated team'],
      timeline: 'Monthly',
    }
  },
];

function FlipCard({ service, index, onQuoteClick }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative h-[420px] perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 hover:bg-white/[0.08] transition-all duration-500 flex flex-col">
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <service.icon size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
            <p className="text-white/50 leading-relaxed flex-grow">{service.desc}</p>
            
            <div className="mt-6 flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all">
              <span>View Details</span>
              <ArrowRight size={16} />
            </div>
            
            {/* Flip hint */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <RefreshCw size={14} className="text-white/40" />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)" 
          }}
        >
          <div className="h-full bg-gradient-to-br from-blue-600/20 to-blue-900/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                <service.icon size={20} />
              </div>
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">{service.details.timeline}</span>
            </div>

            <h4 className="text-lg font-bold text-white mb-4">{service.title}</h4>
            
            <div className="space-y-4 flex-grow overflow-y-auto">
              <div>
                <p className="text-xs text-blue-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1">
                  <Zap size={12} /> Key Features
                </p>
                <ul className="space-y-1">
                  {service.details.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="text-white/70 text-sm flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-blue-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs text-green-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1">
                  <Shield size={12} /> Benefits
                </p>
                <ul className="space-y-1">
                  {service.details.benefits.slice(0, 2).map((benefit, i) => (
                    <li key={i} className="text-white/70 text-sm flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-green-500 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">{service.details.price}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuoteClick(service.title);
                  }}
                >
                  Get Quote
                </motion.button>
              </div>
            </div>

            {/* Flip back hint */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <RefreshCw size={14} className="text-white/60" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services({ onPlanSelect }) {
  const handleQuoteClick = (serviceName) => {
    if (onPlanSelect) {
      onPlanSelect(serviceName);
    }
  };

  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Why Choose OntimeCoders?"
          subtitle="Click any card to reveal detailed features, benefits, and pricing. Interactive 3D cards with complete service breakdowns."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <FlipCard key={i} service={service} index={i} onQuoteClick={handleQuoteClick} />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-sm mb-4">Need something custom?</p>
          <button onClick={() => handleQuoteClick('')} className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-semibold hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 flex items-center gap-2 mx-auto group">
            <Clock size={18} className="text-blue-500" />
            Schedule a Free Consultation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}