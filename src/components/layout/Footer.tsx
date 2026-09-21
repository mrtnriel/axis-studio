import React from 'react';

interface FooterProps {
  setCurrentView: (view: 'home' | 'catalog' | 'customizer') => void;
  onOpenSoundTest: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, onOpenSoundTest }) => {
  return (
    <footer className="w-full bg-[#0a0a0d] border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand identity column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center p-1">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-full h-0.5 bg-amber-400 rounded-full" />
                <div className="h-full w-0.5 bg-amber-400 rounded-full absolute" />
              </div>
            </div>
            <span className="font-bold tracking-widest text-sm uppercase text-white font-mono">
              AXIS STUDIO
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Crafting acoustic mechanical keyboard instruments. Milled from 6063 aerospace aluminum and solid brass.
          </p>
          <div className="text-[11px] text-zinc-500 font-mono">
            Kyoto Design Studio &bull; Copenhagen Acoustics
          </div>
        </div>

        {/* Customization & Products */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Instruments
          </h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li>
              <button 
                onClick={() => setCurrentView('catalog')}
                className="hover:text-amber-400 transition-colors"
              >
                Apex75 Pro Flagship
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentView('catalog')}
                className="hover:text-amber-400 transition-colors"
              >
                Cipher65 Stealth
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentView('catalog')}
                className="hover:text-amber-400 transition-colors"
              >
                Ghost65 Polycarbonate
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentView('catalog')}
                className="hover:text-amber-400 transition-colors"
              >
                Genesis80 TKL Classic
              </button>
            </li>
          </ul>
        </div>

        {/* 3D Atelier & Acoustics */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Atelier Tools
          </h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li>
              <button 
                onClick={() => setCurrentView('customizer')}
                className="hover:text-amber-400 transition-colors"
              >
                Interactive 3D Configurator
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenSoundTest}
                className="hover:text-amber-400 transition-colors"
              >
                Acoustic Frequency Tester
              </button>
            </li>
            <li>
              <span className="text-zinc-500 cursor-default">
                VIA / QMK Profile Downloader
              </span>
            </li>
            <li>
              <span className="text-zinc-500 cursor-default">
                Assembly & Lube Guides
              </span>
            </li>
          </ul>
        </div>

        {/* Customer Care & Assurance */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Assurance
          </h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>3-Year Billet Chassis Warranty</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Free Global Express Over $200</span>
            </li>
            <li>
              <span className="text-zinc-400">Zero-Dead-Pixel PCB Guarantee</span>
            </li>
            <li>
              <span className="text-zinc-500">&copy; {new Date().getFullYear()} Axis Studio Inc. All rights reserved.</span>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
};
