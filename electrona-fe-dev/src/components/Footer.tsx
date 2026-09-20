import React from 'react';
import { PageTab } from '../types';
import { ArrowUp, Mail, Phone, Shield } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenStore: () => void;
}

export default function Footer({ setActiveTab, onOpenStore }: FooterProps) {
  
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 py-16 px-6 md:px-12 lg:px-24 text-left z-10 overflow-hidden" id="footer-comp">
      
      {/* Background radial spotlights */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-orange/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid: Left Side and Right Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-white/5">
          
          {/* Left Side: Logo, Tagline, Slogan */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 justify-start">
                <span className="font-display font-black text-2xl text-white tracking-[0.25em]">
                  ELECTR<span className="text-brand-orange text-glow-orange">O</span>NA
                </span>
                <span className="font-mono text-[7px] text-[#00D9FF] uppercase tracking-widest border border-[#00D9FF]/20 bg-[#00D9FF]/5 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
              
              <p className="font-display text-2xl md:text-3xl font-black italic tracking-wide text-zinc-400">
                <span className="text-[#FF6B00]">Fuel.</span> <span className="text-[#00D9FF]">Perform.</span> <span className="text-[#00E575]">Recover.</span>
              </p>
            </div>

            {/* Copyright block */}
            <div className="font-sans text-xs text-zinc-500 font-light text-left">
              © 2025 Zenith Zap Beverages. All rights reserved.
            </div>
          </div>

          {/* Right Side: DPIIT recognition details & contact coordinates */}
          <div className="flex flex-col md:items-end md:text-right space-y-6 justify-between">
            
            {/* DPIIT Recognition badge block */}
            <div className="p-4 bg-zinc-950/80 border border-white/10 rounded-2xl w-full md:w-80 text-left">
              <div className="flex items-center gap-2 text-white font-mono text-[10px] tracking-wider font-bold mb-1 uppercase">
                <Shield className="w-4 h-4 text-[#FF6B00]" />
                DPIIT Recognition Information
              </div>
              <p className="text-[#00D9FF] font-mono font-black text-sm tracking-widest mt-1">
                DPIIT - DIPP185029
              </p>
            </div>

            {/* Contacts details column */}
            <div className="space-y-2 text-zinc-400 font-mono text-xs">
              <div className="flex md:justify-end items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00D9FF]" />
                <a href="mailto:rameddy676995@gmail.com" className="hover:text-white transition-colors">
                  rameddy676995@gmail.com
                </a>
              </div>
              <div className="flex md:justify-end items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                <a href="tel:+918179949749" className="hover:text-white transition-colors">
                  +91 81799 49749
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar containing Made with electricity and scroll back to top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
          
          <div className="flex items-center gap-6 text-zinc-650">
            {['HOME', 'PRODUCTS', 'SPORTS', 'ABOUT'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as PageTab);
                  window.scrollTo({ top: 0, behavior: 'instant' as any });
                }}
                className="hover:text-[#FF6B00] transition-colors cursor-pointer text-[10px] tracking-widest"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span className="text-zinc-400 font-medium uppercase flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded border border-white/5">
              <span>Made with <span className="text-[#00D9FF]">⚡</span> for India's athletes</span>
            </span>

            <button
              onClick={handleScrollTop}
              className="p-2 border border-white/5 hover:border-[#FF6B00] text-zinc-500 hover:text-white rounded bg-zinc-950 hover:shadow-[0_0_15px_rgba(255,107,0,0.15)] transition-all cursor-pointer"
              title="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}

