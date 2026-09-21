import React from 'react';
import { Volume2, VolumeX, ShoppingBag, Layers } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCustomizer } from '../../context/CustomizerContext';

interface NavbarProps {
  currentView: 'home' | 'catalog' | 'customizer';
  setCurrentView: (view: 'home' | 'catalog' | 'customizer') => void;
  onOpenSoundTest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, onOpenSoundTest }) => {
  const { itemCount, setIsCartOpen } = useCart();
  const { isMuted, toggleMuted } = useCustomizer();

  return (
    <header className="sticky top-0 z-40 w-full h-16 md:h-20 bg-[#070709]/85 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Wordmark */}
        <button 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-amber-500/20 to-amber-700/30 border border-amber-500/40 flex items-center justify-center p-1.5 shadow-sm group-hover:border-amber-400/80 transition-colors">
            {/* Geometric mechanical switch stem emblem */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-full h-1 bg-amber-400 rounded-full" />
              <div className="h-full w-1 bg-amber-400 rounded-full absolute" />
            </div>
          </div>
          <div>
            <span className="font-bold tracking-widest text-base uppercase text-white font-mono flex items-center gap-1.5">
              AXIS <span className="text-amber-400 font-normal text-xs tracking-normal">STUDIO</span>
            </span>
            <span className="text-[10px] text-zinc-500 block uppercase tracking-wider -mt-0.5">Bespoke Acoustics</span>
          </div>
        </button>

        {/* Central Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          <button
            onClick={() => setCurrentView('catalog')}
            className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              currentView === 'catalog'
                ? 'text-white bg-white/10 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4 opacity-70" />
            <span>Keyboards</span>
          </button>

          <button
            onClick={onOpenSoundTest}
            className="px-3.5 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Acoustic Lab</span>
          </button>
        </nav>

        {/* Right Action Icons & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Mute/Unmute Quick Toggle */}
          <button
            onClick={toggleMuted}
            aria-label={isMuted ? 'Unmute typing audio' : 'Mute typing audio'}
            title={isMuted ? 'Switch sound muted' : 'Switch sound active'}
            className="p-2 sm:p-2.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View Shopping Cart"
            className="relative p-2 sm:p-2.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[11px] font-bold min-w-5 h-5 flex items-center justify-center shadow-lg">
                {itemCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => setCurrentView('customizer')}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider shadow-sm transition-all active:scale-[0.98] ${
              currentView === 'customizer'
                ? 'bg-amber-400 text-zinc-950 font-bold shadow-amber-400/20'
                : 'bg-zinc-100 hover:bg-white text-zinc-950 hover:shadow-amber-500/10'
            }`}
          >
            Build in 3D
          </button>
        </div>
      </div>
    </header>
  );
};
