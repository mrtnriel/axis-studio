import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Sliders, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCustomizer } from '../../context/CustomizerContext';
import type { CartItem } from '../../types';

interface CartDrawerProps {
  onGoToCustomizer: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onGoToCustomizer }) => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    isCartOpen, 
    setIsCartOpen, 
    setIsCheckoutOpen,
    promoCode, 
    applyPromo, 
    subtotal, 
    discountAmount, 
    shipping, 
    estimatedTax, 
    total,
    itemCount 
  } = useCart();

  const { loadPreset } = useCustomizer();
  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromo(promoInput);
    setPromoStatus(res);
  };

  const handleEditItem = (item: CartItem) => {
    loadPreset(item.customization);
    setIsCartOpen(false);
    onGoToCustomizer();
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Free shipping threshold ($200)
  const shippingThreshold = 200;
  const progressPercent = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-[#0d0e13] border-l border-white/10 h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cart Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#090a0d]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-semibold text-white tracking-wide">
              Atelier Cart ({itemCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-zinc-900/60 border-b border-white/5 space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-zinc-300 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              {subtotal >= shippingThreshold ? (
                <span className="text-emerald-400 font-semibold">Free Express Shipping Unlocked</span>
              ) : (
                <span>Add ${(shippingThreshold - subtotal).toFixed(0)} for Free Express</span>
              )}
            </span>
            <span className="text-zinc-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items Scrollable List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length > 0 ? (
            items.map((item) => {
              const c = item.customization;
              return (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-zinc-950 shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-zinc-500 hover:text-red-400 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs font-mono text-amber-400 font-semibold mt-0.5">
                        ${item.unitPrice} <span className="text-zinc-500 text-[10px] font-normal">each</span>
                      </div>
                    </div>
                  </div>

                  {/* Component Breakdown Pills */}
                  <div className="flex flex-wrap gap-1 text-[10px] font-mono text-zinc-400">
                    <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5 capitalize">
                      {c.caseColor} Case
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5 capitalize">
                      {c.plate} Plate
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5 capitalize">
                      {c.switchType} Switch
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5 capitalize">
                      {c.keycaps} Keycaps
                    </span>
                    {c.pcb && (
                      <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
                        {c.pcb === 'wireless-tri' ? 'Tri-Mode Wireless' : c.pcb === 'solder-audiophile' ? 'Flex-Cut Solder' : 'Hot-Swap RGB'} PCB
                      </span>
                    )}
                    {c.cable === 'matching' && (
                      <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
                        Coiled Cable
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper & Modify Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 bg-zinc-800 rounded-md p-0.5 border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 text-zinc-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono font-semibold text-white px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 text-zinc-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleEditItem(item)}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Edit in 3D</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 space-y-3">
              <ShoppingBag className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-sm text-zinc-400">Your atelier bag is currently empty.</p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onGoToCustomizer();
                }}
                className="px-4 py-2 rounded bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-amber-300"
              >
                Launch 3D Configurator
              </button>
            </div>
          )}
        </div>

        {/* Cart Bottom Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 bg-[#090a0d] border-t border-white/10 space-y-4">
            
            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo (try AXIS10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-white font-medium transition-colors"
              >
                Apply
              </button>
            </form>

            {promoStatus && (
              <p className={`text-[11px] ${promoStatus.success ? 'text-emerald-400' : 'text-red-400'}`}>
                {promoStatus.message}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">Subtotal</span>
                <span className="font-mono">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Atelier Promo Discount ({promoCode})</span>
                  <span className="font-mono">-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-400">Insured Shipping</span>
                <span className="font-mono">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Estimated Sales Tax</span>
                <span className="font-mono">${estimatedTax}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-white">
                <span>Estimated Total</span>
                <span className="font-mono text-amber-400">${total} USD</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-400/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Encrypted Checkout &bull; 30-Day Acoustic Guarantee</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
