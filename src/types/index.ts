export interface OlfactoryNote {
  id: string;
  name: string;
  category: 'top' | 'heart' | 'base';
  description: string;
  origin: string;
  color: string;
  iconName?: string;
}

export interface PerfumeVariant {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  volume: string;
  glassColor: string;
  liquidColor: string;
  accentColor: string;
  capColor: string;
  bgGradient: string;
  roughness: number;
  transmission: number;
  ior: number;
  scentFamily: string;
  notes: {
    top: OlfactoryNote[];
    heart: OlfactoryNote[];
    base: OlfactoryNote[];
  };
  craftsmanshipDetails: {
    title: string;
    description: string;
    macerationTime: string;
    concentration: string;
    artisan: string;
  };
  inStock: boolean;
  isComingSoon?: boolean;
  imageFallback: string;
}

export interface SectionProps {
  id: string;
  activeVariant: PerfumeVariant;
  onVariantChange?: (variant: PerfumeVariant) => void;
  isFallbackMode?: boolean;
}

export interface CartItem {
  id: string;
  variant: PerfumeVariant;
  quantity: number;
  selectedVolume: string;
  unitPrice: number;
}

export interface SceneState {
  activeVariantId: string;
  activeSectionIndex: number;
  isCanvasLoaded: boolean;
  isReducedMotion: boolean;
  mousePosition: { x: number; y: number };
  setMousePosition: (x: number, y: number) => void;
  setActiveVariantId: (id: string) => void;
  setActiveSectionIndex: (index: number) => void;
  setCanvasLoaded: (loaded: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
}

export interface ProductFilter {
  scentFamily?: string;
  priceRange?: [number, number];
  searchQuery?: string;
}
