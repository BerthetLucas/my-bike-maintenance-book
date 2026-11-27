import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class AddKmDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  km!: number;
}
