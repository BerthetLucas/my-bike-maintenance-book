import { Body, Controller, Delete, Param } from '@nestjs/common';
import { DeleteSparePartUseCase } from '../usecases/delete-spare-part.usecase';

@Controller('spare-parts')
export class DeleteSparePartController {
  constructor(private readonly usecase: DeleteSparePartUseCase) {}

  @Delete()
  async delete(@Param() id: string): Promise<void> {
    await this.usecase.execute(id);
  }
}
