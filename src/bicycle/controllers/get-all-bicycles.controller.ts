import { Controller, Get } from '@nestjs/common';
import { GetAllBicyclesUseCase } from '../usecases/get-all-bicycles.usecase';
import { BicycleResponseDto } from '../dto/bicycle-response.dto';
import { BicycleMapper } from '../mappers/bicycle.mapper';

@Controller('bicycles')
export class GetAllBicycleController {
  constructor(
    private readonly getAllBicyclesUseCase: GetAllBicyclesUseCase,
    private readonly bicycleMapper: BicycleMapper,
  ) {}

  @Get()
  async getAllBicycles(): Promise<BicycleResponseDto[]> {
    const bicycles = await this.getAllBicyclesUseCase.execute();

    return bicycles.map((bicycle) => this.bicycleMapper.toDto(bicycle));
  }
}
