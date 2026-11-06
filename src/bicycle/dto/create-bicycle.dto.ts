import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateBicycleDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  km!: number;

  @IsBoolean()
  isMarked!: boolean;

  @IsUUID()
  @IsNotEmpty()
  modelId!: string;
}
