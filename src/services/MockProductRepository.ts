import { IProductRepository } from './IProductRepository';
import { PerfumeVariant, ProductFilter } from '../types';
import { PERFUME_VARIANTS } from '../data/perfumeVariants';

export class MockProductRepository implements IProductRepository {
  private variants: PerfumeVariant[] = PERFUME_VARIANTS;

  async getAllVariants(): Promise<PerfumeVariant[]> {
    return Promise.resolve([...this.variants]);
  }

  async getVariantById(id: string): Promise<PerfumeVariant | null> {
    const variant = this.variants.find((v) => v.id === id);
    return Promise.resolve(variant || null);
  }

  async getVariantsByFamily(family: string): Promise<PerfumeVariant[]> {
    const filtered = this.variants.filter(
      (v) => v.scentFamily.toLowerCase().includes(family.toLowerCase())
    );
    return Promise.resolve(filtered);
  }

  async filterVariants(filter: ProductFilter): Promise<PerfumeVariant[]> {
    let result = [...this.variants];

    if (filter.scentFamily) {
      result = result.filter((v) =>
        v.scentFamily.toLowerCase().includes(filter.scentFamily!.toLowerCase())
      );
    }

    if (filter.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tagline.toLowerCase().includes(q)
      );
    }

    if (filter.priceRange) {
      const [min, max] = filter.priceRange;
      result = result.filter((v) => v.price >= min && v.price <= max);
    }

    return Promise.resolve(result);
  }
}

export const productRepository = new MockProductRepository();
