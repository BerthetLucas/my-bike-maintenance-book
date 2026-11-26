import { Type } from 'class-transformer';
import {
  IsIn,
  IsUUID,
  IsInt,
  Min,
  IsDateString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

export class MountSparePartDto {
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

export class MountSparePartsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MountSparePartDto)
  spareParts!: MountSparePartDto[];
}
