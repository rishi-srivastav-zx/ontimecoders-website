'use client';

import { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';

import Scene from './Scene';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';
import Portfolio from './Portfolio';
import { Process, Testimonials } from './ProcessAndTestimonials';
import Pricing from './Pricing';
import { Contact } from './contact';
import { Footer } from './Footer';  

const ScrollContent = memo(function ScrollContent() {
  return (
    <div className="w-screen">
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Process />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
});

export default function AppClient() {
  return (
    <div className="font-sans bg-[#050505] selection:bg-blue-600/30 selection:text-white">
      <Navbar />

      <div className="fixed inset-0 z-0">
        <Canvas shadows={false} gl={{ antialias: true }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ScrollControls pages={9.2} damping={0.1}>
              <Scene />
              <Scroll html style={{ width: '100vw' }}>
                <ScrollContent />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
