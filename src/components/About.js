'use client';

import { motion } from 'motion/react';

const devs = [
  { name: 'Rishi Srivastav', role: 'UI/UX Engineer',  img: './images/umeshavatar.jpeg'  },
  { name: 'Umesh Naudiyal',  role: 'Lead Architect',   img: './images/rishiavatar.jpeg'  },
];

export default function About() {
  return (
    <section id="about" className="sm:py-32 py-4 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Two Developers. One Mission.
          </h2>
          <p className="text-white/60 text-lg mb-6 leading-relaxed">
            OntimeCoders was founded by two full-stack engineers who were tired of seeing startups
            struggle with bloated, slow, and unscalable code.
          </p>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Our mission is simple: to provide founder-driven technical expertise that prioritises
            reliability, performance, and clean architecture. We don't just write code; we build
            the foundation for your business to scale.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-1">99%</div>
              <div className="text-sm text-white/40 uppercase tracking-wider">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-1">150+</div>
              <div className="text-sm text-white/40 uppercase tracking-wider">Projects Delivered</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {devs.map((dev, i) => (
            <motion.div
              key={dev.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-800"
            >
              <img
                src={dev.img}
                alt={dev.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src =
                    `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500'><rect fill='%23334155' width='400' height='500'/><text fill='%2394a3b8' x='200' y='250' text-anchor='middle' font-size='16' font-family='sans-serif'>${dev.name}</text></svg>`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-bold text-white">{dev.name}</h3>
                <p className="text-white/60 text-sm">{dev.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
