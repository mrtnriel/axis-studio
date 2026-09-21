import React from 'react';

interface FooterProps {
  setCurrentView: (view: 'home' | 'catalog' | 'customizer') => void;
  onOpenSoundTest: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, onOpenSoundTest }) => {
  return (
    <footer className="w-full bg-[#fafaf9] border-t border-zinc-200 py-16 px-4 sm:px-6 lg:px-8 mt-auto select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Identity Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border border-zinc-900 bg-white flex items-center justify-center p-0.5">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full h-[1px] bg-zinc-900" />
                  <div className="h-full w-[1px] bg-zinc-900 absolute" />
                </div>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-900 font-semibold">
                AXIS STUDIO
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Acoustic mechanical keyboard instruments. CNC-milled from 6063 aerospace aluminum, solid brass ballast ingots, and isolated gasket systems.
            </p>
            <div className="text-[10px] text-zinc-500 font-mono">
              KYOTO DRAFTING LAB / COPENHAGEN ACOUSTICS
            </div>
          </div>

          {/* Customization & Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-900 font-medium">
              Production Models
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-600">
              <li>
                <button 
                  onClick={() => setCurrentView('catalog')}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  APEX75 PRO // FLAGSHIP
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('catalog')}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  CIPHER65 // STEALTH BEZEL
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('catalog')}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  GHOST65 // OPTICAL POLYCARB
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('catalog')}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  GENESIS80 // TKL CLASSIC
                </button>
              </li>
            </ul>
          </div>

          {/* 3D Atelier & Acoustics */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-900 font-medium">
              CAD & Acoustic Tools
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-600">
              <li>
                <button 
                  onClick={() => setCurrentView('customizer')}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  INTERACTIVE 3D CAD CONFIGURATOR
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSoundTest}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  ACOUSTIC BENCHMARK TEST
                </button>
              </li>
              <li>
                <span className="text-zinc-400 cursor-default">
                  VIA / QMK PROFILE REPOSITORY
                </span>
              </li>
              <li>
                <span className="text-zinc-400 cursor-default">
                  LUBRICATION & ASSEMBLY SPECIFICATIONS
                </span>
              </li>
            </ul>
          </div>

          {/* Quality Standards & Warranty */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-900 font-medium">
              Assurance & Quality
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-600">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-zinc-900 inline-block" />
                <span>3-YEAR CNC BILLET WARRANTY</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-zinc-900 inline-block" />
                <span>FREE INSURED FREIGHT OVER $200</span>
              </li>
              <li>
                <span className="text-zinc-500">TOLERANCE COMPLIANCE ±0.05 MM</span>
              </li>
              <li>
                <span className="text-zinc-500">ZERO DEFECT PCB GUARANTEE</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Architectural Title Block Colophon */}
        <div className="border border-zinc-300 bg-white p-4 font-mono text-[10px] text-zinc-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="border-b sm:border-b-0 sm:border-r border-zinc-200 pb-2 sm:pb-0 sm:pr-3">
            <div className="text-zinc-700 uppercase">PROJECT SPECIFICATION</div>
            <div className="text-zinc-900 font-semibold mt-0.5">AXIS BESPOKE KEYBOARDS</div>
          </div>
          <div className="border-b sm:border-b-0 sm:border-r border-zinc-200 pb-2 sm:pb-0 sm:pr-3">
            <div className="text-zinc-700 uppercase">STANDARDS & TOLERANCE</div>
            <div className="text-zinc-900 font-semibold mt-0.5">ISO 2768-M // 6063-T6 CNC</div>
          </div>
          <div className="border-b md:border-b-0 md:border-r border-zinc-200 pb-2 md:pb-0 md:pr-3">
            <div className="text-zinc-700 uppercase">DRAWING SHEET / REV</div>
            <div className="text-zinc-900 font-semibold mt-0.5">SHEET 05 // REV 2.4.0</div>
          </div>
          <div>
            <div className="text-zinc-700 uppercase">COPYRIGHT & RESERVATIONS</div>
            <div className="text-zinc-900 font-semibold mt-0.5">&copy; {new Date().getFullYear()} AXIS STUDIO INC.</div>
          </div>
        </div>

      </div>
    </footer>
  );
};
