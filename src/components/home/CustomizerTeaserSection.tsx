import React from 'react';
import { Sliders, Layers, Volume2, Sparkles, ArrowRight } from 'lucide-react';

interface CustomizerTeaserSectionProps {
  onStartCustomizing: () => void;
}

export const CustomizerTeaserSection: React.FC<CustomizerTeaserSectionProps> = ({
  onStartCustomizing
}) => {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090a0e]">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#12141c] via-[#0d0e14] to-[#070709] p-8 sm:p-12 lg:p-16 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono uppercase tracking-wider text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                Live 3D Customizer Engine
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                Configure your Keyboard in Interactive 3D Space.
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                Swap aluminum case finishes, keycap colorways, switch acoustics, and plates. Inspect your build with a 360-degree exploded layer view before placing your commission.
              </p>

              {/* 3 Core Interactive Capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <div className="text-xs font-semibold text-white">Exploded View</div>
                  <div className="text-[11px] text-zinc-500">Isolate PCB, plate, and silicone layers</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <div className="text-xs font-semibold text-white">Acoustic Audio</div>
                  <div className="text-[11px] text-zinc-500">Live sound audition with plate resonance</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <div className="text-xs font-semibold text-white">Bespoke Options</div>
                  <div className="text-[11px] text-zinc-500">6 cases, 5 plates, coiled aviator cables</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onStartCustomizing}
                  className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl hover:shadow-amber-400/25 transition-all cursor-pointer"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Launch 3D Configurator</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

            </div>

            {/* Right Showcase Image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 aspect-[4/3] group">
                <img
                  src="/images/ghost_polycarb_kb.jpg"
                  alt="Ghost65 Optical Polycarbonate Keyboard in 3D"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-300">
                  <span>Ghost65 Polycarbonate</span>
                  <span className="text-amber-400 font-semibold">$209 Base</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
