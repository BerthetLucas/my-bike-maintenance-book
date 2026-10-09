import { Test } from '@nestjs/testing';
import { GetOneBicycleController } from '../get-one-bicycle.controller';
import { vi } from 'vitest';
import { GetBicycleUseCase } from 'src/bicycle/usecases/get-bicycle.usecase';
import { BicycleRequestDto } from 'src/bicycle/dto/bicycle-request.dto';
import { BicycleResponseDto } from 'src/bicycle/dto/bicycle-response.dto';
import { BicycleMapper } from 'src/bicycle/mappers/bicycle.mapper';

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
      const bicycle = {
        id: '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94',
        name: 'myBike',
        isMarked: true,
      };

      const brand = {
        id: '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94',
        name: 'my-brand',
      };

      const model = {
        id: '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94',
        name: 'my-model',
      };

      const reponse = {
        id: '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94',
        name: 'myBike',
        isMarked: true,
        modelName: 'my-model',
        brandName: 'my-brand',
      } as BicycleResponseDto;

      const param =
        '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94' as unknown as BicycleRequestDto;

      usecase.execute.mockResolvedValue({ bicycle, model, brand });

      expect(await controller.getOneBicycle(param)).toStrictEqual(reponse);
    });
  });
});
