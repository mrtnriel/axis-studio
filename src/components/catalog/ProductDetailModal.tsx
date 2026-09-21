import React, { useState } from 'react';
import { X, Sliders, ShoppingBag, Check, Volume2, ShieldCheck, Truck } from 'lucide-react';
import type { ProductItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { soundEngine } from '../audio/soundEngine';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onCustomize: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onCustomize
}) => {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>('');

  if (!product) return null;

  const currentImg = selectedImage || product.image;

  const handleQuickAdd = () => {
    // Quick add default customization
    if (product.defaultCustomization) {
      addItem(product, {
        id: product.id,
        name: `${product.name} Standard`,
        layout: product.layout,
        caseColor: product.defaultCustomization.caseColor || 'black',
        plate: product.defaultCustomization.plate || 'fr4',
        switchType: product.defaultCustomization.switchType || 'linear',
        keycaps: product.defaultCustomization.keycaps || 'kuro',
        weightBar: product.defaultCustomization.weightBar || 'brass',
        cable: product.defaultCustomization.cable || 'standard',
        lighting: product.defaultCustomization.lighting || 'amber',
        pcb: product.defaultCustomization.pcb || 'hotswap-rgb',
        basePrice: product.price
      });
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl bg-white border border-zinc-300 overflow-hidden shadow-2xl my-8 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Left Column: Drawing & Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#fafaf9] border-b md:border-b-0 md:border-r border-zinc-200">
          <div className="relative aspect-[4/3] bg-white border border-zinc-200 overflow-hidden">
            <img
              src={currentImg}
              alt={product.name}
              className="w-full h-full object-cover object-center grayscale contrast-115"
            />
            <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/95 border border-zinc-200 text-zinc-900 font-mono text-[10.5px]">
              {product.layout} // DWG-SPEC
            </span>
            {/* Center crosshair */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
              <div className="w-8 h-[1px] bg-zinc-600" />
              <div className="h-8 w-[1px] bg-zinc-600 absolute" />
            </div>
          </div>

          {/* Thumbnails */}
          {product.secondaryImage && (
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setSelectedImage(product.image)}
                className={`w-16 h-12 border transition-all cursor-pointer ${
                  currentImg === product.image ? 'border-zinc-900' : 'border-zinc-200 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setSelectedImage(product.secondaryImage!)}
                className={`w-16 h-12 border transition-all cursor-pointer ${
                  currentImg === product.secondaryImage ? 'border-zinc-900' : 'border-zinc-200 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.secondaryImage} alt="" className="w-full h-full object-cover" />
              </button>
            </div>
          )}

          {/* Assurance strip */}
          <div className="pt-4 mt-4 border-t border-zinc-200 grid grid-cols-2 gap-2 text-[10.5px] text-zinc-700 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
              <span>3-YEAR CNC WARRANTY</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-zinc-700" />
              <span>INSURED COURIER FREIGHT</span>
            </div>
          </div>
        </div>

        {/* Right Column: Specifications & Configuration CTAs */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                  DWG-SPEC // {product.layout} INSTRUMENT
                </span>
                <h2 className="text-2xl font-light text-zinc-900 tracking-tight mt-0.5">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-zinc-700">
                  <span>{product.rating} / 5.0 SCORE</span>
                  <span>/</span>
                  <span>{product.reviewCount} VERIFIED REPORTS</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1 text-zinc-500 hover:text-black border border-transparent hover:border-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              {product.description}
            </p>

            {/* Switch Keystroke Sound Demo - Direct click */}
            <div 
              onClick={() => soundEngine.playKeyStroke('linear', 'fr4')}
              className="p-3 border border-zinc-200 bg-[#fafaf9] hover:bg-white hover:border-zinc-400 flex items-center justify-between cursor-pointer transition-colors active:scale-[0.99] group"
              title="Click to audition keystroke acoustic profile"
            >
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-zinc-700" />
                <span className="text-xs text-zinc-800 font-mono">ACOUSTIC AUDITION (48 KHZ)</span>
              </div>
              <span className="text-xs font-mono text-zinc-900 group-hover:underline">
                CLICK TO AUDITION &rarr;
              </span>
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-700">
                TECHNICAL DRAWING SPECIFICATIONS
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 border border-zinc-200 bg-[#fafaf9]">
                  <div className="text-[9.5px] text-zinc-700">TYPING ANGLE</div>
                  <div className="text-zinc-900 mt-0.5 font-medium">{product.specs.typingAngle}</div>
                </div>
                <div className="p-2.5 border border-zinc-200 bg-[#fafaf9]">
                  <div className="text-[9.5px] text-zinc-700">FRONT HEIGHT</div>
                  <div className="text-zinc-900 mt-0.5 font-medium">{product.specs.frontHeight}</div>
                </div>
                <div className="p-2.5 border border-zinc-200 bg-[#fafaf9]">
                  <div className="text-[9.5px] text-zinc-700">ASSEMBLED WEIGHT</div>
                  <div className="text-zinc-900 mt-0.5 font-medium">{product.specs.weight}</div>
                </div>
                <div className="p-2.5 border border-zinc-200 bg-[#fafaf9]">
                  <div className="text-[9.5px] text-zinc-700">MOUNTING SYSTEM</div>
                  <div className="text-zinc-900 mt-0.5 font-medium">{product.specs.mounting}</div>
                </div>
                <div className="p-2.5 border border-zinc-200 bg-[#fafaf9] col-span-2">
                  <div className="text-[9.5px] text-zinc-700">CONNECTIVITY</div>
                  <div className="text-zinc-900 mt-0.5 font-medium">{product.specs.connectivity}</div>
                </div>
              </div>
            </div>

            {/* Engineering Highlights */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-700">
                MANUFACTURING HIGHLIGHTS
              </h4>
              <ul className="space-y-1 text-xs text-zinc-600">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-zinc-800 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onCustomize(product);
                onClose();
              }}
              className="w-full sm:flex-1 py-3 bg-zinc-900 hover:bg-black text-white text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Customize in 3D CAD</span>
            </button>

            <button
              onClick={handleQuickAdd}
              className="w-full sm:w-auto px-5 py-3 border border-zinc-300 hover:border-zinc-900 bg-white text-zinc-900 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Quick Add &bull; ${product.price}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
