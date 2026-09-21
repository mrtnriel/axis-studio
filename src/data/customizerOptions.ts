import type { 
  CaseColor, 
  PlateType, 
  SwitchType, 
  KeycapColorway, 
  WeightBarFinish, 
  CableColor, 
  LightingEffect,
  PcbType,
  ComponentOption 
} from '../types';

export const CASE_OPTIONS: ComponentOption<CaseColor>[] = [
  {
    id: 'black',
    name: 'Obsidian Black',
    description: 'Anodized 6063 aerospace aluminum, sandblasted finish',
    priceDelta: 0,
    hex: '#18191c',
    badge: 'Standard'
  },
  {
    id: 'white',
    name: 'E-White Ceramic',
    description: 'Electrophoretic micro-arc oxidation coating, silk matte',
    priceDelta: 20,
    hex: '#f5f5f7',
    badge: 'Popular'
  },
  {
    id: 'gray',
    name: 'Space Graphite',
    description: 'Bead-blasted gunmetal gray with satin sheen',
    priceDelta: 10,
    hex: '#4a4d57',
  },
  {
    id: 'polycarb',
    name: 'Ghost Polycarbonate',
    description: 'Precision CNC-milled semi-translucent frosted chassis',
    priceDelta: 25,
    hex: '#cfd4dc',
    badge: 'Limited'
  },
  {
    id: 'navy',
    name: 'Midnight Navy',
    description: 'Deep royal blue anodization with micro-flake shimmer',
    priceDelta: 15,
    hex: '#192338',
  },
  {
    id: 'forest',
    name: 'Pine Botanical',
    description: 'Subtle sage dark green with matte passivation layer',
    priceDelta: 15,
    hex: '#23322b',
  }
];

export const PLATE_OPTIONS: ComponentOption<PlateType>[] = [
  {
    id: 'fr4',
    name: 'FR4 Fiber Glass',
    description: 'Gold-plated immersion traces with balanced, poppy acoustics',
    priceDelta: 0,
    hex: '#1f1e1c',
    acousticNote: 'Poppy and balanced bottom-out'
  },
  {
    id: 'brass',
    name: 'Solid Milled Brass',
    description: 'Heavyweight acoustic density, crisp high-pitch clack',
    priceDelta: 30,
    hex: '#d4af37',
    badge: 'Heavy Acoustic',
    acousticNote: 'Crisp metallic high-pitch clack'
  },
  {
    id: 'polycarbonate',
    name: 'Flex Polycarbonate',
    description: 'Flexible typing feel with deep, bassy "thock" acoustic profile',
    priceDelta: 15,
    hex: '#e2e8f0',
    acousticNote: 'Deep, warm, bass-heavy thock'
  },
  {
    id: 'aluminum',
    name: 'Anodized Aluminum',
    description: 'Classic crisp bottom out with responsive feedback',
    priceDelta: 10,
    hex: '#a0a5ad',
    acousticNote: 'Crisp, firm, and responsive'
  }
];

export const SWITCH_OPTIONS: ComponentOption<SwitchType>[] = [
  {
    id: 'linear',
    name: 'Morandi Linear 45g',
    description: 'Factory hand-lubed, ultra-smooth POM stem, deep creamy sound',
    priceDelta: 0,
    hex: '#cbbba8',
    secondaryHex: '#e6ded4',
    badge: 'Creamy Thock',
    acousticNote: 'Smooth glide, deep creamy acoustic'
  },
  {
    id: 'tactile',
    name: 'Apex Panda Tactile 62g',
    description: 'Snappy tactile bump with zero pre-travel, crisp bottom-out clack',
    priceDelta: 15,
    hex: '#e58e26',
    secondaryHex: '#f1f2f6',
    badge: 'Crisp Bump',
    acousticNote: 'Prominent bump, snappy clack'
  },
  {
    id: 'silent',
    name: 'Velvet Silent Linear 50g',
    description: 'Dual silicone internal dampening rings for library-quiet typing',
    priceDelta: 20,
    hex: '#4b6584',
    secondaryHex: '#778ca3',
    badge: 'Whisper Quiet',
    acousticNote: 'Muffled, smooth, silent'
  },
  {
    id: 'clicky',
    name: 'Jade Clickbar 50g',
    description: 'Thick acoustic clickbar producing an unmistakable crisp snap',
    priceDelta: 10,
    hex: '#20bf6b',
    secondaryHex: '#26de81',
    badge: 'Tactile Click',
    acousticNote: 'Sharp clickbar snap and pop'
  }
];

export const KEYCAP_OPTIONS: ComponentOption<KeycapColorway>[] = [
  {
    id: 'kuro',
    name: 'Kuro Obsidian (WoB)',
    description: 'Double-shot PBT stealth matte dark slate with crisp white legends',
    priceDelta: 0,
    hex: '#18181c',
    secondaryHex: '#25262c',
    badge: 'Classic'
  },
  {
    id: 'shiro',
    name: 'Shiro Minimal (BoW)',
    description: 'Clean chalk white alpha keys with warm concrete gray modifiers',
    priceDelta: 10,
    hex: '#f5f5f7',
    secondaryHex: '#cfd2d8',
    badge: 'Clean'
  },
  {
    id: 'botanical',
    name: 'Botanical Garden',
    description: 'Sage green modifiers with soft cream alphas and terracotta accents',
    priceDelta: 25,
    hex: '#3b5349',
    secondaryHex: '#e8e6de',
    badge: 'Artisan'
  },
  {
    id: 'cyberpunk',
    name: 'Neo Terminal',
    description: 'Deep carbon charcoal alphas with electric cyan and amber accents',
    priceDelta: 25,
    hex: '#14161f',
    secondaryHex: '#00d2d3',
    badge: 'Neon Accent'
  },
  {
    id: 'retro',
    name: 'Heritage 1984',
    description: 'Classic vintage computer beige with muted wine red and royal blue',
    priceDelta: 20,
    hex: '#e2d8c3',
    secondaryHex: '#a55252',
    badge: 'Vintage'
  }
];

export const WEIGHT_OPTIONS: ComponentOption<WeightBarFinish>[] = [
  {
    id: 'brass',
    name: 'Brushed Pure Brass',
    description: 'Solid brass ingot with brushed golden finish and anti-tarnish coat',
    priceDelta: 0,
    hex: '#cfa942',
    badge: 'Standard'
  },
  {
    id: 'chrome',
    name: 'Mirror PVD Silver',
    description: 'Flawless optical mirror finish with ultra-hard PVD deposition',
    priceDelta: 25,
    hex: '#e0e5eb',
  },
  {
    id: 'chroma',
    name: 'Chroma Prism PVD',
    description: 'Multi-color iridescent rainbow spectrum reflection',
    priceDelta: 35,
    hex: '#9b59b6',
    badge: 'Iridescent'
  },
  {
    id: 'black',
    name: 'Matte Stealth Black',
    description: 'Hard anodized dark slate with laser-etched serial emblem',
    priceDelta: 0,
    hex: '#121214',
  }
];

export const CABLE_OPTIONS: ComponentOption<CableColor>[] = [
  {
    id: 'matching',
    name: 'Custom Coiled Aviator Cable',
    description: 'Braided Paracord + Techflex with detachable 4-pin metal aviator',
    priceDelta: 35,
    badge: 'Recommended'
  },
  {
    id: 'standard',
    name: 'Straight Braided USB-C',
    description: 'Durable dual-weave nylon braided cable (1.8m)',
    priceDelta: 0,
  },
  {
    id: 'none',
    name: 'Keyboard Only (No Cable)',
    description: 'Deduct cable if using your existing bespoke desk setup',
    priceDelta: -10,
  }
];

export const LIGHTING_OPTIONS: ComponentOption<LightingEffect>[] = [
  {
    id: 'amber',
    name: 'Warm Amber Studio Glow (3000K)',
    description: 'Calm, glare-free architectural warm light diffused through plate',
    priceDelta: 0,
    hex: '#f59e0b'
  },
  {
    id: 'white',
    name: 'Clean Studio White (5000K)',
    description: 'Crisp neutral white accentuating key legends and bevels',
    priceDelta: 0,
    hex: '#ffffff'
  },
  {
    id: 'cyan',
    name: 'Ice Cyan Glow',
    description: 'Subtle high-contrast neon illumination',
    priceDelta: 0,
    hex: '#06b6d4'
  },
  {
    id: 'cycle',
    name: 'Dynamic Ambient Spectrum',
    description: 'Slow, fluid colorway breathing across underglow channels',
    priceDelta: 0,
    hex: '#a855f7'
  },
  {
    id: 'off',
    name: 'Stealth Mode (LEDs Off)',
    description: 'Completely unlit for pure mechanical minimalism',
    priceDelta: 0,
    hex: '#333333'
  }
];

export const PCB_OPTIONS: ComponentOption<PcbType>[] = [
  {
    id: 'hotswap-rgb',
    name: 'Hot-Swap Per-Key RGB (Wired)',
    description: 'Kailh hot-swap sockets, 1000Hz polling rate, south-facing RGB LEDs',
    priceDelta: 0,
    badge: 'Standard'
  },
  {
    id: 'wireless-tri',
    name: 'Tri-Mode Wireless + Bluetooth 5.2',
    description: '2.4GHz low latency dongle + BT 5.2 + USB-C with 4000mAh battery management',
    priceDelta: 25,
    badge: 'Wireless'
  },
  {
    id: 'solder-audiophile',
    name: 'Solderable Flex-Cut Audiophile PCB',
    description: 'Direct switch pin soldering, individual perimeter flex relief cuts, maximum acoustic depth',
    priceDelta: 15,
    badge: 'Audiophile'
  }
];
