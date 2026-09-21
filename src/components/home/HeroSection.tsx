import React from 'react';
import { Sliders, Volume2 } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface HeroSectionProps {
  onStartCustomizing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCustomizing
}) => {
  return (
    <section className="relative w-full pt-8 pb-14 md:pt-14 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Asymmetric 50/50 Split Layout per taste skill */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column: Max 4 text elements (Eyebrow, Headline, Subtext, CTAs) */}
          <div className="lg:col-span-5 space-y-5 text-left">
            
            {/* 1. Eyebrow */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-widest text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Engineered in Kyoto and Copenhagen
            </div>

            {/* 2. Headline: Under 2 lines at desktop */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              The Acoustic Instrument for your Desk.
            </h1>

            {/* 3. Subtext: Under 20 words per taste skill (15 words) */}
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-[42ch]">
              Precision CNC machined mechanical keyboards tailored to your acoustic signature and tactile preference.
            </p>

            {/* 4. Single Clear Primary Action */}
            <div className="pt-2">
              <button
                onClick={onStartCustomizing}
                className="px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-xl hover:shadow-amber-400/20 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>Build Your Keyboard</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Showcase Photography */}
          <div className="lg:col-span-7 relative">
            <div 
              onClick={onStartCustomizing}
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 group cursor-pointer"
              title="Click to customize Apex75 in 3D"
            >
              <img
                src="/images/hero_keyboard.jpg"
                alt="Apex75 Pro Custom Mechanical Keyboard"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />

              {/* Interactive Acoustic Pill - Auditions sound on direct click */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playKeyStroke('linear', 'fr4');
                }}
                className="absolute bottom-4 left-4 right-4 sm:right-auto p-3 rounded-xl bg-black/80 hover:bg-black/95 backdrop-blur-md border border-white/15 hover:border-amber-400/40 shadow-xl flex items-center gap-3.5 transition-all active:scale-[0.98] cursor-pointer group/pill"
                title="Click to audition keystroke acoustic profile"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover/pill:bg-amber-400 group-hover/pill:text-black transition-colors">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span>Apex75 Acoustic Profile</span>
                    <span className="text-[10px] text-amber-400 font-mono font-normal">Click to Play</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    Deep Creamy Thock &bull; Morandi Linear 45g
                  </div>
                </div>
              </div>

              {/* Top Right Spec Pill */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-300">
                Aerospace 6063 Aluminum
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
