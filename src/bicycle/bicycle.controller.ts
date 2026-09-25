import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateBicycleUseCase } from './usecases/create-bicycle.usecase';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { GetBicycleByIdRequestDto, GetBicycleDto } from './dto/get-bicycle.dto';
import { GetAllBicyclesUseCase } from './usecases/get-all-bicycles.usecase';
import { fromBicycleToGetBicycleDto } from './bicycle.mapper';
import { GetBicycleUseCase } from './usecases/get-bicycle.usecase';

// REST Convention : plural
@Controller('bicycles')
export class BicycleController {
  constructor(
    private readonly createBicycleUseCase: CreateBicycleUseCase,
    private readonly getAllBicyclesUseCase: GetAllBicyclesUseCase,
    private readonly getBicycleUseCase: GetBicycleUseCase,
  ) {}

  @Post()
  async createBicycle(
    @Body() createBicycleDto: CreateBicycleDto,
  ): Promise<void> {
    await this.createBicycleUseCase.execute(createBicycleDto);
  }

  @Get()
  async getAllBicycle(): Promise<GetBicycleDto[]> {
    const bicycles = await this.getAllBicyclesUseCase.execute();

    return bicycles.map(fromBicycleToGetBicycleDto);
  }

  @Get(':id')
  async getOneBicycle(
    @Param() getBicycleDto: GetBicycleByIdRequestDto,
  ): Promise<GetBicycleDto> {
    const bicycle = await this.getBicycleUseCase.execute(getBicycleDto);

    return fromBicycleToGetBicycleDto(bicycle);
  }
}
