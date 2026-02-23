'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';

// ─── SVG Icons (no external dep needed) ───────────────────────────────────────
const IconArrowUp    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
const IconHome       = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconX          = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

// ─── Floating Orb ─────────────────────────────────────────────────────────────
function Orb({ x, y, size, color, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: 'blur(40px)', opacity: 0 }}
      animate={{ opacity: [0, 0.35, 0], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = display;
    const end = Math.floor(value);
    if (start === end) return;
    let raf;
    const duration = 300;
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.round(start + (end - start) * t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{display}</>;
}

// ─── Depth Tier ───────────────────────────────────────────────────────────────
function getDepthTier(depth) {
  if (depth < 150) return { label: 'End of page',   emoji: '🏁', color: '#22d3ee' };
  if (depth < 300) return { label: 'Past the edge', emoji: '🌊', color: '#818cf8' };
  if (depth < 500) return { label: 'The void',      emoji: '🌌', color: '#a78bfa' };
  return              { label: 'Deep space',        emoji: '🚀', color: '#f472b6' };
}

// ─── Scanning Line ────────────────────────────────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      className="absolute inset-x-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.6), transparent)' }}
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ScrollGuardian({ footerRef, mainContentRef }) {
  const [isBeyondFooter, setIsBeyondFooter]   = useState(false);
  const [scrollDepth,    setScrollDepth]       = useState(0);
  const [showCard,       setShowCard]          = useState(false);
  const [dismissed,      setDismissed]         = useState(false);
  const [pulseBtn,       setPulseBtn]          = useState(false);

  // Pulse the mini button to invite click
  useEffect(() => {
    if (isBeyondFooter && !showCard && !dismissed) {
      const t = setTimeout(() => setPulseBtn(true), 600);
      return () => clearTimeout(t);
    }
    setPulseBtn(false);
  }, [isBeyondFooter, showCard, dismissed]);

  useEffect(() => {
    const onScroll = () => {
      if (!footerRef?.current) return;
      const rect    = footerRef.current.getBoundingClientRect();
      const beyond  = Math.max(0, window.innerHeight - rect.bottom);
      setScrollDepth(beyond);

      if (beyond > 40) {
        setIsBeyondFooter(true);
        if (beyond > 120 && !dismissed) setShowCard(true);
      } else {
        setIsBeyondFooter(false);
        setShowCard(false);
        setDismissed(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [footerRef, dismissed]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowCard(false);
  }, []);

  const scrollToContent = useCallback(() => {
    const target = mainContentRef?.current;
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: window.innerHeight * 0.25, behavior: 'smooth' });
    setShowCard(false);
  }, [mainContentRef]);

  const dismiss = useCallback(() => {
    setShowCard(false);
    setDismissed(true);
  }, []);

  const tier         = getDepthTier(scrollDepth);
  const depthPercent = Math.min((scrollDepth / 500) * 100, 100);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">

      {/* ── Backdrop ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 pointer-events-auto"
            style={{ background: 'rgba(2,6,23,0.55)', backdropFilter: 'blur(6px)' }}
            onClick={dismiss}
          />
        )}
      </AnimatePresence>

      {/* ── Main Card ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            key="card"
            initial={{ y: 120, opacity: 0, scale: 0.92 }}
            animate={{ y: 0,   opacity: 1, scale: 1    }}
            exit={{   y: 120, opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 pointer-events-auto"
          >
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(15,23,42,0.95) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 32px 64px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(34,211,238,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Ambient orbs */}
              <Orb x="10%"  y="0%"  size={120} color="rgba(34,211,238,0.5)"   delay={0}   />
              <Orb x="60%"  y="30%" size={100} color="rgba(168,85,247,0.4)"   delay={1.5} />

              {/* Scanning line */}
              <ScanLine />

              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }}
              />

              {/* Dismiss btn */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={dismiss}
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors z-20"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <IconX />
              </motion.button>

              {/* Content */}
              <div className="relative z-10 p-6">

                {/* Depth badge */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide"
                    style={{ background: `${tier.color}18`, border: `1px solid ${tier.color}30`, color: tier.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: tier.color }} />
                    {tier.label}
                  </div>
                  <span className="text-lg">{tier.emoji}</span>
                </div>

                {/* Headline */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tier.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-white font-semibold text-lg leading-snug mb-1"
                      style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.02em' }}>
                      {scrollDepth > 400
                        ? "You've entered deep space"
                        : scrollDepth > 250
                        ? "Nothing left to explore"
                        : "You've reached the end"}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {scrollDepth > 400
                        ? "Bold move. The content ended a while ago."
                        : scrollDepth > 250
                        ? "You've scrolled past everything. Impressive."
                        : "The page ends here. Head back up?"}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Depth meter */}
                <div className="mt-5 mb-5">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-mono text-slate-500 tracking-wider uppercase">Scroll depth</span>
                    <span className="text-[11px] font-mono" style={{ color: tier.color }}>
                      <AnimatedNumber value={scrollDepth} />px
                    </span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, #22d3ee, ${tier.color})` }}
                      animate={{ width: `${depthPercent}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2.5">
                  {/* Primary – scroll to top */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToTop}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{
                      background: `linear-gradient(135deg, #22d3ee, #6366f1)`,
                      boxShadow: '0 4px 20px -4px rgba(34,211,238,0.4)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <IconArrowUp />
                    Back to top
                  </motion.button>

                  {/* Secondary – go to content */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToContent}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-slate-300 transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.09)',
                    }}
                    title="Go to main content"
                  >
                    <IconHome />
                    <span className="hidden sm:inline">Home</span>
                  </motion.button>
                </div>

              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 inset-x-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mini FAB (when card is dismissed / not yet shown) ─────────────── */}
      <AnimatePresence>
        {isBeyondFooter && !showCard && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{   scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => { setShowCard(true); setDismissed(false); }}
            className="absolute bottom-6 right-6 w-12 h-12 rounded-2xl flex items-center justify-center pointer-events-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(99,102,241,0.15))',
              border: '1px solid rgba(34,211,238,0.25)',
              boxShadow: pulseBtn
                ? '0 0 0 6px rgba(34,211,238,0.12), 0 8px 24px -4px rgba(0,0,0,0.5)'
                : '0 8px 24px -4px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)',
              color: '#22d3ee',
              transition: 'box-shadow 0.4s ease',
            }}
            title="You've scrolled past the footer"
          >
            <motion.div
              animate={{ y: pulseBtn ? [0, -3, 0] : 0 }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <IconArrowUp />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}