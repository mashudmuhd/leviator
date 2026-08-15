import { PerfumeVariant, ProductFilter } from '../types';

export interface IProductRepository {
  getAllVariants(): Promise<PerfumeVariant[]>;
  getVariantById(id: string): Promise<PerfumeVariant | null>;
  getVariantsByFamily(family: string): Promise<PerfumeVariant[]>;
  filterVariants(filter: ProductFilter): Promise<PerfumeVariant[]>;
}
