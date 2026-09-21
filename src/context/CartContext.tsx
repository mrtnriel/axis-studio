import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { CartItem, KeyboardCustomization, ProductItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: ProductItem, customization: KeyboardCustomization) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  promoCode: string;
  discountRate: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  subtotal: number;
  discountAmount: number;
  shipping: number;
  estimatedTax: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'axis_studio_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage quota or private mode
    }
  }, [items]);

  const addItem = useCallback((product: ProductItem, customization: KeyboardCustomization) => {
    const configHash = `${customization.layout}-${customization.caseColor}-${customization.plate}-${customization.switchType}-${customization.keycaps}-${customization.weightBar}-${customization.cable}`;
    const cartItemId = `${product.id}-${configHash}`;

    let unitPrice = customization.basePrice;
    if (customization.caseColor === 'white') unitPrice += 20;
    else if (customization.caseColor === 'polycarb') unitPrice += 25;
    else if (customization.caseColor === 'gray') unitPrice += 10;
    else if (customization.caseColor === 'navy' || customization.caseColor === 'forest') unitPrice += 15;

    if (customization.plate === 'brass') unitPrice += 30;
    else if (customization.plate === 'polycarbonate') unitPrice += 15;
    else if (customization.plate === 'aluminum') unitPrice += 10;

    if (customization.switchType === 'tactile') unitPrice += 15;
    else if (customization.switchType === 'silent') unitPrice += 20;
    else if (customization.switchType === 'clicky') unitPrice += 10;

    if (customization.keycaps === 'shiro') unitPrice += 10;
    else if (customization.keycaps === 'botanical' || customization.keycaps === 'cyberpunk') unitPrice += 25;
    else if (customization.keycaps === 'retro') unitPrice += 20;

    if (customization.weightBar === 'chrome') unitPrice += 25;
    else if (customization.weightBar === 'chroma') unitPrice += 35;

    if (customization.cable === 'matching') unitPrice += 35;
    else if (customization.cable === 'none') unitPrice -= 10;

    setItems(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            product,
            customization,
            quantity: 1,
            unitPrice
          }
        ];
      }
    });

    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const applyPromo = useCallback((code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AXIS10' || clean === 'LAUNCH10') {
      setPromoCode(clean);
      setDiscountRate(0.10);
      return { success: true, message: '10% atelier inaugural discount applied' };
    }
    if (clean === 'THOCK20') {
      setPromoCode(clean);
      setDiscountRate(0.20);
      return { success: true, message: '20% audiophile discount applied' };
    }
    return { success: false, message: 'Invalid or expired promotion code' };
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    return Math.round(subtotal * discountRate);
  }, [subtotal, discountRate]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 200 ? 0 : 18;
  }, [subtotal]);

  const estimatedTax = useMemo(() => {
    return Math.round((subtotal - discountAmount) * 0.08);
  }, [subtotal, discountAmount]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shipping + estimatedTax);
  }, [subtotal, discountAmount, shipping, estimatedTax]);

  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    promoCode,
    discountRate,
    applyPromo,
    subtotal,
    discountAmount,
    shipping,
    estimatedTax,
    total,
    itemCount
  }), [
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    isCheckoutOpen,
    promoCode,
    discountRate,
    applyPromo,
    subtotal,
    discountAmount,
    shipping,
    estimatedTax,
    total,
    itemCount
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
