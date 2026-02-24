'use client';

import { Suspense, memo, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "motion/react";
import Scene from "./Scene";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import WhyChooseUs from "./WhyChooseUs";
import Portfolio from "./Portfolio";
import { Process } from "./Process";
import { Testimonials } from "./testimonials"; 
import Pricing, { PricingModals } from "./Pricing";
import { Contact } from "./contact";
import { Footer } from "./Footer";
import { LoadingScreen } from "./loadingscreen";
import { ScrollGuardian } from "./scrollguard";

const ScrollContent = memo(function ScrollContent({ onPlanSelect, footerRef, mainContentRef }) {
  return (
    <div className="w-full relative overflow-x-hidden">
      <div ref={mainContentRef}>
        <Hero />
      </div>
      <About />
      <Services onPlanSelect={onPlanSelect} />
      <WhyChooseUs />
      <Portfolio />
      <Process />
      <Testimonials />
      <Pricing onPlanSelect={onPlanSelect} />
      <Contact />
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
});

export default function AppClient() {
  const [isLoading, setIsLoading] = useState(true); // 👈 controls loading state
  const [showIndianModal, setShowIndianModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  
  const footerRef = useRef(null);
  const mainContentRef = useRef(null);

  const openIndianModal = () => setShowIndianModal(true);
  const closeIndianModal = () => setShowIndianModal(false);

  const openContactModal = (planName = "") => {
    setSelectedPlan(planName);
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setSelectedPlan("");
  };

  const handlePlanSelect = (planName) => {
    if (planName === "openIndianModal") {
      openIndianModal();
      return;
    }
    closeIndianModal();
    setTimeout(() => openContactModal(planName), 300);
  };

  return (
    <>
      {/* ✅ Loading Screen — sits on top, disappears when done */}
      <LoadingScreen onFinish={() => setIsLoading(false)} />

      {/* ✅ Main App — fades in after loading */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-sans bg-[#050505] selection:bg-blue-600/30 selection:text-white"
          >
            <Navbar />
            
            {/* 3D Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <Canvas shadows={false} gl={{ antialias: true }} dpr={[1, 1.5]}>
                <Suspense fallback={null}>
                   <Scene />
                </Suspense>
              </Canvas>
            </div>

            {/* Scrollable Content */}
            <div className="relative z-10 w-full">
               <ScrollContent 
                 onPlanSelect={handlePlanSelect} 
                 footerRef={footerRef}
                 mainContentRef={mainContentRef}
               />
            </div>

            {/* Scroll Guard - Detects if user scrolls beyond footer */}
            <ScrollGuardian footerRef={footerRef} mainContentRef={mainContentRef} />

            <PricingModals
              showIndianModal={showIndianModal}
              showContactModal={showContactModal}
              selectedPlan={selectedPlan}
              onOpenIndianModal={openIndianModal}
              onCloseIndianModal={closeIndianModal}
              onCloseContactModal={closeContactModal}
              onPlanSelect={handlePlanSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}