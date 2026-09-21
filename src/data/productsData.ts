import type { ProductItem } from '../types';

export const PRODUCTS: ProductItem[] = [
  {
    id: 'apex-75',
    slug: 'apex-75-pro',
    name: 'Apex75 Pro',
    tagline: 'The Reference 75% Custom Mechanical Instrument',
    layout: '75%',
    price: 219,
    image: '/images/hero_keyboard.jpg',
    secondaryImage: '/images/aura_white_kb.jpg',
    description: 'Engineered for discerning typists and audio perfectionists. Milled from a monolithic 2.8kg billet of aerospace 6063 aluminum, the Apex75 Pro features an acoustic isolation chamber, gasket leaf spring suspension, and a knurled rotary encoder.',
    features: [
      'Gasket leaf-spring mounting system with multi-layer acoustic dampening',
      'Solid brass acoustic weight bar with laser-etched serial registry',
      'Tri-Mode connectivity: 1000Hz 2.4G wireless, Bluetooth 5.2, Type-C',
      'South-facing hot-swappable RGB PCB with VIA / QMK custom keymapping',
      'Precision rotary encoder for fluid system volume and macro controls'
    ],
    specs: {
      typingAngle: '7.5 degrees',
      frontHeight: '18.2 mm (comfortable ergonomic slope)',
      weight: '2.15 kg assembled with brass weight',
      mounting: 'Isolated Poron gasket leaf spring',
      connectivity: 'Tri-Mode: 2.4GHz (1000Hz) / Bluetooth 5.2 / USB-C',
      pcb: '1.2mm non-flex-cut hot-swap with per-key RGB'
    },
    defaultCustomization: {
      id: 'apex-75-default',
      name: 'Apex75 Pro Custom',
      layout: '75%',
      caseColor: 'black',
      plate: 'fr4',
      switchType: 'linear',
      keycaps: 'kuro',
      weightBar: 'brass',
      cable: 'matching',
      lighting: 'amber',
      pcb: 'wireless-tri',
      basePrice: 219
    },
    inStock: true,
    rating: 4.96,
    reviewCount: 142
  },
  {
    id: 'cipher-65',
    slug: 'cipher-65-minimal',
    name: 'Cipher65 Stealth',
    tagline: 'Pure 65% Form Factor with Zero Desk Distraction',
    layout: '65%',
    price: 189,
    image: '/images/aura_white_kb.jpg',
    secondaryImage: '/images/ghost_polycarb_kb.jpg',
    description: 'Compact precision without compromise. Retains dedicated navigation arrow keys while reclaiming valuable desk surface for mouse agility. Coated in electrophoretic ceramic white or bead-blasted graphite.',
    features: [
      'Ultra-compact 65% footprint with dedicated arrow cluster',
      'Seamless screw-less top case aesthetic with hidden silicone fasteners',
      'Hot-swappable sockets rated for 10,000 switch swaps',
      'Brass acoustic backplate dampens high-frequency table vibration',
      'Compatible with all Cherry MX style 3-pin and 5-pin switches'
    ],
    specs: {
      typingAngle: '6.8 degrees',
      frontHeight: '17.4 mm',
      weight: '1.75 kg assembled',
      mounting: 'Custom silicone gasket sock mount',
      connectivity: 'Type-C detachable with low latency controller',
      pcb: '1.6mm gold-immersion hot-swap PCB'
    },
    defaultCustomization: {
      id: 'cipher-65-default',
      name: 'Cipher65 Custom',
      layout: '65%',
      caseColor: 'white',
      plate: 'polycarbonate',
      switchType: 'tactile',
      keycaps: 'shiro',
      weightBar: 'chrome',
      cable: 'matching',
      lighting: 'white',
      pcb: 'hotswap-rgb',
      basePrice: 189
    },
    inStock: true,
    rating: 4.92,
    reviewCount: 98
  },
  {
    id: 'ghost-65',
    slug: 'ghost-65-polycarb',
    name: 'Ghost65 Acrylic Atelier',
    tagline: 'Semi-Translucent Frosted Polycarbonate with Acoustic Warmth',
    layout: '65%',
    price: 209,
    image: '/images/ghost_polycarb_kb.jpg',
    secondaryImage: '/images/hero_keyboard.jpg',
    description: 'Milled from high-density optical polycarbonate, frosted to a soft satin touch. Light gently diffuses through the chassis while polycarbonate creates a deep, hollow-free acoustic profile beloved in custom keyboard recordings.',
    features: [
      'Precision CNC milled polycarbonate case with internal acoustic baffles',
      'Warm diffuse underglow with perimeter light diffuser band',
      'Flexible PC plate engineered specifically for deep "thocky" sound',
      'Custom tuned screw-in stabilizers factory pre-clipped and lubed',
      'Sound test verified: 48dB deep mellow frequency signature'
    ],
    specs: {
      typingAngle: '7.0 degrees',
      frontHeight: '18.0 mm',
      weight: '1.45 kg with internal stainless weight',
      mounting: 'Gasket mount with poron dampener strips',
      connectivity: 'Dual-mode: 2.4G wireless and Type-C',
      pcb: '1.2mm flex-cut PCB with IXPE switch foam'
    },
    defaultCustomization: {
      id: 'ghost-65-default',
      name: 'Ghost65 Custom',
      layout: '65%',
      caseColor: 'polycarb',
      plate: 'polycarbonate',
      switchType: 'linear',
      keycaps: 'kuro',
      weightBar: 'black',
      cable: 'matching',
      lighting: 'amber',
      pcb: 'hotswap-rgb',
      basePrice: 209
    },
    inStock: true,
    rating: 4.98,
    reviewCount: 76
  },
  {
    id: 'genesis-80',
    slug: 'genesis-80-tkl',
    name: 'Genesis80 TKL Classic',
    tagline: 'Tenkeyless Architectural Powerhouse for Writers & Engineers',
    layout: 'TKL',
    price: 259,
    image: '/images/hero_keyboard.jpg',
    secondaryImage: '/images/switch_artisan_macro.jpg',
    description: 'The definitive tenkeyless layout reimagined with dual-stage isolation gaskets, polished chamfer accents, and full function row spacing. Built for power users who demand immediate F-row access without layout compromises.',
    features: [
      'Full 87-key Tenkeyless layout with isolated arrow and nav clusters',
      'Integrated brass accent bar along the top typing edge',
      'Dual-stage isolation gaskets offering customized typing flex',
      'Heavy 2.6kg desk presence that eliminates desk slip completely',
      'Full QMK and VIA compatibility for instantaneous key remapping'
    ],
    specs: {
      typingAngle: '8.0 degrees',
      frontHeight: '19.0 mm',
      weight: '2.62 kg assembled',
      mounting: 'Dual-stage Poron gasket mount',
      connectivity: 'Type-C wired with ultra-fast 1000Hz polling rate',
      pcb: '1.6mm hot-swap PCB with ESD protection diodes'
    },
    defaultCustomization: {
      id: 'genesis-80-default',
      name: 'Genesis80 Custom',
      layout: 'TKL',
      caseColor: 'navy',
      plate: 'brass',
      switchType: 'linear',
      keycaps: 'cyberpunk',
      weightBar: 'brass',
      cable: 'matching',
      lighting: 'cyan',
      pcb: 'solder-audiophile',
      basePrice: 259
    },
    inStock: true,
    rating: 4.94,
    reviewCount: 115
  },
  {
    id: 'monolith-pad',
    slug: 'monolith-macropad',
    name: 'Monolith Macropad',
    tagline: 'Precision 20-Key Numeric Pad with Rotary Encoder Dial',
    layout: 'Pad',
    price: 89,
    image: '/images/switch_artisan_macro.jpg',
    secondaryImage: '/images/aura_white_kb.jpg',
    description: 'The companion pad that completes any minimalist setup. Features 17 mechanical key positions, 3 programmable macro buttons, and a smooth step-less aluminum encoder knob for spreadsheet navigation, scrubbing, or zoom.',
    features: [
      '20-key layout with dedicated mechanical numpad cluster',
      'CNC milled solid aluminum chassis matching Apex series finish',
      'Independent VIA profile switching for Photoshop, Blender, Excel',
      'USB-C passthrough hub for mouse receiver',
      'Integrated non-slip silicone base pad'
    ],
    specs: {
      typingAngle: '7.5 degrees',
      frontHeight: '18.2 mm',
      weight: '680g assembled',
      mounting: 'Top mount aluminum plate',
      connectivity: 'Type-C detachable',
      pcb: 'Hot-swap PCB with per-key RGB'
    },
    defaultCustomization: {
      id: 'monolith-pad-default',
      name: 'Monolith Pad Custom',
      layout: 'Pad',
      caseColor: 'black',
      plate: 'aluminum',
      switchType: 'tactile',
      keycaps: 'kuro',
      weightBar: 'black',
      cable: 'standard',
      lighting: 'amber',
      pcb: 'hotswap-rgb',
      basePrice: 89
    },
    inStock: true,
    rating: 4.88,
    reviewCount: 53
  }
];
