import { IsUUID } from 'class-validator';

export class GetBrandRequestDto {
  @IsUUID()
  id!: string;
}
