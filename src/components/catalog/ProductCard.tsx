import React from 'react';
import { Sliders, Star } from 'lucide-react';
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
    <div className="group relative bg-[#101116] border border-white/5 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-black/60">
      
      {/* Product Image Container - Clickable to open specifications */}
      <div 
        className="relative aspect-[16/10] overflow-hidden bg-zinc-950 cursor-pointer"
        onClick={() => onOpenDetails(product)}
        title={`View ${product.name} specifications`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Layout Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-semibold">
            {product.layout}
          </span>
          {product.inStock && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
              In Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 
              onClick={() => onOpenDetails(product)}
              className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500">({product.reviewCount})</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Key Hardware Specs Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">
              {product.specs.mounting.split(' ')[0]} Mount
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">
              {product.specs.weight.split(' ')[0]}
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">
              {product.specs.typingAngle}
            </span>
          </div>
        </div>

        {/* Card Footer: Price & Primary Action */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-400">Starts at</div>
            <div className="text-lg font-bold font-mono text-white">
              ${product.price}
              <span className="text-xs font-normal text-zinc-400 ml-1">USD</span>
            </div>
          </div>

          <button
            onClick={() => onCustomize(product)}
            className="px-3.5 py-2 rounded-md bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-[0.98] shadow-md hover:shadow-amber-400/20 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>

      </div>

    </div>
  );
};
