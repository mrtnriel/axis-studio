import React from 'react';
import { Layers, Sliders, Volume2, ArrowRight } from 'lucide-react';

interface CustomizerTeaserSectionProps {
  onStartCustomizing: () => void;
}

export const CustomizerTeaserSection: React.FC<CustomizerTeaserSectionProps> = ({
  onStartCustomizing
}) => {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-200 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto">
        {/* Technical Drawing Canvas Frame */}
        <div className="relative border border-zinc-200 bg-white p-6 sm:p-10 lg:p-14 shadow-none">
          {/* Blueprint Corner Registration Crosshairs */}
          <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-400 select-none">+</div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-zinc-400 select-none">+</div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-400 select-none">+</div>
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-400 select-none">+</div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Blueprint Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[10.5px] font-mono text-zinc-700 uppercase tracking-widest">
                  DWG 03 // CAD WORKSTATION
                </span>
                <span className="h-3 w-[1px] bg-zinc-300" />
                <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-wider">
                  REALTIME WEBGL ENGINE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight leading-[1.15]">
                Configure structural layers in <span className="font-normal">interactive 3D space</span>.
              </h2>

              <p className="text-sm text-zinc-600 leading-relaxed max-w-xl font-normal">
                Inspect CNC-milled aluminum chassis tolerances, keycap profiles, acoustic dampening sheets, and plate materials. Rotate 360 degrees or isolate internal layers before ordering.
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 border border-zinc-200 bg-[#fafaf9] space-y-2">
                  <div className="flex items-center justify-between">
                    <Layers className="w-4 h-4 text-zinc-700" />
                    <span className="text-[9px] font-mono text-zinc-700">ISO-01</span>
                  </div>
                  <div className="text-xs font-medium text-zinc-900">Exploded View</div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Inspect gasket stack, poron foam, and hot-swap PCB routing.
                  </p>
                </div>

                <div className="p-4 border border-zinc-200 bg-[#fafaf9] space-y-2">
                  <div className="flex items-center justify-between">
                    <Volume2 className="w-4 h-4 text-zinc-700" />
                    <span className="text-[9px] font-mono text-zinc-700">ISO-02</span>
                  </div>
                  <div className="text-xs font-medium text-zinc-900">Acoustic Audio</div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Live laboratory audio playback calibrated to brass and FR4 resonance.
                  </p>
                </div>

                <div className="p-4 border border-zinc-200 bg-[#fafaf9] space-y-2">
                  <div className="flex items-center justify-between">
                    <Sliders className="w-4 h-4 text-zinc-700" />
                    <span className="text-[9px] font-mono text-zinc-700">ISO-03</span>
                  </div>
                  <div className="text-xs font-medium text-zinc-900">BOM Generation</div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Dynamic bill of materials calculation with weight and component metrics.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onStartCustomizing}
                  className="px-7 py-3.5 bg-zinc-900 hover:bg-black text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2.5 transition-colors cursor-pointer active:scale-[0.98]"
                >
                  <span>Launch 3D Configurator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-zinc-700 hidden sm:inline">
                  TOLERANCE ±0.05 MM // 6063-T6
                </span>
              </div>
            </div>

            {/* Right Architectural Spec Sheet Image */}
            <div className="lg:col-span-5 relative">
              <div className="border border-zinc-200 bg-[#fafaf9] p-2">
                <div className="relative aspect-[4/3] bg-white border border-zinc-200 overflow-hidden group">
                  <img
                    src="/images/ghost_polycarb_kb.jpg"
                    alt="Ghost65 Optical Polycarbonate Keyboard CAD View"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-102 transition-transform duration-500 ease-out"
                  />
                  {/* Dimension overlay hairlines */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 border border-zinc-200 text-[10px] font-mono text-zinc-700">
                    FIG. 03.1 // GHOST65
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/90 border border-zinc-200 text-[10px] font-mono text-zinc-700">
                    BASE COMM: $209
                  </div>
                  {/* Fine Crosshair in center */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                    <div className="w-8 h-[1px] bg-zinc-600" />
                    <div className="h-8 w-[1px] bg-zinc-600 absolute" />
                  </div>
                </div>
                <div className="mt-2 px-1 flex justify-between items-center text-[10px] font-mono text-zinc-700">
                  <span>SCALE 1:1 DRAFT</span>
                  <span>SURFACE: FROSTED POLYCARBONATE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
