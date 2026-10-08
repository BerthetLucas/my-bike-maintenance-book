import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateNewBrandRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  sparePartOnly!: boolean;

  @IsBoolean()
  bicycleOnly!: boolean;
}
