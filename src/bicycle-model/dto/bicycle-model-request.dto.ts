import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BicycleModelRequestDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id!: string;
}
