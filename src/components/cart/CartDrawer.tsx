import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Sliders, 
  ShoppingBag, 
  ArrowRight, 
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-white border-l border-zinc-200 h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cart Header */}
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-[#fafaf9]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-zinc-800" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-900 font-medium">
              REQUISITION MANIFEST ({itemCount})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-zinc-500 hover:text-black border border-transparent hover:border-zinc-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-[#fafaf9] border-b border-zinc-200 space-y-1.5 font-mono">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-700 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-zinc-700" />
              {subtotal >= shippingThreshold ? (
                <span className="text-zinc-900 font-medium">Free Express Freight Qualified</span>
              ) : (
                <span>Add ${(shippingThreshold - subtotal).toFixed(0)} for Free Express Freight</span>
              )}
            </span>
            <span className="text-zinc-700">{progressPercent}%</span>
          </div>
          <div className="w-full h-1 bg-zinc-200 overflow-hidden">
            <div 
              className="h-full bg-zinc-900 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items Scrollable List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length > 0 ? (
            items.map((item) => {
              const c = item.customization;
              return (
                <div
                  key={item.cartItemId}
                  className="p-4 border border-zinc-200 bg-[#fafaf9] space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover bg-white shrink-0 border border-zinc-200 grayscale"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-medium text-zinc-900 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-zinc-400 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Technical Specs List */}
                      <div className="mt-1 text-[10px] font-mono text-zinc-500 space-y-0.5">
                        <div>CHASSIS: {c.caseColor.toUpperCase()} ({c.layout})</div>
                        <div>SWITCH: {c.switchType.toUpperCase()} // {c.plate.toUpperCase()} PLATE</div>
                        <div>KEYCAPS: {c.keycaps.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 hover:text-black flex items-center gap-1 cursor-pointer"
                      >
                        <Sliders className="w-3 h-3" />
                        <span>Edit 3D CAD</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-zinc-300 bg-white">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 text-zinc-600 hover:text-black cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono text-zinc-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 text-zinc-600 hover:text-black cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-medium text-zinc-900">
                        ${item.unitPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 space-y-3">
              <p className="text-xs font-mono text-zinc-500">Requisition manifest is currently empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 bg-zinc-900 text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                Browse Instruments
              </button>
            </div>
          )}
        </div>

        {/* Footer Order Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-200 bg-[#fafaf9] space-y-3 font-mono">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (TRY 'AXIS10')"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-zinc-300 text-xs text-zinc-900 uppercase placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
              />
              <button
                type="submit"
                className="px-3 py-1.5 border border-zinc-300 hover:border-zinc-900 bg-white text-xs text-zinc-900 uppercase cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoStatus && (
              <div className={`text-[10px] ${promoStatus.success ? 'text-emerald-600' : 'text-red-500'}`}>
                {promoStatus.message}
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1 text-xs text-zinc-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-zinc-900">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Voucher Discount ({promoCode})</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Freight</span>
                <span className="text-zinc-900">{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="text-zinc-900">${estimatedTax}</span>
              </div>
              <div className="pt-2 border-t border-zinc-200 flex justify-between font-medium text-sm text-zinc-900">
                <span>Total Manifest</span>
                <span>${total} USD</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-zinc-900 hover:bg-black text-white text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-[0.98]"
            >
              <span>Authorize & Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
