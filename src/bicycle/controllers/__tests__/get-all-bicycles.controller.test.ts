import { Test } from '@nestjs/testing';
import { BicycleMapper } from 'src/bicycle/bicycle.mapper';
import { GetAllBicyclesUseCase } from 'src/bicycle/usecases/get-all-bicycles.usecase';
import { GetAllBicycleController } from '../get-all-bicycles.controller';
import { vi } from 'vitest';
import { Bicycle } from 'src/bicycle/bicycle.model';

describe('GetBicycleController', () => {
  let controller: GetAllBicycleController;
  const usecase = { execute: vi.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [GetAllBicycleController],
      providers: [
        { provide: GetAllBicyclesUseCase, useValue: usecase },
        BicycleMapper,
      ],
    }).compile();

    controller = module.get(GetAllBicycleController);
  });

  describe('when find all method is called', () => {
    it('should return a list of bicycles', async () => {
      const result = [
        {
          name: 'test',
          isMarked: false,
          id: '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94',
        },
        {
          name: 'c7e2d915-4a38-4b6f-8e1a-2f9d03b7c5a8',
          isMarked: true,
          id: 'test2',
        },
      ] as Bicycle[];

      usecase.execute.mockResolvedValue(result);

      expect(await controller.getAllBicycles()).toStrictEqual(result);
    });
  });
});
