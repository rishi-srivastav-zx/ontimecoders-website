"use client";

import { Suspense, memo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";

import Scene from "./Scene";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import WhyChooseUs from "./WhyChooseUs";
import Portfolio from "./Portfolio";
import { Process, Testimonials } from "./ProcessAndTestimonials";
import Pricing, { PricingModals } from "./Pricing";
import { Contact } from "./contact";
import { Footer } from "./Footer";

const ScrollContent = memo(function ScrollContent({ onPlanSelect }) {
  return (
    <div className="w-screen">
      <Hero />
      <About />
      <Services onPlanSelect={onPlanSelect} />
      <WhyChooseUs />
      <Portfolio />
      <Process />
      <Testimonials />
      <Pricing onPlanSelect={onPlanSelect} />
      <Contact />
      <Footer />
    </div>
  );
});

export default function AppClient() {
  const [showIndianModal, setShowIndianModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [pages, setPages] = useState(11); // default desktop

  // ✅ Responsive pages logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setPages(19.5); // mobile / tablet
      } else {
        setPages(11); // desktop
      }
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="font-sans bg-[#050505] selection:bg-blue-600/30 selection:text-white">
      <Navbar />

      <div className="fixed inset-0 z-0">
        <Canvas shadows={false} gl={{ antialias: true }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ScrollControls pages={pages} damping={0.1}>
              <Scene />
              <Scroll html style={{ width: "100vw" }}>
                <ScrollContent onPlanSelect={handlePlanSelect} />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      <PricingModals
        showIndianModal={showIndianModal}
        showContactModal={showContactModal}
        selectedPlan={selectedPlan}
        onOpenIndianModal={openIndianModal}
        onCloseIndianModal={closeIndianModal}
        onCloseContactModal={closeContactModal}
        onPlanSelect={handlePlanSelect}
      />
    </div>
  );
}
