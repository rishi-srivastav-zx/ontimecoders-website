'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { SectionHeading, GlassCard } from './shared';

const steps = [
  { title: 'Discovery',   desc: 'Understanding your goals and market.'   },
  { title: 'Strategy',    desc: 'Defining the technical roadmap.'        },
  { title: 'Design',      desc: 'Crafting a premium user experience.'    },
  { title: 'Development', desc: 'Engineering with precision and speed.'  },
  { title: 'Testing',     desc: 'Ensuring flawless performance.'         },
  { title: 'Launch',      desc: 'Deploying for maximum impact.'          },
];

export function Process() {
  return (
    <section className="sm:py-32 py-4 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Our Process" subtitle="A systematic approach to building excellence." />
        <div className="relative">
          <div className="absolute top-6 left-0 right-0 h-px bg-white/10 hidden md:block" />
          <div className="grid md:grid-cols-6 gap-8 relative z-10">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mx-auto mb-6 shadow-lg shadow-blue-600/20">
                  {i + 1}
                </div>
                <h4 className="font-bold mb-2 text-white">{s.title}</h4>
                <p className="text-white/40 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: 'Sarah Johnson',   role: 'CEO, TechFlow',    text: 'OntimeCoders transformed our vision into a high-performance reality. Their attention to detail is unmatched.' },
  { name: 'Mark Davis',      role: 'Founder, PeakSaaS', text: 'The Growth plan was exactly what we needed to scale. Our conversion rates have doubled since launch.'        },
  { name: 'Elena Rodriguez', role: 'CTO, Innovate',    text: 'Professional, fast, and technically brilliant. They are our go-to partners for all things web.'             },
];

export function Testimonials() {
  return (
    <section className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="What Founders Say" subtitle="Trust is earned through performance and reliability." />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <GlassCard key={i} className="flex flex-col">
              <Quote className="text-blue-500 mb-6 opacity-50" size={40} />
              <p className="text-lg italic text-white/80 mb-8 flex-grow">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center font-bold text-blue-500">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-white/40 text-sm">{t.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
