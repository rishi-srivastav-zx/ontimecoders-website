'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Search, Smartphone, Zap, Mail, RefreshCw, CheckCircle2, Code2 } from 'lucide-react';
import { SectionHeading } from './shared';

const features = [
  { title: 'Scalable Architecture', icon: ShieldCheck, desc: 'Built to grow with your user base.'        },
  { title: 'SEO-First Approach',    icon: Search,      desc: 'Visibility is baked into our code.'        },
  { title: 'Mobile-First Design',   icon: Smartphone,  desc: 'Perfect experience on every device.'       },
  { title: 'On-Time Delivery',      icon: Zap,         desc: 'We respect your launch deadlines.'         },
  { title: 'Transparent Comms',     icon: Mail,        desc: 'Daily updates, zero ghosting.'             },
  { title: 'Long-Term Support',     icon: RefreshCw,   desc: 'We stay active long after launch day.'     },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* Visual grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-white/10 backdrop-blur-lg border border-white/20 rounded-[4rem] p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-20" />
              <Code2 size={200} className="text-blue-500 opacity-20 absolute" />
              <div className="grid grid-cols-2 gap-4 relative z-10 w-full">
                {features.slice(0, 4).map((f, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-3xl flex flex-col items-center text-center gap-3">
                    <div className="text-blue-500"><f.icon size={24} /></div>
                    <span className="text-xs font-bold uppercase tracking-tighter text-white">{f.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Feature list */}
          <div>
            <SectionHeading
              centered={false}
              title="Why Founders Trust Us"
              subtitle="We don't just build websites; we build business tools that generate revenue and scale effortlessly."
            />
            <div className="space-y-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-6"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-white">{f.title}</h4>
                    <p className="text-white/50">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
