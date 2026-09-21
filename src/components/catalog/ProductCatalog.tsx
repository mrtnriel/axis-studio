import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '../../data/productsData';
import type { ProductItem } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductCatalogProps {
  onCustomize: (product: ProductItem) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onCustomize }) => {
  const [selectedLayout, setSelectedLayout] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesLayout = selectedLayout === 'all' || item.layout === selectedLayout;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specs.mounting.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLayout && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedLayout, searchQuery, sortBy]);

  const layouts = ['all', '75%', '65%', 'TKL', 'Pad'];

  return (
    <div className="min-h-screen bg-[#070709] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Catalog Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              Acoustic Instruments Registry
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
              Custom Mechanical Keyboards
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1 leading-relaxed">
              Every chassis is CNC machined from solid aluminum or optical polycarbonate, balanced with heavy brass weights and gasket-isolated plates.
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-500">
            Showing {filteredProducts.length} Atelier Instruments
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#101116] p-3 rounded-xl border border-white/5">
          
          {/* Layout Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <span className="text-xs text-zinc-500 mr-2 flex items-center gap-1 hidden sm:flex">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Layout:
            </span>
            {layouts.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLayout(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all uppercase ${
                  selectedLayout === l
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search models or mounting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
                className="pl-3 pr-8 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-amber-400 appearance-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setActiveModalProduct(p)}
                onCustomize={onCustomize}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-3 bg-[#101116] rounded-2xl border border-white/5">
            <p className="text-base text-zinc-300">No mechanical instruments match your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedLayout('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white uppercase tracking-wider font-mono transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onCustomize={onCustomize}
      />
    </div>
  );
};
