import React, { useState, useEffect } from 'react';
import { CustomizerProvider, useCustomizer } from './context/CustomizerContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { FeaturedSection } from './components/home/FeaturedSection';
import { AcousticSection } from './components/home/AcousticSection';
import { CustomizerTeaserSection } from './components/home/CustomizerTeaserSection';
import { ReviewsSection } from './components/home/ReviewsSection';
import { ProductCatalog } from './components/catalog/ProductCatalog';
import { CustomizerView } from './components/customizer/CustomizerView';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { SoundTestModal } from './components/customizer/SoundTestModal';
import type { ProductItem } from './types';

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'customizer'>('home');
  const [isSoundTestOpen, setIsSoundTestOpen] = useState(false);
  const { loadPreset, triggerKeyHit, config, setSwitchType } = useCustomizer();

  // Handle URL hash changes or back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'customizer' || hash === 'catalog' || hash === 'home') {
        setCurrentView(hash as 'home' | 'catalog' | 'customizer');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: 'home' | 'catalog' | 'customizer') => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut listener for live sound typing anywhere in customizer
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // If typing in an input field, do not trigger sound
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }
      if (e.key === ' ' || (e.key.length === 1 && !e.metaKey && !e.ctrlKey)) {
        triggerKeyHit(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [triggerKeyHit]);

  // Load a product preset and launch customizer
  const handleCustomizeProduct = (product: ProductItem) => {
    if (product.defaultCustomization) {
      loadPreset({
        ...product.defaultCustomization,
        name: `${product.name} Bespoke`,
        basePrice: product.price
      });
    }
    navigateTo('customizer');
  };

  return (
    <div className={`bg-[#fafaf9] text-zinc-900 flex flex-col selection:bg-zinc-900 selection:text-white ${currentView === 'customizer' ? 'h-full min-h-0 overflow-hidden' : 'min-h-screen'}`}>
      
      {/* Universal Navigation Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={navigateTo}
        onOpenSoundTest={() => setIsSoundTestOpen(true)}
      />

      {/* Main Content Pages */}
      <main className={`flex-1 flex flex-col min-h-0 ${currentView === 'customizer' ? 'h-full overflow-hidden' : ''}`}>
        {currentView === 'home' && (
          <div className="space-y-0">
            <HeroSection
              onStartCustomizing={() => navigateTo('customizer')}
            />
            <FeaturedSection
              onCustomize={handleCustomizeProduct}
              onExploreCatalog={() => navigateTo('catalog')}
            />
            <AcousticSection
              onOpenSoundTest={() => setIsSoundTestOpen(true)}
              onLaunchStudio={(sw) => {
                if (sw) setSwitchType(sw);
                navigateTo('customizer');
              }}
            />
            <CustomizerTeaserSection
              onStartCustomizing={() => navigateTo('customizer')}
            />
            <ReviewsSection />
          </div>
        )}

        {currentView === 'catalog' && (
          <ProductCatalog
            onCustomize={handleCustomizeProduct}
          />
        )}

        {currentView === 'customizer' && (
          <CustomizerView
            onOpenSoundTest={() => setIsSoundTestOpen(true)}
          />
        )}
      </main>

      {/* Footer (Rendered on Home and Catalog) */}
      {currentView !== 'customizer' && (
        <Footer
          setCurrentView={navigateTo}
          onOpenSoundTest={() => setIsSoundTestOpen(true)}
        />
      )}

      {/* Shopping Cart Slide-over Drawer */}
      <CartDrawer
        onGoToCustomizer={() => navigateTo('customizer')}
      />

      {/* Simulated Checkout Flow Dialog */}
      <CheckoutModal />

      {/* Switch Acoustic Lab Modal */}
      <SoundTestModal
        isOpen={isSoundTestOpen}
        onClose={() => setIsSoundTestOpen(false)}
        initialSwitch={config.switchType}
        initialPlate={config.plate}
      />

    </div>
  );
};

export function App() {
  return (
    <CustomizerProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </CustomizerProvider>
  );
}

export default App;
