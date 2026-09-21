import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, total, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    firstName: 'Martin',
    lastName: 'Vance',
    email: 'martin.vance@atelier-keyboards.com',
    address: '428 Harajuku Design Ave',
    city: 'Tokyo',
    postalCode: '150-0001',
    country: 'Japan',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/29',
    cardCvc: '888'
  });

  if (!isCheckoutOpen) return null;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `AXIS-${Math.floor(10000 + Math.random() * 90000)}-${formData.city.slice(0, 2).toUpperCase()}`;
    setOrderNumber(generatedOrderNum);
    setStep('success');
    clearCart();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c89d5c', '#10b981', '#3b82f6', '#f59e0b']
    });
  };

  const handleClose = () => {
    setStep('shipping');
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-[#0f1015] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Checkout Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090a0d]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              AXIS Atelier &bull; Secure Checkout
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: SHIPPING */}
          {step === 'shipping' && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Shipping Destination
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Where should our atelier dispatch your custom instrument?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-zinc-400 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-zinc-400 uppercase">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Country</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400">Total Order</span>
                  <div className="text-base font-bold font-mono text-white">${total} USD</div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <form onSubmit={handleCompleteOrder} className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Payment Method
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  End-to-end encrypted 256-bit atelier transaction.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/90 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    Credit or Debit Card
                  </span>
                  <div className="flex gap-1">
                    <span className="px-1.5 py-0.5 bg-black/50 text-[10px] font-mono text-zinc-400 rounded">VISA</span>
                    <span className="px-1.5 py-0.5 bg-black/50 text-[10px] font-mono text-zinc-400 rounded">MC</span>
                    <span className="px-1.5 py-0.5 bg-black/50 text-[10px] font-mono text-zinc-400 rounded">AMEX</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase">Card Number</label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full mt-1 p-2 rounded bg-black/60 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      className="w-full mt-1 p-2 rounded bg-black/60 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase">CVC Code</label>
                    <input
                      type="text"
                      required
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full mt-1 p-2 rounded bg-black/60 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/5 text-xs text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-risk trial: 30-day sound acoustic return policy.</span>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  &larr; Back to Shipping
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg hover:shadow-emerald-400/20"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize ${total} USD</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMED */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  Commission Accepted
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                  Your Bespoke Build is Queued
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, {formData.firstName}. Your keyboard will be hand-lubed, assembled with gasket dampers, and acoustic frequency-tested at our atelier.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-mono">ORDER REGISTRY:</span>
                  <span className="font-mono text-amber-400 font-semibold">{orderNumber}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-mono">DISPATCH WINDOW:</span>
                  <span className="font-mono text-zinc-200">3 to 5 Business Days</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-mono">SHIPPED TO:</span>
                  <span className="font-mono text-zinc-200">{formData.city}, {formData.country}</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-white/10">
                  <span className="text-zinc-400 font-medium">RECEIPT TOTAL:</span>
                  <span className="font-mono text-white font-bold">${total} USD</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
                >
                  Return to Studio
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
