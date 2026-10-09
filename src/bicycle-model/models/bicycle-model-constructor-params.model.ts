import { Brand } from '../../brand/models/brand.model';

export interface BicycleModelConstructorParams {
  id: string;
  name: string;
  brand: Brand;
}
