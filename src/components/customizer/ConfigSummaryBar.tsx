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
    { id: 'iso', label: 'Iso' },
    { id: 'top', label: 'Plan' },
    { id: 'side', label: 'Elev' },
    { id: 'front', label: 'Sect' }
  ];

  return (
    <div className="relative z-30 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-4 py-3 sm:px-6">
      
      {/* Price Breakdown Popover Drawer */}
      {showPriceBreakdown && (
        <div className="absolute bottom-full left-0 sm:left-6 mb-2 w-full sm:w-80 bg-white border border-zinc-300 p-4 shadow-xl z-50 text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
            <span className="font-mono text-zinc-900 uppercase tracking-widest text-[10.5px]">
              BILL OF MATERIALS (BOM)
            </span>
            <button 
              onClick={() => setShowPriceBreakdown(false)}
              className="text-zinc-500 hover:text-black cursor-pointer text-sm"
            >
              &times;
            </button>
          </div>
          
          <div className="space-y-1.5 text-zinc-600 font-mono text-[11px]">
            <div className="flex justify-between">
              <span>{config.layout} Billet Chassis Base</span>
              <span className="text-zinc-900">${priceBreakdown.base}</span>
            </div>
            {priceBreakdown.caseDelta > 0 && (
              <div className="flex justify-between text-zinc-500">
                <span>Chassis Finish Upgrade</span>
                <span className="text-zinc-800">+${priceBreakdown.caseDelta}</span>
              </div>
            )}
            {priceBreakdown.plateDelta > 0 && (
              <div className="flex justify-between text-zinc-500">
                <span>Plate Material Upgrade</span>
                <span className="text-zinc-800">+${priceBreakdown.plateDelta}</span>
              </div>
            )}
            {priceBreakdown.switchDelta > 0 && (
              <div className="flex justify-between text-zinc-500">
                <span>Lubed Switch Pack</span>
                <span className="text-zinc-800">+${priceBreakdown.switchDelta}</span>
              </div>
            )}
            {priceBreakdown.keycapsDelta > 0 && (
              <div className="flex justify-between text-zinc-500">
                <span>Keycap Colorway Set</span>
                <span className="text-zinc-800">+${priceBreakdown.keycapsDelta}</span>
              </div>
            )}
            {priceBreakdown.weightDelta > 0 && (
              <div className="flex justify-between text-zinc-500">
                <span>Weight Bar Ingot</span>
                <span className="text-zinc-800">+${priceBreakdown.weightDelta}</span>
              </div>
            )}
            {priceBreakdown.cableDelta !== 0 && (
              <div className="flex justify-between text-zinc-500">
                <span>Interconnect Cable</span>
                <span className="text-zinc-800">
                  {priceBreakdown.cableDelta > 0 ? `+$${priceBreakdown.cableDelta}` : `-$${Math.abs(priceBreakdown.cableDelta)}`}
                </span>
              </div>
            )}
            {priceBreakdown.pcbDelta > 0 && (
              <div className="flex justify-between text-zinc-500">
                <span>PCB Upgrade</span>
                <span className="text-zinc-800">+${priceBreakdown.pcbDelta}</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-zinc-200 flex justify-between font-mono font-medium text-zinc-900 text-xs">
            <span>TOTAL SPECIFICATION</span>
            <span>${totalPrice} USD</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: 3D Camera Controls & Exploded View Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center border border-zinc-200 bg-[#fafaf9] p-0.5">
            {cameraButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setCameraPreset(btn.id);
                  if (isExploded) setIsExploded(false);
                }}
                className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  cameraPreset === btn.id && !isExploded
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Exploded View Toggle */}
          <button
            onClick={() => setIsExploded(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer active:scale-[0.98] ${
              isExploded
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-white text-zinc-800 hover:text-black border-zinc-300 hover:border-zinc-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Collapse' : 'Exploded'}</span>
          </button>

          {/* Reset Defaults */}
          <button
            onClick={resetDefaults}
            title="Reset Customizer to Defaults"
            className="p-1.5 text-zinc-500 hover:text-black border border-transparent hover:border-zinc-300 transition-colors cursor-pointer active:scale-[0.98]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Copy Spec Link */}
          <button
            onClick={handleCopyConfig}
            title="Copy configuration spec"
            className="p-1.5 text-zinc-500 hover:text-black border border-transparent hover:border-zinc-300 transition-colors cursor-pointer active:scale-[0.98]"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Right: Configuration Specs Chip, Dynamic Price, and Add to Cart */}
        <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-end">
          
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="px-1.5 py-0.5 border border-zinc-200 bg-[#fafaf9] text-zinc-800">
              {config.layout}
            </span>
            <span className="uppercase">{config.caseColor}</span>
            <span>/</span>
            <span className="uppercase">{config.plate}</span>
            <span>/</span>
            <span className="uppercase">{config.switchType}</span>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <div className="text-[9.5px] uppercase font-mono tracking-wider text-zinc-700">Total Price</div>
              <div className="text-xl font-mono text-zinc-900 flex items-center gap-1 font-normal">
                <span>${totalPrice}</span>
                <span className="text-xs text-zinc-600">USD</span>
              </div>
            </div>

            <button
              onClick={() => setShowPriceBreakdown(prev => !prev)}
              title="Toggle Price Breakdown"
              className="p-1 text-zinc-500 hover:text-black transition-colors cursor-pointer"
            >
              {showPriceBreakdown ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-6 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer active:scale-[0.98] ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-900 hover:bg-black text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Config Queued</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
