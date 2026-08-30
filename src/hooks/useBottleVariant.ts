import { useMemo } from 'react';
import { useSceneStore } from '../stores/useSceneStore';
import { useProductStore } from '../stores/useProductStore';
import { PerfumeVariant } from '../types';

export function useBottleVariant() {
  const activeVariantId = useSceneStore((state) => state.activeVariantId);
  const setActiveVariantId = useSceneStore((state) => state.setActiveVariantId);
  const variants = useProductStore((state) => state.variants);

  const activeVariant = useMemo<PerfumeVariant>(() => {
    return (
      variants.find((v) => v.id === activeVariantId) || variants[0]
    );
  }, [activeVariantId, variants]);

  return {
    activeVariant,
    variants,
    setVariantId: setActiveVariantId,
  };
}
