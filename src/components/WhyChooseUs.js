"use client";

import { motion } from "motion/react";
import {
  ShieldCheck,
  Search,
  Smartphone,
  Zap,
  Mail,
  RefreshCw,
  CheckCircle2,
  Code2,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { SectionHeading } from "./shared";
import { useState, useRef } from "react";

const features = [
  {
    title: "Scalable Architecture",
    icon: ShieldCheck,
    desc: "Built to grow with your user base.",
  },
  {
    title: "SEO-First Approach",
    icon: Search,
    desc: "Visibility is baked into our code.",
  },
  {
    title: "Mobile-First Design",
    icon: Smartphone,
    desc: "Perfect experience on every device.",
  },
  {
    title: "On-Time Delivery",
    icon: Zap,
    desc: "We respect your launch deadlines.",
  },
  {
    title: "Transparent Comms",
    icon: Mail,
    desc: "Daily updates, zero ghosting.",
  },
  {
    title: "Long-Term Support",
    icon: RefreshCw,
    desc: "We stay active long after launch day.",
  },
];

export default function WhyChooseUs() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="sm:py-32 py-4 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Video Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-square bg-black/40 backdrop-blur-lg border border-white/20 rounded-[4rem] overflow-hidden relative shadow-2xl shadow-blue-500/10">
              {/* Video Background */}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source
                  src="/images/1629cb2e-0f8f-4dcf-588a-8e7cd2d5c755.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 mix-blend-overlay z-10" />

              {/* Animated Grid Pattern */}
              <div
                className="absolute inset-0 opacity-20 z-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-8">
                {/* Top Bar */}
                <div className="flex justify-between items-start">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2"
                  >
                    <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Live Preview
                    </span>
                  </motion.div>

                  {/* Video Controls */}
                  <div className="flex gap-2">
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="w-32 h-32 rounded-full bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center"
                  >
                    <Code2 size={64} className="text-blue-400" />
                  </motion.div>
                </div>

                {/* Bottom Feature Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {features.slice(0, 4).map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255,255,255,0.15)",
                      }}
                      className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-300 group/card"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover/card:bg-blue-500 group-hover/card:text-white transition-all duration-300">
                        <f.icon size={20} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-tighter text-white leading-tight">
                        {f.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-tl-[4rem] pointer-events-none z-30" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-br-[4rem] pointer-events-none z-30" />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl flex items-center justify-center z-30"
            >
              <Zap size={32} className="text-blue-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl flex items-center justify-center z-30"
            >
              <ShieldCheck size={28} className="text-purple-400" />
            </motion.div>
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
                  whileHover={{ x: 10 }}
                  className="flex gap-6 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">
                      {f.title}
                    </h4>
                    <p className="text-white/50 group-hover:text-white/70 transition-colors">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
            >
              {[
                { value: "150+", label: "Projects Delivered" },
                { value: "99%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support Available" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
