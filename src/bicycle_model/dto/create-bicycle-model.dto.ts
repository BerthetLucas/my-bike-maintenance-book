import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBicycleModelDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
