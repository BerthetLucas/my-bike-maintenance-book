import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BICYCLE_USAGES, type Usage } from 'src/domain/bicycle/bicycle-usage';

export class CreateBicycleModelDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsUUID()
  brandId!: string;

  @IsIn(BICYCLE_USAGES)
  usage!: Usage;
}
