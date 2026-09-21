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
    <div className="min-h-screen bg-[#fafaf9] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Catalog Drawing Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] font-mono text-zinc-700 uppercase tracking-widest">
              <span>SHEET 02 // INSTRUMENT REGISTRY</span>
              <span className="h-2 w-2 bg-zinc-300 rounded-full" />
              <span>LOW-VOLUME CNC PRODUCTION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-900 mt-1">
              Mechanical Keyboard Instruments
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl mt-1 leading-relaxed">
              Every chassis is CNC machined from solid aluminum or optical polycarbonate, balanced with heavy brass weights and gasket-isolated plates.
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-700 bg-white border border-zinc-200 px-3 py-1.5 self-start md:self-auto">
            CATALOGUE // {filteredProducts.length} SPECIMENS
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 border border-zinc-200">
          
          {/* Layout Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <span className="text-xs font-mono text-zinc-700 mr-2 flex items-center gap-1 hidden sm:flex">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              LAYOUT:
            </span>
            {layouts.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLayout(l)}
                className={`px-3 py-1 text-xs font-mono transition-colors uppercase cursor-pointer ${
                  selectedLayout === l
                    ? 'bg-zinc-900 text-white font-medium'
                    : 'bg-[#fafaf9] text-zinc-600 hover:text-black border border-zinc-200'
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
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search models or mounting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#fafaf9] border border-zinc-200 text-xs font-mono text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
                className="pl-3 pr-8 py-1.5 bg-[#fafaf9] border border-zinc-200 text-xs font-mono text-zinc-800 focus:outline-none focus:border-zinc-900 appearance-none cursor-pointer"
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
          <div className="text-center py-24 space-y-3 bg-white border border-zinc-200">
            <p className="text-sm font-mono text-zinc-600">No mechanical instruments match your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedLayout('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-zinc-900 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
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
