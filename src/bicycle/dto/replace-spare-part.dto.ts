import {
  IsIn,
  IsUUID,
  IsInt,
  Min,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class ReplaceSparePartDto {
  @IsIn(['Brake', 'Chain', 'Tire'])
  type!: 'Brake' | 'Chain' | 'Tire';

  @IsUUID()
  brandId!: string;

  @IsInt()
  @Min(0)
  km!: number;

  @IsDateString()
  mountedAt!: string;

  @IsOptional()
  @IsIn(['summer', 'winter'])
  season?: 'summer' | 'winter';

  @IsOptional()
  @IsInt()
  recommendedPressure?: number;
}
