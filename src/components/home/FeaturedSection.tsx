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
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#090a0d]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              Curated Production Run
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Flagship Mechanical Keyboards
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Engineered with internal acoustic dampers and solid brass weights. Fully customizable in 3D.
            </p>
          </div>

          <button
            onClick={onExploreCatalog}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider font-mono self-start sm:self-auto"
          >
            <span>View All Models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Keyboards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="group bg-[#101116] border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-all flex flex-col justify-between hover:shadow-2xl hover:shadow-black/70"
            >
              {/* Image Container - Clickable to open customizer */}
              <div 
                onClick={() => onCustomize(product)}
                className="relative aspect-[16/10] overflow-hidden bg-zinc-950 cursor-pointer"
                title={`Customize ${product.name} in 3D`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                />

                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-semibold">
                  {product.layout}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 
                      onClick={() => onCustomize(product)}
                      className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center text-amber-400 text-xs font-mono">
                      <Star className="w-3 h-3 fill-amber-400 mr-1" />
                      {product.rating}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1 text-[11px] font-mono text-zinc-500">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">
                      {product.specs.mounting.split(' ')[0]} Mount
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5">
                      {product.specs.weight.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Footer with Price and One Single Clear Primary Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-zinc-500 font-mono block">From</span>
                    <span className="text-lg font-bold font-mono text-white">${product.price}</span>
                  </div>

                  <button
                    onClick={() => onCustomize(product)}
                    className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-[0.98] shadow-md hover:shadow-amber-400/20 cursor-pointer"
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
