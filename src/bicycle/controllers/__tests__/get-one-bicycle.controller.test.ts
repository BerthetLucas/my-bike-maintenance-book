import { Test } from '@nestjs/testing';
import { GetOneBicycleController } from '../get-one-bicycle.controller';
import { vi } from 'vitest';
import { GetBicycleUseCase } from 'src/bicycle/usecases/get-bicycle.usecase';
import { BicycleWithModel } from 'src/bicycle/bicycle.model';
import { BicycleMapper } from 'src/bicycle/bicycle.mapper';
import { GetBicycleByIdRequestDto } from 'src/bicycle/dto/get-bicycle.dto';

describe('GetOneBicycleController', () => {
  let controller: GetOneBicycleController;
  const usecase = { execute: vi.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: GetBicycleUseCase, useValue: usecase },
        BicycleMapper,
      ],
      controllers: [GetOneBicycleController],
    }).compile();

    controller = module.get(GetOneBicycleController);
  });

  describe('When the user ask for a valid bike id', () => {
    it('should return the wanted bike informations', async () => {
      const bike = {
        id: '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94',
        name: 'myBike',
        isMarked: true,
        modelId: 'my-id',
        modelName: 'my-name',
      } as BicycleWithModel;

      const param =
        '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94' as unknown as GetBicycleByIdRequestDto;

      usecase.execute.mockResolvedValue(bike);

      expect(await controller.getOneBicycle(param)).toStrictEqual(bike);
    });
  });
});
