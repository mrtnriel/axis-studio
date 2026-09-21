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
    email: 'martin.vance@axis-studio.design',
    address: '428 Architecture Ave, Studio 4B',
    city: 'Kyoto',
    postalCode: '604-8001',
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
    const generatedOrderNum = `AXIS-DWG-${Math.floor(10000 + Math.random() * 90000)}-${formData.city.slice(0, 2).toUpperCase()}`;
    setOrderNumber(generatedOrderNum);
    setStep('success');
    clearCart();

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#18181b', '#71717a', '#a1a1aa', '#e4e4e7']
    });
  };

  const handleClose = () => {
    setStep('shipping');
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-white border border-zinc-300 overflow-hidden shadow-2xl my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Checkout Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-[#fafaf9]">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-zinc-700" />
            <span className="text-[10.5px] font-mono uppercase tracking-widest text-zinc-800 font-medium">
              AXIS STUDIO // SECURE REQUISITION AUTHORIZATION
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1 text-zinc-500 hover:text-black border border-transparent hover:border-zinc-300 transition-colors cursor-pointer"
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
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                  STEP 01 OF 02
                </span>
                <h3 className="text-lg font-light text-zinc-900 tracking-tight">
                  Dispatch & Shipping Destination
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5 font-normal">
                  Specify physical delivery address for precision insured freight courier.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[10px] font-mono text-zinc-700 uppercase">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#fafaf9] border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-700 uppercase">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#fafaf9] border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-700 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 p-2 bg-[#fafaf9] border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-700 uppercase">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full mt-1 p-2 bg-[#fafaf9] border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-zinc-700 uppercase">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#fafaf9] border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-700 uppercase">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#fafaf9] border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-700 uppercase">Country</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#fafaf9] border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                <div className="text-xs font-mono text-zinc-600">
                  Total Order: <span className="font-medium text-zinc-900">${total} USD</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-zinc-900 hover:bg-black text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer active:scale-[0.98]"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                  STEP 02 OF 02
                </span>
                <h3 className="text-lg font-light text-zinc-900 tracking-tight">
                  Authorization & Payment
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Secure encrypted bank-grade transaction processing.
                </p>
              </div>

              <div className="p-3 border border-zinc-200 bg-[#fafaf9] flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-600">Requisition Reference</span>
                <span className="text-zinc-900 font-medium">${total} USD</span>
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-700 uppercase">Card Number</label>
                <div className="relative mt-1">
                  <CreditCard className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full pl-9 p-2 bg-[#fafaf9] border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-zinc-700 uppercase">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={formData.cardExp}
                    onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#fafaf9] border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-700 uppercase">CVC Code</label>
                  <input
                    type="text"
                    required
                    placeholder="CVC"
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#fafaf9] border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div className="p-3 border border-zinc-200 bg-white flex items-center gap-2 text-[10.5px] font-mono text-zinc-600">
                <ShieldCheck className="w-4 h-4 text-zinc-800" />
                <span>256-BIT SSL ENCRYPTION &bull; ZERO DATA RETENTION</span>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs font-mono text-zinc-600 hover:text-black cursor-pointer uppercase"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-zinc-900 hover:bg-black text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-colors cursor-pointer active:scale-[0.98]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize Commission (${total})</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <div className="py-6 text-center space-y-5">
              <div className="w-12 h-12 border border-zinc-300 bg-[#fafaf9] flex items-center justify-center mx-auto text-zinc-900">
                <CheckCircle className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                  COMMISSION CONFIRMED
                </span>
                <h3 className="text-xl font-light text-zinc-900 tracking-tight mt-1">
                  Commission Queued for Production
                </h3>
                <p className="text-xs text-zinc-600 max-w-md mx-auto mt-1 leading-relaxed">
                  Your customized mechanical keyboard instrument has entered our low-volume CNC machining schedule.
                </p>
              </div>

              <div className="p-4 border border-zinc-200 bg-[#fafaf9] text-left max-w-md mx-auto space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Docket Number:</span>
                  <span className="text-zinc-900 font-medium">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Dispatch Estimate:</span>
                  <span className="text-zinc-900 font-medium">3 to 5 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Status:</span>
                  <span className="text-zinc-900 font-medium">MACHINING QUEUED</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-7 py-3 bg-zinc-900 hover:bg-black text-white text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer"
              >
                Return to Studio
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
