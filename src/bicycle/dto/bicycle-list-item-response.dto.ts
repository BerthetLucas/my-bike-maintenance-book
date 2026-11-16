import { Warning } from 'src/domain/spare-part/warning';

export class BicycleListItemResponseDto {
  id!: string;
  name!: string;
  isMarked!: boolean;
  modelName!: string;
  km!: number;
  brandName!: string;
  warnings!: Warning[];
}
