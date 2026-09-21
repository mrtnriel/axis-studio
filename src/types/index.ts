export type LayoutType = '65%' | '75%' | 'TKL' | 'Pad';

export type CaseColor = 'black' | 'white' | 'gray' | 'polycarb' | 'navy' | 'forest';
export type PlateType = 'fr4' | 'brass' | 'polycarbonate' | 'aluminum';
export type SwitchType = 'linear' | 'tactile' | 'silent' | 'clicky';
export type KeycapColorway = 'kuro' | 'shiro' | 'botanical' | 'cyberpunk' | 'retro';
export type WeightBarFinish = 'brass' | 'chrome' | 'chroma' | 'black';
export type CableColor = 'matching' | 'standard' | 'none';
export type LightingEffect = 'amber' | 'white' | 'cyan' | 'cycle' | 'off';
export type PcbType = 'hotswap-rgb' | 'wireless-tri' | 'solder-audiophile';

export interface KeyboardCustomization {
  id: string;
  name: string;
  layout: LayoutType;
  caseColor: CaseColor;
  plate: PlateType;
  switchType: SwitchType;
  keycaps: KeycapColorway;
  weightBar: WeightBarFinish;
  cable: CableColor;
  lighting: LightingEffect;
  pcb: PcbType;
  basePrice: number;
}

export interface ComponentOption<T> {
  id: T;
  name: string;
  description: string;
  priceDelta: number;
  hex?: string;
  secondaryHex?: string;
  badge?: string;
  acousticNote?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  layout: LayoutType;
  price: number;
  image: string;
  secondaryImage?: string;
  description: string;
  features: string[];
  specs: {
    typingAngle: string;
    frontHeight: string;
    weight: string;
    mounting: string;
    connectivity: string;
    pcb: string;
  };
  defaultCustomization: Partial<KeyboardCustomization>;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  cartItemId: string;
  product: ProductItem;
  customization: KeyboardCustomization;
  quantity: number;
  unitPrice: number;
}
