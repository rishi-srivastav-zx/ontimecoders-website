'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onFinish }) { 
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    "Preparing something amazing...",
    "Now you're seeing the best website",
    "Crafting pixels with precision...",
    "Almost ready to blow your mind..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Wait minimum 3.5s total, then fade out and notify parent
      const minWait = setTimeout(() => {
        setIsLoading(false);
        // Give exit animation time (0.8s) before showing main app
        setTimeout(() => {
          onFinish?.(); // 👈 tells AppClient loading is done
        }, 800);
      }, 3500);
      return () => clearTimeout(minWait);
    }
  }, [progress, onFinish]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
          </div>

          {/* Floating Orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl px-6">

            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="w-24 h-24 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-xl border-2 border-cyan-500/30 border-t-cyan-400"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-lg border-2 border-purple-500/30 border-b-purple-400"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold bg-gradient-to-br from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    &lt;/&gt;
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Animated Text */}
            <div className="h-16 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={textIndex}
                  initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-2xl md:text-4xl font-bold text-center text-white tracking-tight"
                >
                  {loadingTexts[textIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-sm text-slate-400 font-mono">
                <span>Loading experience</span>
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {Math.floor(progress)}%
                </motion.span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_100%]"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${progress}%`,
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    width: { duration: 0.3, ease: "easeOut" },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                  }}
                />
              </div>
            </div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-3 mt-4"
            >
              {['React', 'Next.js', 'Node', 'Cloud'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className="px-3 py-1 text-xs font-mono text-cyan-400/80 border border-cyan-500/20 rounded-full bg-cyan-950/30"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-slate-800" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-slate-800" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-slate-800" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-slate-800" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}