'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Menu, X, Play, Volume2, VolumeX, Maximize } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = ['About', 'Services', 'Portfolio', 'Pricing', 'Contact'];

// Video Modal Component
function VideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isOpen]);

  // Pause video when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.4
            }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-blue-600/20 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                poster="./images/video-poster.jp" // Add your poster image
              >
                <source src="./images/6997563d204031300Iu3fUhiUh1742.mp4" type="video/mp4" />
                {/* Fallback for different formats */}
                <source src="/your-video.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause Button */}
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      {isPlaying ? (
                        <div className="flex gap-1">
                          <div className="w-1 h-4 bg-white" />
                          <div className="w-1 h-4 bg-white" />
                        </div>
                      ) : (
                        <Play size={20} className="text-white ml-0.5" fill="white" />
                      )}
                    </button>

                    {/* Mute Button */}
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX size={20} className="text-white" />
                      ) : (
                        <Volume2 size={20} className="text-white" />
                      )}
                    </button>
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={() => videoRef.current?.requestFullscreen()}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <Maximize size={18} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors z-10"
              >
                <X size={20} />
              </motion.button>

              {/* Title Overlay */}
              <div className="absolute top-4 left-4">
                <h3 className="text-white font-bold text-lg drop-shadow-lg">
                  Welcome to OntimeCoders
                </h3>
                <p className="text-white/70 text-sm">Watch our story</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal on escape key
 useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setIsVideoModalOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  window.addEventListener('keydown', handleEscape);

  return () => {
    window.removeEventListener('keydown', handleEscape);
  };
}, []);

  const handleNavClick = (item) => {
    const id = item.toLowerCase();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
          isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent',
        )}
      >
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Code2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">OntimeCoders</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
            
            {/* Get Started Button - Opens Video Modal */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVideoModalOpen(true)}
              className="px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Play size={14} fill="currentColor" />
              Get Started
            </motion.button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => handleNavClick(item)}
                  className="text-lg font-medium text-white/70 cursor-pointer"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsVideoModalOpen(true);
                }}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Play size={16} fill="currentColor" />
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Video Popup Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </>
  );
}