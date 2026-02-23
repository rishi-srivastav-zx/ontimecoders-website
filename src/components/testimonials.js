'use client';

import { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechFlow',
    avatar: 'SJ',
    color: '#22d3ee',
    rating: 5,
    verified: true,
    date: 'Nov 2024',
    text: 'OntimeCoders transformed our vision into a high-performance reality. Their attention to detail is unmatched — every pixel, every interaction was considered.',
  },
  {
    name: 'Mark Davis',
    role: 'Founder',
    company: 'PeakSaaS',
    avatar: 'MD',
    color: '#818cf8',
    rating: 5,
    verified: true,
    date: 'Oct 2024',
    text: 'The Growth plan was exactly what we needed to scale. Our conversion rates have literally doubled since launch. Best investment we made this year.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'CTO',
    company: 'Innovate.io',
    avatar: 'ER',
    color: '#f472b6',
    rating: 5,
    verified: true,
    date: 'Dec 2024',
    text: 'Professional, fast, and technically brilliant. They are our go-to partners for all things web. Communication was top-notch throughout the entire project.',
  },
  {
    name: 'James Liu',
    role: 'Product Lead',
    company: 'NexaCloud',
    avatar: 'JL',
    color: '#34d399',
    rating: 5,
    verified: true,
    date: 'Sep 2024',
    text: 'Delivered two weeks ahead of schedule without cutting a single corner. The codebase is clean, documented, and a joy to build on. Will absolutely work with them again.',
  },
  {
    name: 'Priya Sharma',
    role: 'Co-Founder',
    company: 'LaunchPad',
    avatar: 'PS',
    color: '#fb923c',
    rating: 5,
    verified: true,
    date: 'Jan 2025',
    text: 'From design to deployment, the whole experience was seamless. They understood our brand immediately and executed it perfectly. Highly recommend.',
  },
  {
    name: 'Tom Bergmann',
    role: 'VP Engineering',
    company: 'ScaleForce',
    avatar: 'TB',
    color: '#a78bfa',
    rating: 5,
    verified: true,
    date: 'Feb 2025',
    text: 'The API integrations they built handle 500k+ requests/day without a hiccup. These folks know backend architecture at a deep level. Genuinely impressed.',
  },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

// ─── Verified Badge ───────────────────────────────────────────────────────────
function VerifiedBadge() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#22d3ee" stroke="none">
      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

// ─── Single Card ──────────────────────────────────────────────────────────────
function TestimonialCard({ t }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 340,
        flexShrink: 0,
        borderRadius: 20,
        padding: '1px',
        background: hovered
          ? `linear-gradient(135deg, ${t.color}55, ${t.color}22, rgba(255,255,255,0.06))`
          : 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        transition: 'background 0.4s ease',
        boxShadow: hovered
          ? `0 20px 48px -12px rgba(0,0,0,0.6), 0 0 0 1px ${t.color}22`
          : '0 8px 32px -8px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          borderRadius: 19,
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(10,15,30,0.99))',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 10% 10%, ${t.color}12, transparent 60%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Quote mark */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 20,
            fontSize: 72,
            lineHeight: 1,
            color: t.color,
            opacity: 0.08,
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          "
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Top row: stars + date */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <Stars count={t.rating} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>{t.date}</span>
          </div>

          {/* Review text */}
          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.78)',
              marginBottom: 24,
              fontStyle: 'italic',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            "{t.text}"
          </p>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
              marginBottom: 20,
            }}
          />

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Avatar */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${t.color}40, ${t.color}15)`,
                border: `1.5px solid ${t.color}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                color: t.color,
                fontFamily: 'monospace',
                flexShrink: 0,
              }}
            >
              {t.avatar}
            </div>

            {/* Name & role */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#fff',
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {t.name}
                </span>
                {t.verified && <VerifiedBadge />}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                {t.role} · <span style={{ color: t.color + 'cc' }}>{t.company}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Infinite Scroll Track ────────────────────────────────────────────────────
function InfiniteTrack({ items, speed = 35, reverse = false }) {
  const x = useMotionValue(0);
  const isPaused = useRef(false);
  const trackRef = useRef(null);
  // duplicate for seamless loop
  const doubled = [...items, ...items];

  useAnimationFrame((_, delta) => {
    if (isPaused.current) return;
    const cardW    = 340 + 24; // card width + gap
    const totalW   = items.length * cardW;
    const dir      = reverse ? 1 : -1;
    const next     = x.get() + dir * (delta / 1000) * speed;

    // reset loop
    if (!reverse && next <= -totalW) x.set(next + totalW);
    else if (reverse && next >= 0)   x.set(next - totalW);
    else x.set(next);
  });

  return (
    <div
      style={{ overflow: 'hidden', width: '100%' }}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      <motion.div
        ref={trackRef}
        style={{
          x,
          display: 'flex',
          gap: 24,
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function Testimonials() {
  return (
    <section
      style={{
        padding: '112px 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.012)',
      }}
    >
      {/* Background ambient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(34,211,238,0.04), transparent),' +
            'radial-gradient(ellipse 60% 40% at 80% 100%, rgba(99,102,241,0.04), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 72, padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            background: 'rgba(34,211,238,0.08)',
            border: '1px solid rgba(34,211,238,0.18)',
            marginBottom: 20,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', display: 'block' }} />
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#22d3ee', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Client Stories
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 16,
            fontFamily: "'Syne', sans-serif",
          }}
        >
          What Founders Say
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
          Trust is earned through performance. Here's what our clients say after we deliver.
        </p>

        {/* Social proof bar */}
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Stars count={5} />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>5.0 average</span>
          </div>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>48+ verified reviews</span>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>100% project success</span>
        </div>
      </div>

      {/* Row 1 — left to right */}
      <div style={{ marginBottom: 24 }}>
        <InfiniteTrack items={testimonials} speed={32} reverse={false} />
      </div>

      {/* Row 2 — right to left (offset start) */}
      <InfiniteTrack items={[...testimonials].reverse()} speed={28} reverse={true} />

      {/* Edge fade masks */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(5,5,16,1) 0%, transparent 8%, transparent 92%, rgba(5,5,16,1) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </section>
  );
}