'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { ArrowRight } from 'lucide-react';

// Floating code snippets with varied animations
const floatingSnippets = [
  { 
    text: 'const app = express();', 
    style: { top: '18%', left: '5%' },
    animation: { y: [-10, 10, -10], x: [-5, 5, -5], rotate: [-2, 2, -2] },
    duration: 8,
    delay: 0
  },
  { 
    text: 'await db.connect();',    
    style: { top: '35%', right: '8%' },
    animation: { y: [15, -15, 15], x: [3, -3, 3], rotate: [2, -2, 2] },
    duration: 10,
    delay: 1
  },
  { 
    text: '<div className="hero">', 
    style: { top: '65%', left: '12%' },
    animation: { y: [-8, 12, -8], x: [-4, 4, -4], rotate: [-1, 3, -1] },
    duration: 9,
    delay: 2
  },
  { 
    text: 'npm run build',          
    style: { top: '25%', right: '3%' },
    animation: { y: [12, -8, 12], x: [5, -5, 5], rotate: [3, -1, 3] },
    duration: 11,
    delay: 0.5
  },
  { 
    text: 'git push origin main',   
    style: { top: '72%', right: '15%' },
    animation: { y: [-12, 8, -12], x: [-3, 3, -3], rotate: [-3, 1, -3] },
    duration: 7,
    delay: 1.5
  },
  { 
    text: 'console.log("Hello");',   
    style: { top: '45%', left: '3%' },
    animation: { y: [8, -12, 8], x: [4, -4, 4], rotate: [1, -3, 1] },
    duration: 12,
    delay: 2.5
  },
  { 
    text: 'import React from "react";',   
    style: { top: '55%', right: '5%' },
    animation: { y: [-15, 5, -15], x: [-2, 6, -2], rotate: [-2, 2, -2] },
    duration: 9,
    delay: 3
  },
  { 
    text: 'export default function()',   
    style: { top: '82%', left: '20%' },
    animation: { y: [5, -15, 5], x: [6, -2, 6], rotate: [2, -2, 2] },
    duration: 10,
    delay: 1.2
  },
];

// Matrix/Scramble Text Effect Component
function ScrambleText({ 
  text, 
  className = '', 
  speed = 60,
  pauseDuration = 1000,
  scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(true);
  const frameRef = useRef();
  const iterationRef = useRef(0);

  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIterations = text.length * 3; // Each letter scrambles 3 times
    
    const animate = () => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 3) {
              return text[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );

      iteration += 1;
      iterationRef.current = iteration;

      if (iteration < maxIterations) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
        // Pause then restart
        setTimeout(() => {
          setIsScrambling(true);
          scramble();
        }, pauseDuration);
      }
    };

    animate();
  }, [text, scrambleChars, pauseDuration]);

  useEffect(() => {
    scramble();
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scramble]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[0.8em] bg-[#00f0ff] ml-1 align-middle"
        style={{ 
          boxShadow: '0 0 10px rgba(0,240,255,0.8), 0 0 20px rgba(0,240,255,0.4)',
        }}
      />
    </span>
  );
}

// Continuous Code Rain Effect for Background
function CodeRain({ snippets }) {
  return (
    <>
      {snippets.map((s, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs pointer-events-none select-none z-0 whitespace-nowrap"
          style={{
            color: '#00f0ff',
            textShadow: '0 0 10px rgba(0,240,255,0.5), 0 0 20px rgba(0,240,255,0.3)',
            ...s.style,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
            y: [20, 0, 0, -30],
            x: s.animation.x,
            rotate: s.animation.rotate,
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          {/* Scramble effect on each snippet */}
          <ScrambleSnippet text={s.text} speed={100 + i * 20} />
        </motion.div>
      ))}
    </>
  );
}

// Individual snippet with scramble effect
function ScrambleSnippet({ text, speed }) {
  const [display, setDisplay] = useState(text);
  
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      iteration += 1/3;
      
      if (iteration >= text.length) {
        iteration = 0;
        setTimeout(() => {
          // Restart scramble
        }, 1000);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);
  
  return <span>{display}</span>;
}

// Typewriter component with blinking cursor
function TypewriterText({ text, delay = 0, onComplete, speed = 80 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(count, text.length, {
        type: "tween",
        duration: (text.length * speed) / 1000,
        ease: "easeInOut",
        onComplete: () => {
          setIsComplete(true);
          onComplete?.();
          setInterval(() => {
            setShowCursor(prev => !prev);
          }, 530);
        }
      });
      return () => controls.stop;
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, count, speed, onComplete]);

  return (
    <span className="relative">
      <motion.span>{displayText}</motion.span>
      <motion.span
        animate={{ opacity: isComplete ? (showCursor ? 1 : 0) : 1 }}
        transition={{ duration: 0.1 }}
        className="inline-block w-[3px] h-[0.8em] bg-[#00f0ff] ml-1 align-middle"
        style={{ 
          boxShadow: '0 0 10px rgba(0,240,255,0.8), 0 0 20px rgba(0,240,255,0.4)',
        }}
      />
    </span>
  );
}

// Main Hero Component
export default function Hero() {
  const laptopRef = useRef(null);
  const [startTyping, setStartTyping] = useState(false);
  const [titleScramble, setTitleScramble] = useState(false);

  // Parallax laptop on scroll
  useEffect(() => {
    const onScroll = () => {
      if (laptopRef.current)
        laptopRef.current.style.transform =
          `rotateY(-20deg) rotateX(10deg) translateY(${window.scrollY * 0.15}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Magnetic buttons
  useEffect(() => {
    const els = document.querySelectorAll('.hero-magnetic');
    const handlers = [];
    els.forEach((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      };
      const leave = () => { el.style.transform = 'translate(0,0)'; };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      handlers.push([move, leave]);
    });
    return () => {
      els.forEach((el, i) => {
        el.removeEventListener('mousemove', handlers[i][0]);
        el.removeEventListener('mouseleave', handlers[i][1]);
      });
    };
  }, []);

  // Start animations sequence
  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 500);
    const scrambleTimer = setTimeout(() => setTitleScramble(true), 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(scrambleTimer);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ perspective: '1200px' }}
    >
      {/* Animated floating code snippets with scramble effect */}
      <CodeRain snippets={floatingSnippets} />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge with typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            {startTyping && (
              <TypewriterText 
                text="Next-Gen Web Development" 
                delay={200}
                speed={60}
              />
            )}
          </span>
        </motion.div>

        {/* Brand name — CONTINUOUS SCRAMBLE EFFECT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <h1
            className="font-extrabold uppercase tracking-tighter leading-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7.5rem)',
              color: '#00f0ff',
              textShadow: '0 0 40px rgba(0,240,255,0.45), 0 0 80px rgba(0,240,255,0.2)',
            }}
          >
            {titleScramble ? (
              <ScrambleText 
                text="OntimeCoders" 
                speed={40}
                pauseDuration={3000}
                className="text-[#00f0ff]"
              />
            ) : (
              <span className="opacity-0">OntimeCoders</span>
            )}
          </h1>
        </motion.div>

        {/* Tagline with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mb-4 h-[clamp(1.25rem,3vw,2.1rem)]"
        >
          <p
            className="font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 2.1rem)',
              background: 'linear-gradient(90deg, #00f0ff, #7b5cff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {startTyping && (
              <TypewriterText 
                text="Launch Faster. Scale Smarter." 
                delay={2500}
                speed={70}
              />
            )}
          </p>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.7 }}
          className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          We build scalable, high-performance digital products engineered for growth — on time, every time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a
            href="#contact"
            className="hero-magnetic px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 group relative overflow-hidden"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: '#00f0ff',
              color: '#050810',
              boxShadow: '0 0 30px rgba(0,240,255,0.4)',
              textDecoration: 'none',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Book a Free Call
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>

          <motion.a
            href="#services"
            className="hero-magnetic px-8 py-4 rounded-full font-bold text-lg relative overflow-hidden"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(123,92,255,0.08)',
              border: '1px solid rgba(123,92,255,0.5)',
              color: '#c4b5fd',
              textDecoration: 'none',
            }}
          >
            <span className="relative z-10">View Our Work</span>
            <motion.div
              className="absolute inset-0 bg-purple-600/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: 'inherit' }}
            />
          </motion.a>
        </motion.div>
      </div>

      {/* 3D Laptop */}
      <div
        ref={laptopRef}
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '9%',
          right: '4%',
          width: 270,
          height: 185,
          transform: 'rotateY(-20deg) rotateX(10deg)',
          opacity: 0.52,
          transition: 'transform 0.08s linear',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '82%',
            background: 'linear-gradient(135deg,#0d1220,#1a1a2e)',
            border: '7px solid #2a2a3e',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 30px rgba(0,240,255,0.08), 0 0 40px rgba(0,240,255,0.12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(0deg,rgba(0,240,255,0.03) 0px,rgba(0,240,255,0.03) 1px,transparent 1px,transparent 4px)',
            }}
          />
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontFamily: 'monospace',
              fontSize: '2.6rem',
              fontWeight: 800,
              color: '#00f0ff',
              textShadow: '0 0 20px rgba(0,240,255,0.7)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {'</>'}
          </motion.span>
        </div>
        <div
          style={{
            width: '112%', height: 12,
            background: 'linear-gradient(180deg,#2a2a3e,#1a1a2e)',
            position: 'absolute', bottom: 0, left: '-6%',
            borderRadius: '0 0 10px 10px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
          }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}