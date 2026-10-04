import { vi } from 'vitest';
import { GetBicycleUseCase } from '../get-bicycle.usecase';
import { Test } from '@nestjs/testing';
import { BicycleRepository } from 'src/bicycle/bicycle.repository';
import { Bicycle } from 'src/bicycle/bicycle.model';
import { BicycleModelRepository } from 'src/bicycle_model/bicycle_model.repository';

describe('GetBicycleUseCase', () => {
  let usecase: GetBicycleUseCase;
  const bicycleRepository = { getById: vi.fn() };
  const modelRepository = { getById: vi.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: BicycleRepository, useValue: bicycleRepository },
        { provide: BicycleModelRepository, useValue: modelRepository },
        GetBicycleUseCase,
      ],
    }).compile();

    usecase = module.get(GetBicycleUseCase);
  });

  describe('When the usecase is executed with a valide bike id', () => {
    it("should return the bike's information", async () => {
      const bike = {
        id: '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94',
        name: 'myBike',
        isMarked: true,
      } as Bicycle;

      const model = {
        name: 'model-name',
        id: 'model-id',
      };

      bicycleRepository.getById.mockResolvedValue(bike);
      modelRepository.getById.mockResolvedValue(model);

      const result = {
        id: '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94',
        name: 'myBike',
        isMarked: true,
        modelName: 'model-name',
        modelId: 'model-id',
      };

      const arg = '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94';

      expect(await usecase.execute(arg)).toStrictEqual(result);
    });
  });
});
