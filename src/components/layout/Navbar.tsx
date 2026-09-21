import React from 'react';
import { Volume2, VolumeX, ShoppingBag, Layers, Activity } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full h-16 md:h-18 bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Architectural Technical Wordmark */}
        <button 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-3.5 group text-left focus:outline-none cursor-pointer"
        >
          {/* Technical blueprint crosshair badge */}
          <div className="w-8 h-8 rounded border border-zinc-900 bg-zinc-900 text-white flex items-center justify-center p-1.5 shadow-sm group-hover:bg-zinc-800 transition-colors">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-full h-[1.5px] bg-white rounded-none" />
              <div className="h-full w-[1.5px] bg-white rounded-none absolute" />
              <div className="w-2 h-2 rounded-full border border-white absolute" />
            </div>
          </div>
          <div>
            <div className="font-bold tracking-wider text-sm uppercase text-zinc-900 font-mono flex items-center gap-2">
              <span>AXIS</span>
              <span className="text-zinc-400 font-normal text-xs">// SPEC.01</span>
            </div>
            <span className="text-[10px] text-zinc-600 block font-mono tracking-wider -mt-0.5">
              ARCHITECTURAL HARDWARE
            </span>
          </div>
        </button>

        {/* Central Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setCurrentView('catalog')}
            className={`px-3.5 py-1.5 rounded border transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentView === 'catalog'
                ? 'text-zinc-900 bg-zinc-100 border-zinc-300 font-semibold'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 border-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            <span>01 // KEYBOARDS</span>
          </button>

          <button
            onClick={onOpenSoundTest}
            className="px-3.5 py-1.5 rounded border border-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-zinc-500" />
            <span>02 // ACOUSTIC LAB</span>
          </button>
        </nav>

        {/* Right Actions & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Mute/Unmute Technical Toggle */}
          <button
            onClick={toggleMuted}
            aria-label={isMuted ? 'Unmute typing audio' : 'Mute typing audio'}
            title={isMuted ? 'Acoustic audio muted' : 'Acoustic audio live'}
            className="p-2 rounded border border-zinc-200 hover:border-zinc-400 text-zinc-600 hover:text-zinc-900 bg-white hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-zinc-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-zinc-800" />
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View Shopping Cart"
            className="relative p-2 rounded border border-zinc-200 hover:border-zinc-400 text-zinc-800 hover:text-black bg-white hover:bg-zinc-50 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded bg-zinc-900 text-white text-[10px] font-mono font-bold min-w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => setCurrentView('customizer')}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-semibold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer ${
              currentView === 'customizer'
                ? 'bg-zinc-900 text-white ring-2 ring-zinc-900 ring-offset-2'
                : 'bg-zinc-900 hover:bg-black text-white shadow-sm hover:shadow'
            }`}
          >
            <span>BUILD IN 3D</span>
            <span className="text-zinc-400 font-normal">&rarr;</span>
          </button>
        </div>
      </div>
    </header>
  );
};
