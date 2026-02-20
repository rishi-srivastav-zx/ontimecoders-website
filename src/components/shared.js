'use client';

import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function SectionHeading({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-4 text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function GlassCard({ children, className }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className={cn(
        'bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/10',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
