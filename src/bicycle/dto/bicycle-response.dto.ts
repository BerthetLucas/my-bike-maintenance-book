import { SparePartResponseDto } from './spare-part-response.dto';

export class BicycleResponseDto {
  id!: string;
  name!: string;
  isMarked!: boolean;
  modelName!: string;
  km!: number;
  brandName!: string;
  spareParts!: SparePartResponseDto[];
}
