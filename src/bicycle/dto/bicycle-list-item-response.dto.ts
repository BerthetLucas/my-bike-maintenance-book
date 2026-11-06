import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class BicycleListItemResponseDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  isMarked!: boolean;

  @IsString()
  modelName!: string;

  @IsInt()
  km!: number;

  @IsString()
  brandName!: string;
}
