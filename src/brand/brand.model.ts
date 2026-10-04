import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNewBrandRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  sparePartOnly!: boolean;

  @IsBoolean()
  bicycleOnly!: boolean;
}

export class GetBrandResquestDto {
  @IsUUID()
  id!: string;
}

export class GetBrandResponseDto {
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  sparePartOnly!: boolean;

  @IsBoolean()
  bicycleOnly!: boolean;
}

export interface Brand {
  id: string;
  name: string;
  sparePartOnly: boolean;
  bicycleOnly: boolean;
}

export interface NewBrand {
  name: string;
  sparePartOnly: boolean;
  bicycleOnly: boolean;
}
