import React from 'react';
import { Sliders, ArrowRight, Star } from 'lucide-react';
import { PRODUCTS } from '../../data/productsData';
import type { ProductItem } from '../../types';

interface FeaturedSectionProps {
  onCustomize: (product: ProductItem) => void;
  onExploreCatalog: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  onCustomize,
  onExploreCatalog
}) => {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header: Architectural Drawing Sheet Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-zinc-900" />
              <span>SHEET 01 // PRODUCTION RUN SPECIFICATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mt-1">
              Curated Mechanical Instruments
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
              Monolithic CNC machined chassis with internal acoustic chambers and solid brass ballasts.
            </p>
          </div>

          <button
            onClick={onExploreCatalog}
            className="text-xs font-semibold text-zinc-900 hover:text-black flex items-center gap-1.5 uppercase tracking-wider font-mono self-start sm:self-auto pb-1 hover:underline cursor-pointer"
          >
            <span>View All Drawings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Keyboards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product, idx) => (
            <div
              key={product.id}
              className="group bg-white border border-zinc-200 hover:border-zinc-400 rounded overflow-hidden transition-all flex flex-col justify-between hover:shadow-md relative"
            >
              {/* Corner crosshairs (+) */}
              <div className="absolute top-1 left-1 text-[10px] font-mono text-zinc-300 pointer-events-none select-none z-10">+</div>
              <div className="absolute top-1 right-1 text-[10px] font-mono text-zinc-300 pointer-events-none select-none z-10">+</div>

              {/* Image Container - Clickable to open customizer */}
              <div 
                onClick={() => onCustomize(product)}
                className="relative aspect-[16/10] overflow-hidden bg-zinc-100 border-b border-zinc-200 cursor-pointer"
                title={`Customize ${product.name} in 3D`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                />

                {/* Drawing Number and Layout Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-white/95 backdrop-blur-md border border-zinc-200 text-zinc-900 font-mono text-[11px] font-semibold">
                    DWG 0{idx + 1} &bull; {product.layout}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 
                      onClick={() => onCustomize(product)}
                      className="text-base font-bold text-zinc-900 group-hover:text-black transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center text-zinc-800 text-xs font-mono">
                      <Star className="w-3 h-3 fill-zinc-900 mr-1" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-600">
                    <span className="px-2 py-0.5 rounded bg-zinc-50 border border-zinc-200">
                      {product.specs.mounting.split(' ')[0]} Mount
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-50 border border-zinc-200">
                      {product.specs.weight.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Footer with Price and One Single Clear Primary Action */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-zinc-400 font-mono block">From</span>
                    <span className="text-base font-bold font-mono text-zinc-950">${product.price} USD</span>
                  </div>

                  <button
                    onClick={() => onCustomize(product)}
                    className="px-4 py-2 rounded bg-zinc-900 hover:bg-black text-white text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-[0.98] shadow-sm cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Customize in 3D</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
