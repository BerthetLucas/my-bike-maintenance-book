import { Controller, Get, Param } from '@nestjs/common';
import { BicycleMapper } from '../bicycle.mapper';

import {
  GetBicycleDto,
  GetBicycleByIdRequestDto,
} from '../dto/get-bicycle.dto';
import { GetBicycleUseCase } from '../usecases/get-bicycle.usecase';

@Controller('bicycles')
export class GetOneBicycleController {
  constructor(
    private readonly getBicycleUseCase: GetBicycleUseCase,
    private readonly bicyclemapper: BicycleMapper,
  ) {}

  @Get(':id')
  async getOneBicycle(
    @Param() getBicycleDto: GetBicycleByIdRequestDto,
  ): Promise<GetBicycleDto> {
    const bicycle = await this.getBicycleUseCase.execute(getBicycleDto);

    return this.bicyclemapper.toDto(bicycle);
  }
}
