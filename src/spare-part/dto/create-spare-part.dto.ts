import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateSparePartDto {
  @IsIn(['Brake', 'Chain', 'Tire'])
  type!: 'Brake' | 'Chain' | 'Tire';

  @IsDateString()
  mountedAt!: string;

  @IsInt()
  @Min(0)
  km!: number;

  @IsUUID()
  @IsNotEmpty()
  brandId!: string;

  @IsUUID()
  @IsNotEmpty()
  bicycleId!: string;
}
