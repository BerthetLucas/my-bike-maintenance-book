import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class SparePartRequestDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  sparePartId!: string;
}
