import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BrandResponseDto {
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  sparePartOnly!: boolean;

  @IsBoolean()
  bicycleOnly!: boolean;
}
