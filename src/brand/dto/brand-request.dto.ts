import { IsUUID } from 'class-validator';

export class BrandRequestDto {
  @IsUUID()
  id!: string;
}
