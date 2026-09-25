import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateBicycleDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  isMarked!: boolean;
}
