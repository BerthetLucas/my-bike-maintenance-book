import { Body, Controller, Post, Param } from '@nestjs/common';
import { BicycleRequestDto } from '../dto/bicycle-request.dto';
import { MountSparePartsDto } from '../dto/mount-spare-part.dto';
import { MountSparePartUseCase } from '../usecases/mount-spare-part.usecase';
import { MountSparePartMapper } from '../mappers/mount-spare-part.mapper';

@Controller('bicycles')
export class MountSparePartsController {
  constructor(
    private readonly mountSparePartUseCase: MountSparePartUseCase,
    private readonly mapper: MountSparePartMapper,
  ) {}

  @Post(':id/spare-parts')
  async mount(
    @Param() { id }: BicycleRequestDto,
    @Body() mountSparePartDto: MountSparePartsDto,
  ): Promise<void> {
    const spareParts = mountSparePartDto.spareParts.map((s) =>
      this.mapper.fromDto(s),
    );

    await this.mountSparePartUseCase.execute(id, spareParts);
  }
}
