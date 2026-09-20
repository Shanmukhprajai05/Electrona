import Profile from "./pages/Profile";
import React, { useState, useEffect } from 'react';
import { PageTab } from './types';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PerformanceSystem from './components/PerformanceSystem';
import ProductKitShowcase from './components/ProductKitShowcase';
import PerformanceJourney from './components/PerformanceJourney';
import AthleteTestimonials from './components/AthleteTestimonials';
import SportsHub from './components/SportsHub';
import ProductsTab from './components/ProductsTab';
import AboutTab from './components/AboutTab';
import Footer from './components/Footer';
import { Zap, Sparkles } from 'lucide-react';
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('HOME');
  console.log("Current Active Tab:", activeTab);
  const [transitioning, setTransitioning] = useState<boolean>(false);
  const [targetTab, setTargetTab] = useState<PageTab>('HOME');
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Trigger cinematic horizontal 0.8s transition
  const handleTabChange = (newTab: PageTab) => {
    if (newTab === activeTab) return;
    
    // Determine horizontal translation direction based on tab index comparison
    const tabsOrder: PageTab[] = [
  'HOME',
  'PRODUCTS',
  'SPORTS',
  'ABOUT',
  'LOGIN',
  'REGISTER',
  'PROFILE'
];
    const currentIdx = tabsOrder.indexOf(activeTab);
    const targetIdx = tabsOrder.indexOf(newTab);
    setDirection(targetIdx > currentIdx ? 'right' : 'left');

    setTargetTab(newTab);
    setTransitioning(true);

    // Swap the view mid-sweep at peak opacity (400ms)
    setTimeout(() => {
      setActiveTab(newTab);
    }, 400);

    // Complete the sweep transition at 800ms
    setTimeout(() => {
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }, 850);
  };

  const handleOpenStore = () => {
    handleTabChange('PRODUCTS');
    setTimeout(() => {
      const checkoutElem = document.getElementById('products-checkout-simulator');
      if (checkoutElem) {
        checkoutElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden font-sans select-none relative selection:bg-brand-orange selection:text-white">
      
      {/* Cinematic Sweep Transition Overlay */}
      <div 
        className={`fixed inset-0 z-100 pointer-events-none flex items-center justify-center transition-all duration-800 ${
          transitioning ? 'opacity-100' : 'opacity-0'
        }`}
        id="page-sweep-overlay"
      >
        {/* Fullscreen horizontal moving sweep */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-brand-orange/95 via-brand-cyan/95 to-purple-800/95 transition-all duration-800 transform ${
            transitioning 
              ? direction === 'right' 
                ? 'translate-x-0 scale-x-100' 
                : 'translate-x-0 scale-x-100'
              : direction === 'right'
                ? 'translate-x-[100%] scale-x-0'
                : 'translate-x-[-100%] scale-x-0'
          }`}
          style={{ 
            transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' 
          }}
        />

        {/* Soft Volumetric Light Diffusion & Gaussian Blur Flare instead of the hard white line */}
        {transitioning && (
          <div className="absolute inset-0 pointer-events-none mix-blend-screen filter blur-[120px] opacity-40" 
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(0,217,255,0.35) 45%, rgba(255,107,0,0.1) 75%, transparent 100%)',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }}
          />
        )}

        {/* Moving energy text indicators */}
        <div className="relative font-display font-black text-4xl m-4 tracking-widest text-white flex items-center gap-3 select-none">
          <Zap className="w-8 h-8 text-white animate-bounce" />
          SWEEPING HIGH-VOLTAGE HYDRATION CORE...
        </div>
      </div>

      {/* Global Minimal Navigation Menu */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        onOpenStore={handleOpenStore}
      />

      {/* Dynamic Slide Pages Frame */}
      <main 
        className={`transition-all duration-700 ${
          transitioning 
            ? 'blur-md scale-[0.98]' 
            : 'blur-0 scale-100'
        }`}
        id="telemetry-screen-container"
      >
        {activeTab === 'HOME' && (
          <div className="animate-fade-in">
            {/* S1: Dynamic Glowing Hero */}
            <HeroSection 
              onExplore={() => {
                const perfSec = document.getElementById('science-section');
                if (perfSec) {
                  perfSec.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              onViewProducts={() => handleTabChange('PRODUCTS')} 
            />

            {/* S4: Chronological timeline of the athlete life-cycle */}
            <PerformanceJourney />

            {/* S5: Premium Flavour Performance showcase card */}
            <ProductKitShowcase />

            {/* S7: Infinite moving tags marquee and elite athlete reviews */}
            <AthleteTestimonials />
          </div>
        )}

        {activeTab === 'PRODUCTS' && (
          <div className="animate-fade-in">
            <ProductsTab />
          </div>
        )}

        {activeTab === 'SPORTS' && (
          <div className="animate-fade-in">
            <SportsHub />
          </div>
        )}

        {activeTab === 'ABOUT' && (
          <div className="animate-fade-in">
            <AboutTab />
          </div>
        )}

        {activeTab === 'LOGIN' && (
         <div className="animate-fade-in">
            <Login setActiveTab={handleTabChange} />
         </div>
       )}

        {activeTab === "REGISTER" && (
         <div className="animate-fade-in">
          <Register setActiveTab={handleTabChange} />
         </div>
       )}

       {activeTab === "PROFILE" && (
        <div className="animate-fade-in">
         {localStorage.getItem("idToken") ? (
          <Profile setActiveTab={handleTabChange} />
         ) : (
           <Login setActiveTab={handleTabChange} />
         )}
        </div>
      )}
      </main>

      {/* High-voltage diagnostic modular footer */}
      <Footer 
        setActiveTab={handleTabChange}
        onOpenStore={handleOpenStore}
      />

    </div>
  );
}
