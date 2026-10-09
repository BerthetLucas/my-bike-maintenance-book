import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetBrandResponseDto {
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
