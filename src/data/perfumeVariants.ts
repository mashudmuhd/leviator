import { PerfumeVariant } from '../types';

export const PERFUME_VARIANTS: PerfumeVariant[] = [
  {
    id: 'lor-blanc',
    name: 'L’Or Blanc',
    tagline: 'Liquid Gold & Luminous White Floral Bloom',
    description: 'An opulent floral nectar. Sparkling Amalfi lemon and crisp raspberry cascade into an intoxicating heart of jasmine, gardenia, and African orange flower, enveloped in molten white honey and golden amber.',
    price: 80,
    currency: 'AED',
    volume: '100ml / 3.4 fl. oz.',
    glassColor: '#1c140a',
    liquidColor: '#f39c12',
    accentColor: '#f1c40f',
    capColor: '#3d3014',
    bgGradient: 'radial-gradient(circle at 50% 40%, rgba(243, 156, 18, 0.28) 0%, rgba(18, 14, 8, 0.95) 75%)',
    roughness: 0.1,
    transmission: 0.88,
    ior: 1.53,
    scentFamily: 'Solar Floral Honey Amber',
    notes: {
      top: [
        { id: 'lor-top-1', name: 'Wild Raspberry', category: 'top', description: 'Sun-drenched, tart-sweet red berry sparkle.', origin: 'Grasse, France', color: '#e84393' },
        { id: 'lor-top-2', name: 'Mediterranean Neroli', category: 'top', description: 'Fresh, honeyed green floral citrus nuance.', origin: 'Tunisia', color: '#2ecc71' },
        { id: 'lor-top-3', name: 'Amalfi Lemon', category: 'top', description: 'Zesty, crystalline Italian sunshine opening.', origin: 'Amalfi Coast, Italy', color: '#f1c40f' }
      ],
      heart: [
        { id: 'lor-heart-1', name: 'Jasmine Sambac', category: 'heart', description: 'Sensual, intoxicating night-blooming white petals.', origin: 'Madurai, India', color: '#ecf0f1' },
        { id: 'lor-heart-2', name: 'African Orange Flower', category: 'heart', description: 'Opulent, radiant, golden solar blossom.', origin: 'Morocco', color: '#f39c12' },
        { id: 'lor-heart-3', name: 'Velvet Gardenia', category: 'heart', description: 'Lush, creamy aristocratic white flower.', origin: 'Tahiti', color: '#ffffff' }
      ],
      base: [
        { id: 'lor-base-1', name: 'Pure White Honey', category: 'base', description: 'Warm nectar sweetness with velvety texture.', origin: 'Provence, France', color: '#d35400' },
        { id: 'lor-base-2', name: 'Aged Patchouli', category: 'base', description: 'Earthy, dark woodiness grounding the sweetness.', origin: 'Sumatra, Indonesia', color: '#27ae60' },
        { id: 'lor-base-3', name: 'Golden Amber Resin', category: 'base', description: 'Fossilized amber giving enduring golden warmth.', origin: 'Baltic Region', color: '#e67e22' }
      ]
    },
    craftsmanshipDetails: {
      title: 'Cold-Extracted Honey & White Floral Infusion',
      description: 'Enfleurage and gentle acoustic extraction preserved over 180 days to retain the delicate nectar brilliance of morning-picked white blooms.',
      macerationTime: '180 Days',
      concentration: 'Extrait de Parfum (28%)',
      artisan: 'Master Perfumer Camille Beauchamp'
    },
    inStock: true,
    isComingSoon: false,
    imageFallback: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'vortex-imperial',
    name: 'Vortex Impérial',
    tagline: 'Electric Grapefruit & Smoky Ambrox Vetiver',
    description: 'A high-voltage collision of crisp pink grapefruit and spicy fresh ginger, radiating with crystalline Ambroxan, botanical ambrette seeds, and smoky Bourbon vetiver roots.',
    price: 80,
    currency: 'AED',
    volume: '100ml / 3.4 fl. oz.',
    glassColor: '#0a161d',
    liquidColor: '#00cec9',
    accentColor: '#81ecec',
    capColor: '#1a2e3b',
    bgGradient: 'radial-gradient(circle at 50% 40%, rgba(0, 206, 201, 0.24) 0%, rgba(10, 22, 29, 0.95) 75%)',
    roughness: 0.09,
    transmission: 0.92,
    ior: 1.51,
    scentFamily: 'Citrus Woody Ambrox',
    notes: {
      top: [
        { id: 'vor-top-1', name: 'Ruby Grapefruit', category: 'top', description: 'Crisp, bittersweet, effervescent citrus rush.', origin: 'Florida, USA', color: '#ff7675' },
        { id: 'vor-top-2', name: 'Zesty Fresh Ginger', category: 'top', description: 'Fiery, spicy kick adding modern vibrancy.', origin: 'Nigeria', color: '#fdcb6e' }
      ],
      heart: [
        { id: 'vor-heart-1', name: 'Crystalline Ambroxan', category: 'heart', description: 'Modern mineral ambergris radiance and aura.', origin: 'Molecular Luxury', color: '#74b9ff' },
        { id: 'vor-heart-2', name: 'Botanical Ambrette', category: 'heart', description: 'Nutty, musky seed warmth with fruity nuance.', origin: 'Ecuador', color: '#d6a2e8' }
      ],
      base: [
        { id: 'vor-base-1', name: 'Smoky Bourbon Vetiver', category: 'base', description: 'Earth-rooted aristocratic smoky wood anchor.', origin: 'Haiti', color: '#00b894' },
        { id: 'vor-base-2', name: 'Velvet Cashmere Musk', category: 'base', description: 'Clean, sensual skin-scent warmth.', origin: 'Noble Accord', color: '#dfe6e9' }
      ]
    },
    craftsmanshipDetails: {
      title: 'Supercritical CO2 Botanical Extraction',
      description: 'Ginger and vetiver roots extracted at low temperatures using pressurized fluid to capture true-to-nature smoky freshness without heat degradation.',
      macerationTime: '240 Days',
      concentration: 'Extrait de Parfum (30%)',
      artisan: 'Master Perfumer Lucian Vance'
    },
    inStock: true,
    isComingSoon: false,
    imageFallback: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'leviatur-signature',
    name: 'Leviatur Signature',
    tagline: 'Dark Resin & Smoked Amber Vanilla',
    description: 'The inaugural masterpiece. A matte black crystal flacon housing rare Baltic amber, aged dark resin, and nocturnal smoked Madagascar vanilla.',
    price: 80,
    currency: 'AED',
    volume: '100ml / 3.4 fl. oz.',
    glassColor: '#0a0a0d',
    liquidColor: '#e28743',
    accentColor: '#d4af37',
    capColor: '#2b2b36',
    bgGradient: 'radial-gradient(circle at 50% 40%, rgba(226, 135, 67, 0.22) 0%, rgba(13, 13, 17, 0.95) 75%)',
    roughness: 0.12,
    transmission: 0.85,
    ior: 1.52,
    scentFamily: 'Oriental Woody Amber',
    notes: {
      top: [
        { id: 'lev-top-1', name: 'Calabrian Bergamot', category: 'top', description: 'Sparkling citrus opening with bitter nuances.', origin: 'Italy', color: '#f39c12' },
        { id: 'lev-top-2', name: 'Smoked Pink Pepper', category: 'top', description: 'Vibrant spicy-sweet kick adding immediate intrigue.', origin: 'Madagascar', color: '#e74c3c' }
      ],
      heart: [
        { id: 'lev-heart-1', name: 'Baltic Amber Resin', category: 'heart', description: 'Warm fossilized resin giving rich golden depth.', origin: 'Baltic Region', color: '#e67e22' },
        { id: 'lev-heart-2', name: 'Velvet Vanilla Smoke', category: 'heart', description: 'Dark non-gourmand velvet vanilla pod smoke.', origin: 'Madagascar', color: '#d35400' }
      ],
      base: [
        { id: 'lev-base-1', name: 'Rare Black Agarwood', category: 'base', description: 'Aged agarwood providing a regal foundation.', origin: 'Assam, India', color: '#2c3e50' },
        { id: 'lev-base-2', name: 'Florentine Gold Cedar', category: 'base', description: 'Dry aristocratic wood anchor.', origin: 'Atlas Mountains', color: '#7f8c8d' }
      ]
    },
    craftsmanshipDetails: {
      title: 'Hand-Macerated Amber Resin',
      description: 'Macerated for 9 months in solid oak casks to extract raw velvet warmth without heat distillation.',
      macerationTime: '270 Days',
      concentration: 'Extrait de Parfum (28%)',
      artisan: 'Master Perfumer Antoine V. Masson'
    },
    inStock: true,
    isComingSoon: false,
    imageFallback: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'rose-lavie',
    name: 'Rose La Vie',
    tagline: 'Nocturnal Bloom & Crimson Velvet',
    description: 'Enchanting luxury. Hand-picked Damask rose harvested at dusk, resting on gold pedestals with white truffle mist and soft cashmere wood.',
    price: 80,
    currency: 'AED',
    volume: '100ml / 3.4 fl. oz.',
    glassColor: '#1c0c16',
    liquidColor: '#e056fd',
    accentColor: '#ff7675',
    capColor: '#3a2034',
    bgGradient: 'radial-gradient(circle at 50% 40%, rgba(224, 86, 253, 0.24) 0%, rgba(25, 10, 20, 0.95) 75%)',
    roughness: 0.08,
    transmission: 0.90,
    ior: 1.54,
    scentFamily: 'Floral Crimson Velvet',
    notes: {
      top: [
        { id: 'rose-top-1', name: 'White Truffle Mist', category: 'top', description: 'Earthy, crystalline ozonic opening spray.', origin: 'Piedmont, Italy', color: '#ecf0f1' },
        { id: 'rose-top-2', name: 'Lychee Nectar', category: 'top', description: 'Dewy translucent fruit sweetness.', origin: 'Reunion Island', color: '#ff7675' }
      ],
      heart: [
        { id: 'rose-heart-1', name: 'May Damask Rose', category: 'heart', description: 'Hand-picked 100-petal rose petals distilled at dusk.', origin: 'Grasse, France', color: '#e84393' },
        { id: 'rose-heart-2', name: 'Florentine Iris Concrete', category: 'heart', description: 'Powdery aristocratic iris roots.', origin: 'Florence, Italy', color: '#a55eea' }
      ],
      base: [
        { id: 'rose-base-1', name: 'Cashmere Musk', category: 'base', description: 'Silky skin-scent warmth.', origin: 'Synthetic Noble', color: '#d1ccc0' },
        { id: 'rose-base-2', name: 'Golden Quartz Fluid', category: 'base', description: 'Mineral purity anchor.', origin: 'Swiss Alps', color: '#74b9ff' }
      ]
    },
    craftsmanshipDetails: {
      title: 'Dusk Hydro-Distillation',
      description: 'Extracted using cold-press hydro-distillation within 3 hours of picking to capture volatile ethereal aromatics.',
      macerationTime: '180 Days',
      concentration: 'Extrait de Parfum (30%)',
      artisan: 'Perfumer Hélène de Charenton'
    },
    inStock: true,
    isComingSoon: false,
    imageFallback: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'velvet-oud',
    name: 'Velvet Oud',
    tagline: 'Smoky Leather & Royal Agarwood',
    description: 'Commanding and regal. Wild vintage agarwood infused with Kashmir saffron threads, Tuscan leather, and dark cocoa bean resin.',
    price: 420,
    currency: 'AED',
    volume: '100ml / 3.4 fl. oz.',
    glassColor: '#0f0c20',
    liquidColor: '#6c5ce7',
    accentColor: '#a29bfe',
    capColor: '#2d2248',
    bgGradient: 'radial-gradient(circle at 50% 40%, rgba(108, 92, 231, 0.22) 0%, rgba(15, 12, 32, 0.95) 75%)',
    roughness: 0.12,
    transmission: 0.85,
    ior: 1.55,
    scentFamily: 'Smoky Royal Leather',
    notes: {
      top: [
        { id: 'oud-top-1', name: 'Kashmir Saffron', category: 'top', description: 'Golden spicy luxury threads.', origin: 'Kashmir', color: '#f1c40f' }
      ],
      heart: [
        { id: 'oud-heart-1', name: 'Tuscan Leather', category: 'heart', description: 'Supple handcrafted leather accord.', origin: 'Florence, Italy', color: '#8e44ad' }
      ],
      base: [
        { id: 'oud-base-1', name: '25-Year Wild Oud', category: 'base', description: 'Deep resinous aged agarwood.', origin: 'Cambodia', color: '#2c3e50' }
      ]
    },
    craftsmanshipDetails: {
      title: 'Triple-Aged Reserve',
      description: 'Formulated with 25-year aged Cambodian agarwood reserve stored in hand-carved cedar vats.',
      macerationTime: '365 Days',
      concentration: 'Extrait de Parfum (32%)',
      artisan: 'Master Perfumer Tariq Al-Mansoor'
    },
    inStock: false,
    isComingSoon: true,
    imageFallback: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'emerald-vetiver',
    name: 'Emerald Vetiver',
    tagline: 'Rain-soaked Cedar & Wild Moss',
    description: 'Crisp green luxury. Smoky Haitian vetiver root blended with rain-drenched cedar leaves and luminous crushed bergamot.',
    price: 80,
    currency: 'AED',
    volume: '100ml / 3.4 fl. oz.',
    glassColor: '#0a1c14',
    liquidColor: '#00b894',
    accentColor: '#55efc4',
    capColor: '#173628',
    bgGradient: 'radial-gradient(circle at 50% 40%, rgba(0, 184, 148, 0.22) 0%, rgba(10, 28, 20, 0.95) 75%)',
    roughness: 0.08,
    transmission: 0.9,
    ior: 1.51,
    scentFamily: 'Woody Fresh Rain',
    notes: {
      top: [
        { id: 'vet-top-1', name: 'Crushed Bergamot Leaf', category: 'top', description: 'Zesty green foliage zest.', origin: 'Reggio Calabria', color: '#2ecc71' }
      ],
      heart: [
        { id: 'vet-heart-1', name: 'Haitian Vetiver Root', category: 'heart', description: 'Smoky earthy green root energy.', origin: 'Haiti', color: '#16a085' }
      ],
      base: [
        { id: 'vet-base-1', name: 'Oakmoss Absolute', category: 'base', description: 'Deep velvet forest floor moss.', origin: 'Slovenia', color: '#34495e' }
      ]
    },
    craftsmanshipDetails: {
      title: 'Biodynamic Extraction',
      description: 'Sourced from certified organic vetiver roots wild-harvested following lunar tidal cycles.',
      macerationTime: '210 Days',
      concentration: 'Extrait de Parfum (26%)',
      artisan: 'Perfumer Lucian Vance'
    },
    inStock: false,
    isComingSoon: true,
    imageFallback: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80'
  }
];
