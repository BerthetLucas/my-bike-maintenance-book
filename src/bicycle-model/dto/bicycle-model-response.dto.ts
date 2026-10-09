import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BicycleModelResponseDto {
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  brandName!: string;
}
