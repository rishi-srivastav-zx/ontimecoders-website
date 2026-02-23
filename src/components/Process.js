'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const steps = [
  {
    number: '01',
    title: 'Discovery',
    desc: 'Deep-dive into your goals, market, and users to uncover what truly needs to be built.',
    icon: '🔍',
    color: '#22d3ee',
  },
  {
    number: '02',
    title: 'Strategy',
    desc: 'Define the technical architecture, stack, and roadmap that sets the project up to scale.',
    icon: '🗺️',
    color: '#818cf8',
  },
  {
    number: '03',
    title: 'Design',
    desc: 'Craft pixel-perfect interfaces with real UX research — not just beautiful, but intuitive.',
    icon: '✦',
    color: '#f472b6',
  },
  {
    number: '04',
    title: 'Development',
    desc: 'Engineer the product with clean code, optimized performance, and future-proof architecture.',
    icon: '⚡',
    color: '#34d399',
  },
  {
    number: '05',
    title: 'Testing',
    desc: 'Rigorous QA across devices and edge cases — zero bugs reach production.',
    icon: '✓',
    color: '#fb923c',
  },
  {
    number: '06',
    title: 'Launch',
    desc: 'Deploy with confidence, monitor in real-time, and scale as your users grow.',
    icon: '🚀',
    color: '#a78bfa',
  },
];

// ─── Connector Line (desktop) ─────────────────────────────────────────────────
function ConnectorDot({ color, delay }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 8px ${color}`,
        flexShrink: 0,
      }}
    />
  );
}

// ─── Single Step Card ─────────────────────────────────────────────────────────
function StepCard({ step, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        flex: 1,
      }}
    >
      {/* ── Number badge ── */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: index * 0.12, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${step.color}22, ${step.color}0a)`,
          border: `1.5px solid ${step.color}35`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          position: 'relative',
          zIndex: 2,
          boxShadow: inView ? `0 0 24px -6px ${step.color}55` : 'none',
          transition: 'box-shadow 0.4s ease',
          cursor: 'default',
        }}
        whileHover={{
          scale: 1.08,
          boxShadow: `0 0 36px -4px ${step.color}70`,
        }}
      >
        {/* Pulse ring */}
        {inView && (
          <motion.div
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: 20,
              border: `1px solid ${step.color}`,
              opacity: 0,
            }}
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.2 }}
          />
        )}

        <span
          style={{
            fontSize: 20,
            lineHeight: 1,
            filter: 'grayscale(0)',
          }}
        >
          {step.icon}
        </span>
      </motion.div>

      {/* ── Step number pill ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.1 }}
        style={{
          fontSize: 10,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: step.color,
          marginBottom: 10,
          textTransform: 'uppercase',
        }}
      >
        Step {step.number}
      </motion.div>

      {/* ── Title ── */}
      <motion.h4
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.15 }}
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 10,
          textAlign: 'center',
          fontFamily: "'Syne', sans-serif",
          letterSpacing: '-0.01em',
        }}
      >
        {step.title}
      </motion.h4>

      {/* ── Desc ── */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.2 }}
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.38)',
          textAlign: 'center',
          lineHeight: 1.65,
          maxWidth: 148,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {step.desc}
      </motion.p>

      {/* ── Connector line (desktop, between cards) ── */}
      {!isLast && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.5 }}
          style={{
            position: 'absolute',
            top: 28,
            left: 'calc(50% + 30px)',
            right: 'calc(-50% + 30px)',
            height: 1,
            transformOrigin: 'left',
            background: `linear-gradient(90deg, ${step.color}50, ${steps[index + 1].color}50)`,
            zIndex: 1,
            display: 'none', // toggled by CSS class below
          }}
          className="process-connector"
        />
      )}
    </div>
  );
}

// ─── Mobile timeline item ─────────────────────────────────────────────────────
function MobileStep({ step, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.45 }}
      style={{ display: 'flex', gap: 20, position: 'relative' }}
    >
      {/* Left: icon + line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`,
            border: `1.5px solid ${step.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            flexShrink: 0,
            boxShadow: `0 0 20px -6px ${step.color}55`,
          }}
        >
          {step.icon}
        </div>
        {!isLast && (
          <div
            style={{
              width: 1,
              flex: 1,
              marginTop: 8,
              background: `linear-gradient(180deg, ${step.color}40, ${steps[index + 1].color}20)`,
              minHeight: 40,
            }}
          />
        )}
      </div>

      {/* Right: text */}
      <div style={{ paddingBottom: isLast ? 0 : 36 }}>
        <div style={{
          fontSize: 10, fontFamily: 'monospace', fontWeight: 700,
          letterSpacing: '0.15em', color: step.color,
          textTransform: 'uppercase', marginBottom: 6,
        }}>
          Step {step.number}
        </div>
        <h4 style={{
          fontSize: 16, fontWeight: 700, color: '#fff',
          marginBottom: 6, fontFamily: "'Syne', sans-serif",
        }}>
          {step.title}
        </h4>
        <p style={{
          fontSize: 13.5, color: 'rgba(255,255,255,0.38)',
          lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif",
        }}>
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function Process() {
  return (
    <section
      style={{
        padding: '112px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.05), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Heading ── */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 999,
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              marginBottom: 20,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#818cf8', display: 'block' }} />
            <span style={{
              fontSize: 12, fontFamily: 'monospace', color: '#818cf8',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              How We Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            style={{
              fontSize: 'clamp(32px,5vw,52px)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 16,
              fontFamily: "'Syne', sans-serif",
            }}
          >
            Our Process
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.38)',
              maxWidth: 460,
              margin: '0 auto',
              lineHeight: 1.65,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            A systematic, battle-tested approach to building software that performs and scales.
          </motion.p>
        </div>

        {/* ── Desktop grid (md+) ── */}
        <div
          className="process-desktop"
          style={{
            display: 'none', // shown via media query CSS below
            gap: 0,
            position: 'relative',
          }}
        >
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>

        {/* ── Mobile timeline ── */}
        <div
          className="process-mobile"
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 480,
            margin: '0 auto',
          }}
        >
          {steps.map((step, i) => (
            <MobileStep key={i} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: 72,
            padding: '1px',
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(99,102,241,0.15), rgba(255,255,255,0.04))',
          }}
        >
          <div
            style={{
              borderRadius: 19,
              padding: '32px 40px',
              background: 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(10,15,30,0.99))',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(34,211,238,0.07), transparent)',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{
                fontSize: 22, fontWeight: 700, color: '#fff',
                fontFamily: "'Syne', sans-serif", letterSpacing: '-0.02em',
                marginBottom: 6,
              }}>
                Ready to start your project?
              </h3>
              <p style={{
                fontSize: 14, color: 'rgba(255,255,255,0.38)',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                From discovery call to live product — we move fast.
              </p>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              style={{
                position: 'relative', zIndex: 1,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px', borderRadius: 12,
                background: 'linear-gradient(135deg,#22d3ee,#6366f1)',
                color: '#fff', fontWeight: 600, fontSize: 14,
                textDecoration: 'none',
                boxShadow: '0 4px 24px -6px rgba(34,211,238,0.45)',
                fontFamily: "'DM Sans', sans-serif",
                flexShrink: 0,
              }}
            >
              Start the Process →
            </motion.a>
          </div>
        </motion.div>

      </div>

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (min-width: 768px) {
          .process-desktop {
            display: flex !important;
          }
          .process-mobile {
            display: none !important;
          }
          .process-connector {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}