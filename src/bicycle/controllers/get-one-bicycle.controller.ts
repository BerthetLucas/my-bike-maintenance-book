import { Controller, Get, Param } from '@nestjs/common';
import { BicycleRequestDto } from '../dto/bicycle-request.dto';
import { GetBicycleUseCase } from '../usecases/get-bicycle.usecase';
import { BicycleMapper } from '../mappers/bicycle.mapper';
import { BicycleResponseDto } from '../dto/bicycle-response.dto';

@Controller('bicycles')
export class GetOneBicycleController {
  constructor(
    private readonly getBicycleUseCase: GetBicycleUseCase,
    private readonly bicyclemapper: BicycleMapper,
  ) {}

  @Get(':id')
  async getOneBicycle(
    @Param() getBicycleDto: BicycleRequestDto,
  ): Promise<BicycleResponseDto> {
    const id = this.bicyclemapper.fromDto(getBicycleDto);

    const bicycle = await this.getBicycleUseCase.execute(id);

    return this.bicyclemapper.toDto(bicycle);
  }
}
