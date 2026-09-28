import { vi } from 'vitest';
import { GetBicycleUseCase } from '../get-bicycle.usecase';
import { Test } from '@nestjs/testing';
import { BicycleRepository } from 'src/bicycle/bicycle.repository';
import { GetBicycleByIdRequestDto } from 'src/bicycle/dto/get-bicycle.dto';
import { Bicycle } from 'src/bicycle/bicycle.model';

describe('GetBicycleUseCase', () => {
  let usecase: GetBicycleUseCase;
  const repository = { getById: vi.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: BicycleRepository, useValue: repository },
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

      const arg =
        '3f8a1c62-9b47-4e0d-a5c3-71d2e8f60b94' as unknown as GetBicycleByIdRequestDto;

      repository.getById.mockResolvedValue(bike);

      expect(await usecase.execute(arg)).toStrictEqual(bike);
    });
  });
});
