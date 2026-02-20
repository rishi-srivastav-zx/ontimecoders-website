'use client';

import { Code2, Rocket, Layout, Search, RefreshCw, Settings } from 'lucide-react';
import { SectionHeading, GlassCard } from './shared';

const services = [
  { icon: Code2,     title: 'Custom Website Development',     desc: 'Tailored digital experiences built with modern frameworks for speed and scalability.' },
  { icon: Rocket,    title: 'SaaS Application Development',   desc: 'Full-stack cloud applications designed to handle complex logic and high user loads.' },
  { icon: Layout,    title: 'E-commerce Development',         desc: 'High-converting online stores with seamless checkout experiences and robust backends.' },
  { icon: Search,    title: 'SEO & Performance Optimization',  desc: 'Deep technical optimisation to ensure your site ranks high and loads instantly.' },
  { icon: RefreshCw, title: 'Website Redesign',               desc: 'Modernising legacy platforms with cutting-edge UI/UX and improved performance.' },
  { icon: Settings,  title: 'Maintenance & Support',          desc: 'Long-term technical partnership to keep your platform secure and up-to-date.' },
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Engineered for Performance"
          subtitle="We focus on the benefits that drive your business forward, not just the tools we use."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <GlassCard key={i} className="group">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <s.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{s.title}</h3>
              <p className="text-white/50 leading-relaxed">{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
