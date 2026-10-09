import { IsString, IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class BicycleResponseDto {
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

  @IsString()
  brandName!: string;
}
