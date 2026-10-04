import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBicycleModelDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsUUID()
  brandId!: string;
}
