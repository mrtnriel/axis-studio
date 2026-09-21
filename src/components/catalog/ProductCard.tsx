import React from 'react';
import { Sliders } from 'lucide-react';
import type { ProductItem } from '../../types';

interface ProductCardProps {
  product: ProductItem;
  onOpenDetails: (product: ProductItem) => void;
  onCustomize: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onCustomize
}) => {
  return (
    <div className="group relative bg-white border border-zinc-200 hover:border-zinc-400 transition-colors flex flex-col">
      {/* Blueprint Corner Registration Marks */}
      <div className="absolute top-1.5 left-1.5 text-[9px] font-mono text-zinc-400 select-none z-10">+</div>
      <div className="absolute top-1.5 right-1.5 text-[9px] font-mono text-zinc-400 select-none z-10">+</div>

      {/* Product Image Container - Clickable to open specifications */}
      <div 
        className="relative aspect-[16/10] overflow-hidden bg-[#fafaf9] border-b border-zinc-200 cursor-pointer"
        onClick={() => onOpenDetails(product)}
        title={`View ${product.name} specifications`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500 ease-out"
          loading="lazy"
        />

        {/* Layout Badge */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
          <span className="px-2 py-0.5 bg-white/95 border border-zinc-200 text-zinc-800 font-mono text-[10.5px]">
            {product.layout}
          </span>
          {product.inStock && (
            <span className="px-1.5 py-0.5 bg-white/95 border border-zinc-200 text-zinc-700 text-[10px] font-mono">
              BATCH READY
            </span>
          )}
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onOpenDetails(product)}
              className="text-base font-medium text-zinc-900 group-hover:text-black transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
            <div className="text-[11px] font-mono text-zinc-700">
              {product.rating} / 5.0
            </div>
          </div>

          <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Key Hardware Specs */}
          <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-mono text-zinc-700">
            <span className="px-1.5 py-0.5 border border-zinc-200 bg-[#fafaf9]">
              {product.specs.mounting.split(' ')[0]} Mount
            </span>
            <span className="px-1.5 py-0.5 border border-zinc-200 bg-[#fafaf9]">
              {product.specs.weight.split(' ')[0]}
            </span>
            <span className="px-1.5 py-0.5 border border-zinc-200 bg-[#fafaf9]">
              {product.specs.typingAngle}
            </span>
          </div>
        </div>

        {/* Card Footer: Price & Primary Action */}
        <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
          <div>
            <div className="text-[9px] uppercase font-mono tracking-wider text-zinc-700">Base Commission</div>
            <div className="text-base font-mono text-zinc-900 font-medium">
              ${product.price}
              <span className="text-[10px] font-normal text-zinc-700 ml-1">USD</span>
            </div>
          </div>

          <button
            onClick={() => onCustomize(product)}
            className="px-3.5 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors active:scale-[0.98] cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>

      </div>

    </div>
  );
};
