import { Body, Controller, Post, Param } from '@nestjs/common';
import { BicycleRequestDto } from '../dto/bicycle-request.dto';
import { MountSparePartsDto } from '../dto/mount-spare-part.dto';
import { MountSparePartUseCase } from '../usecases/mount-spare-part.usecase';

@Controller('bicycles')
export class MountSparePartsController {
  constructor(private readonly mountSparePartUseCase: MountSparePartUseCase) {}

  @Post(':id/spare-parts')
  async mount(
    @Param() { id }: BicycleRequestDto,
    @Body() mountSparePartDto: MountSparePartsDto,
  ): Promise<void> {
    await this.mountSparePartUseCase.execute(id, mountSparePartDto.spareParts);
  }
}
