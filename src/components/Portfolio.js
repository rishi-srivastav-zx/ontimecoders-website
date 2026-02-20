"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "College Forum",
    category: "Community Platform",
    img: "https://picsum.photos/seed/collegeforum/800/600",
    url: "https://collegeforum.in",
    tags: ["Next.js", "MongoDB", "Tailwind"],
  },
  {
    title: "Modern Landing",
    category: "UI Showcase",
    img: "https://picsum.photos/seed/modern/800/600",
    url: "https://silver-nasturtium-dec869.netlify.app/",
    tags: ["React", "Framer Motion"],
  },
  {
    title: "Staze",
    category: "Creative Web",
    img: "https://picsum.photos/seed/staze/800/600",
    url: "https://staze.netlify.app/",
    tags: ["Next.js", "GSAP"],
  },
  {
    title: "Starlit",
    category: "Animated Portfolio",
    img: "https://picsum.photos/seed/starlit/800/600",
    url: "https://starlit-moonbeam-89b2f5.netlify.app/",
    tags: ["Three.js", "Tailwind"],
  },
  {
    title: "Real Estate App",
    category: "Web Application",
    img: "https://picsum.photos/seed/realestate/800/600",
    url: "https://realestate-web-application.netlify.app/",
    tags: ["React", "Firebase"],
  },
  {
    title: "YouTube Clone",
    category: "Video Platform",
    img: "https://picsum.photos/seed/youtubeclone/800/600",
    url: "https://youtube-clonel.netlify.app/",
    tags: ["React", "API"],
  },
];

export default function Portfolio() {
  const [activePreview, setActivePreview] = useState(null);

  return (
    <section id="portfolio" className="sm:py-28 py-8 px-6 relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <div className="mb-20">
          <h2 className="text-5xl font-bold text-white mb-4">Selected Works</h2>
          <p className="text-white/40 max-w-xl">
            A curated collection of high-performance digital products crafted
            with precision and premium design aesthetics.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10 relative">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActivePreview(project.url)}
              onMouseLeave={() => setActivePreview(null)}
              className="group relative bg-white/[0.03] border border-white/10 
                         rounded-3xl p-5 backdrop-blur-xl 
                         hover:border-white/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Button */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                                opacity-0 group-hover:opacity-100 
                                transition duration-500 flex items-center justify-center"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-black rounded-full 
                               font-semibold hover:scale-105 transition"
                  >
                    Visit Website
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm mt-1">
                    {project.category}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-end max-w-[55%]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest 
                                 px-3 py-1 rounded-full 
                                 bg-white/5 border border-white/10 
                                 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating Side Preview */}
              <AnimatePresence>
                {activePreview === project.url && (
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute -right-[10px] top-1/2 -translate-y-1/2  z-[99999]
                               hidden xl:block 
                               w-[520px] h-[340px] 
                               bg-black rounded-2xl 
                               border border-white/20 
                               shadow-2xl overflow-hidden z-50"
                  >
                    <iframe
                      src={project.url}
                      className="w-full h-full"
                      style={{ border: "none" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
