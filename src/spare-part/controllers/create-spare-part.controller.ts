import { Body, Controller, Post } from '@nestjs/common';
import { CreateSparePartDto } from '../dto/create-spare-part.dto';
import { CreateSparePartUseCase } from '../usecases/create-spare-part.usecase';
import { CreateSparePartMapper } from '../mappers/create-spare-part.mapper';

@Controller('spare-parts')
export class CreateSparePartController {
  constructor(
    private readonly usecase: CreateSparePartUseCase,
    private readonly mapper: CreateSparePartMapper,
  ) {}

  @Post()
  async create(@Body() createSparePartDto: CreateSparePartDto): Promise<void> {
    const newSparePart = this.mapper.fromDto(createSparePartDto);

    await this.usecase.execute(newSparePart);
  }
}
