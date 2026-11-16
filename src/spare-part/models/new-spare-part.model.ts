export interface NewSparePart {
  type: 'Brake' | 'Chain' | 'Tire';
  mountedAt: Date;
  km: number;
  brandId: string;
  bicycleId: string;
}
