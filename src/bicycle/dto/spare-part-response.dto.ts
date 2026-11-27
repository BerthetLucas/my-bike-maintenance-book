import { Warning } from 'src/domain/spare-part/warning';

export class SparePartResponseDto {
  id!: string;
  type!: 'Tire' | 'Chain' | 'Brake';
  km!: number;
  mountedAt!: Date;
  brandName!: string;
  warnings!: Warning[];
}
