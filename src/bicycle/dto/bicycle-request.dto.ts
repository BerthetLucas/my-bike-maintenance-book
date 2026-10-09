import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BicycleRequestDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id!: string;
}
