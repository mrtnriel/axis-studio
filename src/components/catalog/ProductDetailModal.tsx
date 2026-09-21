import React, { useState } from 'react';
import { X, Sliders, ShoppingBag, Star, Check, Volume2, ShieldCheck, Truck } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl bg-[#0f1015] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-black/50 border-b md:border-b-0 md:border-r border-white/5">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-white/5">
            <img
              src={currentImg}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-semibold">
              {product.layout} Layout
            </span>
          </div>

          {/* Thumbnails */}
          {product.secondaryImage && (
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setSelectedImage(product.image)}
                className={`w-16 h-12 rounded-lg overflow-hidden border transition-all ${
                  currentImg === product.image ? 'border-amber-400' : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setSelectedImage(product.secondaryImage!)}
                className={`w-16 h-12 rounded-lg overflow-hidden border transition-all ${
                  currentImg === product.secondaryImage ? 'border-amber-400' : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={product.secondaryImage} alt="" className="w-full h-full object-cover" />
              </button>
            </div>
          )}

          {/* Assurance strip */}
          <div className="pt-4 mt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>3-Year Warranty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Insured Courier Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Column: Specifications & Configuration CTAs */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                  Bespoke Mechanical Keyboard
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="ml-1 font-mono font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-zinc-500 text-xs">&bull;</span>
                  <span className="text-zinc-400 text-xs">{product.reviewCount} verified audiophile reviews</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Switch Keystroke Sound Demo - Direct click */}
            <div 
              onClick={() => soundEngine.playKeyStroke('linear', 'fr4')}
              className="p-3 rounded-lg bg-zinc-900/80 hover:bg-zinc-900 border border-white/5 hover:border-amber-400/30 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98] group"
              title="Click to audition keystroke acoustic profile"
            >
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-zinc-300 font-medium">Acoustic Sound Profile</span>
              </div>
              <span className="text-xs font-mono text-amber-400 group-hover:text-amber-300">
                Click to Audition &rarr;
              </span>
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                Technical Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded bg-black/40 border border-white/5">
                  <div className="text-[10px] text-zinc-500 font-mono">TYPING ANGLE</div>
                  <div className="font-medium text-zinc-200 mt-0.5">{product.specs.typingAngle}</div>
                </div>
                <div className="p-2.5 rounded bg-black/40 border border-white/5">
                  <div className="text-[10px] text-zinc-500 font-mono">FRONT HEIGHT</div>
                  <div className="font-medium text-zinc-200 mt-0.5">{product.specs.frontHeight}</div>
                </div>
                <div className="p-2.5 rounded bg-black/40 border border-white/5">
                  <div className="text-[10px] text-zinc-500 font-mono">WEIGHT ASSEMBLED</div>
                  <div className="font-medium text-zinc-200 mt-0.5">{product.specs.weight}</div>
                </div>
                <div className="p-2.5 rounded bg-black/40 border border-white/5">
                  <div className="text-[10px] text-zinc-500 font-mono">MOUNTING STYLE</div>
                  <div className="font-medium text-zinc-200 mt-0.5">{product.specs.mounting}</div>
                </div>
                <div className="p-2.5 rounded bg-black/40 border border-white/5 col-span-2">
                  <div className="text-[10px] text-zinc-500 font-mono">CONNECTIVITY</div>
                  <div className="font-medium text-zinc-200 mt-0.5">{product.specs.connectivity}</div>
                </div>
              </div>
            </div>

            {/* Engineering Highlights */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                Engineering Highlights
              </h4>
              <ul className="space-y-1 text-xs text-zinc-400">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onCustomize(product);
                onClose();
              }}
              className="w-full sm:flex-1 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg hover:shadow-amber-400/20 cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Customize in 3D Configurator</span>
            </button>

            <button
              onClick={handleQuickAdd}
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
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
