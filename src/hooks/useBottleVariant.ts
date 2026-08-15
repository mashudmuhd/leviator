import { useMemo } from 'react';
import { useSceneStore } from '../stores/useSceneStore';
import { PERFUME_VARIANTS } from '../data/perfumeVariants';
import { PerfumeVariant } from '../types';

export function useBottleVariant() {
  const activeVariantId = useSceneStore((state) => state.activeVariantId);
  const setActiveVariantId = useSceneStore((state) => state.setActiveVariantId);

  const activeVariant = useMemo<PerfumeVariant>(() => {
    return (
      PERFUME_VARIANTS.find((v) => v.id === activeVariantId) || PERFUME_VARIANTS[0]
    );
  }, [activeVariantId]);

  return {
    activeVariant,
    variants: PERFUME_VARIANTS,
    setVariantId: setActiveVariantId,
  };
}
