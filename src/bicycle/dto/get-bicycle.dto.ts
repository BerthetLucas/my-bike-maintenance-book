import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetBicycleDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  isMarked!: boolean;
}

export class GetBicycleByIdRequestDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id!: string;
}
