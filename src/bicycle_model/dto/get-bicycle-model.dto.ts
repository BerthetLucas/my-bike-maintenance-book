import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BicycleModelDto {
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class GetBicycleModelByIdRequestDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id!: string;
}
