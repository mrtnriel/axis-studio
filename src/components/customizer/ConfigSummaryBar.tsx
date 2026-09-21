import React, { useState } from 'react';
import { 
  ShoppingBag, 
  RotateCcw, 
  Layers, 
  Share2, 
  ChevronUp, 
  ChevronDown, 
  Check 
} from 'lucide-react';
import { useCustomizer } from '../../context/CustomizerContext';
import type { CameraPreset } from '../../context/CustomizerContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/productsData';

export const ConfigSummaryBar: React.FC = () => {
  const { 
    config, 
    totalPrice, 
    priceBreakdown, 
    cameraPreset, 
    setCameraPreset, 
    isExploded, 
    setIsExploded,
    resetDefaults
  } = useCustomizer();

  const { addItem } = useCart();
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const targetProduct = PRODUCTS.find(p => p.layout === config.layout) || PRODUCTS[0];

  const handleAddToCart = () => {
    addItem(targetProduct, config);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleCopyConfig = () => {
    const specSummary = `AXIS Studio Custom ${config.layout} | Case: ${config.caseColor} | Plate: ${config.plate} | Switch: ${config.switchType} | Keycaps: ${config.keycaps} | Total: $${totalPrice}`;
    navigator.clipboard.writeText(specSummary);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const cameraButtons: { id: CameraPreset; label: string }[] = [
    { id: 'iso', label: 'Perspective' },
    { id: 'top', label: 'Top-Down' },
    { id: 'side', label: 'Profile' },
    { id: 'front', label: 'Bezel' }
  ];

  return (
    <div className="relative z-30 bg-[#090a0e]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 sm:px-6">
      
      {/* Price Breakdown Popover Drawer */}
      {showPriceBreakdown && (
        <div className="absolute bottom-full left-0 sm:left-6 mb-2 w-full sm:w-80 bg-[#121318] border border-white/10 rounded-lg p-4 shadow-2xl z-50 text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Acoustic Build Breakdown
            </span>
            <button 
              onClick={() => setShowPriceBreakdown(false)}
              className="text-zinc-400 hover:text-white"
            >
              &times;
            </button>
          </div>
          
          <div className="space-y-1.5 text-zinc-300">
            <div className="flex justify-between">
              <span>{config.layout} Billet Chassis Base</span>
              <span className="font-mono">${priceBreakdown.base}</span>
            </div>
            {priceBreakdown.caseDelta > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Case Finish Upgrade</span>
                <span className="font-mono">+${priceBreakdown.caseDelta}</span>
              </div>
            )}
            {priceBreakdown.plateDelta > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Plate Material Upgrade</span>
                <span className="font-mono">+${priceBreakdown.plateDelta}</span>
              </div>
            )}
            {priceBreakdown.switchDelta > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Lubed Switch Pack</span>
                <span className="font-mono">+${priceBreakdown.switchDelta}</span>
              </div>
            )}
            {priceBreakdown.keycapsDelta > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Keycap Colorway Set</span>
                <span className="font-mono">+${priceBreakdown.keycapsDelta}</span>
              </div>
            )}
            {priceBreakdown.weightDelta > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>PVD Weight Finish</span>
                <span className="font-mono">+${priceBreakdown.weightDelta}</span>
              </div>
            )}
            {priceBreakdown.cableDelta !== 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Interconnect Cable</span>
                <span className="font-mono">
                  {priceBreakdown.cableDelta > 0 ? `+$${priceBreakdown.cableDelta}` : `-$${Math.abs(priceBreakdown.cableDelta)}`}
                </span>
              </div>
            )}
            {priceBreakdown.pcbDelta > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>PCB Upgrade</span>
                <span className="font-mono">+${priceBreakdown.pcbDelta}</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between font-semibold text-white text-sm">
            <span>Total Atelier Price</span>
            <span className="font-mono text-amber-400">${totalPrice}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: 3D Camera Controls & Exploded View Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-md border border-white/5">
            {cameraButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setCameraPreset(btn.id);
                  if (isExploded) setIsExploded(false);
                }}
                className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
                  cameraPreset === btn.id && !isExploded
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Exploded View Toggle */}
          <button
            onClick={() => setIsExploded(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all border ${
              isExploded
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                : 'bg-zinc-900/80 text-zinc-300 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Collapse' : 'Explode View'}</span>
          </button>

          {/* Reset Camera */}
          <button
            onClick={resetDefaults}
            title="Reset Customizer to Defaults"
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Copy Spec Link */}
          <button
            onClick={handleCopyConfig}
            title="Copy configuration spec"
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Right: Configuration Specs Chip, Dynamic Price, and Add to Cart */}
        <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-end">
          
          <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-200 font-mono text-[11px]">
              {config.layout}
            </span>
            <span className="capitalize">{config.caseColor}</span>
            <span>&bull;</span>
            <span className="capitalize">{config.plate} Plate</span>
            <span>&bull;</span>
            <span className="capitalize">{config.switchType}</span>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-400">Total Price</div>
              <div className="text-xl font-bold font-mono text-white flex items-center gap-1">
                <span>${totalPrice}</span>
                <span className="text-xs font-normal text-zinc-400">USD</span>
              </div>
            </div>

            <button
              onClick={() => setShowPriceBreakdown(prev => !prev)}
              title="Toggle Price Breakdown"
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              {showPriceBreakdown ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-5 sm:px-6 py-2.5 rounded-md font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${
              addedAnimation
                ? 'bg-emerald-500 text-black shadow-emerald-500/20 scale-[0.98]'
                : 'bg-amber-400 hover:bg-amber-300 text-zinc-950 hover:shadow-amber-500/20'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Atelier Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
