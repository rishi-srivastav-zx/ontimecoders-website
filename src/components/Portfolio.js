'use client';

import { motion } from 'motion/react';
import { SectionHeading } from './shared';

const projects = [
  { title: 'Nexus SaaS',  category: 'App Development', img: 'https://picsum.photos/seed/nexus/800/600',   tags: ['React', 'Node.js', 'AWS']              },
  { title: 'Luxe E-com',  category: 'E-commerce',      img: 'https://picsum.photos/seed/luxe/800/600',    tags: ['Next.js', 'Shopify', 'Tailwind']        },
  { title: 'FinTech Pro', category: 'Dashboard',       img: 'https://picsum.photos/seed/fintech/800/600', tags: ['TypeScript', 'D3.js', 'Firebase']       },
  { title: 'Vibe Social', category: 'Social Platform', img: 'https://picsum.photos/seed/vibe/800/600',    tags: ['React Native', 'GraphQL', 'PostgreSQL'] },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Selected Works"
          subtitle="A glimpse into the high-performance products we've engineered."
        />
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden mb-6 aspect-[4/3]">
                <img
                  src={p.img}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button className="px-8 py-3 bg-white text-black rounded-full font-bold">
                    View Project
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{p.title}</h3>
                  <p className="text-white/40 text-sm">{p.category}</p>
                </div>
                <div className="flex gap-2 flex-wrap justify-end">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
