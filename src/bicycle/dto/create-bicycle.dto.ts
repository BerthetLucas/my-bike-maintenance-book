import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBicycleDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  isMarked!: boolean;

  @IsUUID()
  @IsNotEmpty()
  modelId!: string;
}
