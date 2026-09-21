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
    <section className="relative w-full pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 blueprint-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Technical Header Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-200 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-none bg-zinc-900" />
            <span>FIG. 01 // BESPOKE KEYBOARD INSTRUMENT</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>TOL: ±0.02 mm</span>
            <span>&bull;</span>
            <span>CHASSIS: CNC 6063-T6 BILLET</span>
            <span>&bull;</span>
            <span>KYOTO &bull; COPENHAGEN</span>
          </div>
          <div>
            <span>SCALE 1:1</span>
          </div>
        </div>

        {/* Asymmetric 50/50 Split Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text & Specification Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* 1. Eyebrow Annotation */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-zinc-300 bg-white text-[10.5px] font-mono uppercase tracking-widest text-zinc-700">
              <span className="w-1.5 h-1.5 bg-zinc-900" />
              <span>SPECIFICATION 2026 // ATELIER HARDWARE</span>
            </div>

            {/* 2. Headline: Under 2 lines at desktop */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.08]">
              The Acoustic Instrument for your Desk.
            </h1>

            {/* 3. Subtext: Under 20 words per taste skill */}
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-[42ch]">
              Precision CNC machined mechanical keyboards tailored to your acoustic signature and tactile preference.
            </p>

            {/* Architectural Dimensional Specs Callout */}
            <div className="p-3.5 rounded border border-zinc-200 bg-white font-mono text-[11px] text-zinc-600 space-y-1">
              <div className="flex justify-between border-b border-zinc-100 pb-1">
                <span className="text-zinc-400">ENVELOPE</span>
                <span className="text-zinc-900 font-semibold">324.0 × 135.0 × 18.2 mm</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1">
                <span className="text-zinc-400">BALLAST</span>
                <span className="text-zinc-900 font-semibold">Solid Pure Brass &bull; 2.15 kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">ISOLATION</span>
                <span className="text-zinc-900 font-semibold">Poron Leaf-Spring Gaskets</span>
              </div>
            </div>

            {/* 4. Single Clear Primary Action */}
            <div className="pt-2">
              <button
                onClick={onStartCustomizing}
                className="px-7 py-3.5 rounded bg-zinc-900 hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>BUILD YOUR KEYBOARD</span>
                <span className="text-zinc-400">&rarr;</span>
              </button>
            </div>

          </div>

          {/* Right Column: Architectural Technical Showcase */}
          <div className="lg:col-span-7 relative">
            
            {/* Top Dimension Annotation Ruler */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pb-1 px-1">
              <span>|← 324.0 mm</span>
              <span className="border-b border-dashed border-zinc-300 flex-1 mx-3" />
              <span>CHASSIS WIDTH →|</span>
            </div>

            {/* Framing Container with Technical Hairlines & Corner Registration Marks */}
            <div 
              onClick={onStartCustomizing}
              className="relative rounded border border-zinc-300 bg-white p-2 shadow-sm group cursor-pointer"
              title="Click to customize Apex75 in 3D"
            >
              {/* Corner crosshairs (+) */}
              <div className="absolute -top-1.5 -left-1.5 text-xs font-mono text-zinc-400 select-none">+</div>
              <div className="absolute -top-1.5 -right-1.5 text-xs font-mono text-zinc-400 select-none">+</div>
              <div className="absolute -bottom-1.5 -left-1.5 text-xs font-mono text-zinc-400 select-none">+</div>
              <div className="absolute -bottom-1.5 -right-1.5 text-xs font-mono text-zinc-400 select-none">+</div>

              {/* Photo Viewport */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 rounded border border-zinc-200">
                <img
                  src="/images/hero_keyboard.jpg"
                  alt="Apex75 Pro Custom Mechanical Keyboard Blueprint"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />

                {/* Top Right Blueprint Reference Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-white/90 backdrop-blur-md border border-zinc-200 text-[10px] font-mono text-zinc-800">
                  REF: AL-6063-T6
                </div>

                {/* Interactive Acoustic Measurement Badge */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playKeyStroke('linear', 'fr4');
                  }}
                  className="absolute bottom-3 left-3 right-3 sm:right-auto p-2.5 rounded bg-white/95 backdrop-blur-md border border-zinc-300 hover:border-zinc-900 shadow-md flex items-center gap-3 transition-all active:scale-[0.98] cursor-pointer group/pill"
                  title="Click to audition keystroke acoustic profile"
                >
                  <div className="w-7 h-7 rounded border border-zinc-200 bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0 group-hover/pill:bg-zinc-900 group-hover/pill:text-white transition-colors">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-zinc-900 flex items-center gap-2">
                      <span>Apex75 Acoustic Profile</span>
                      <span className="text-[10px] text-zinc-500 font-normal">Click to Audition</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      420 Hz Creamy Thock &bull; Morandi Linear 45g
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Coordinate Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1.5 px-1">
              <span>DATUM A &bull; GROUND ELEVATION 18.2mm</span>
              <span>ORTHOGRAPHIC ELEVATION &bull; ANGLE: 7.5&deg;</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
