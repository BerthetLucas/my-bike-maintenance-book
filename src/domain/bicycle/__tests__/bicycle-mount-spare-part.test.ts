import { createTireFixtures } from '../../../../test/fixtures/create-tire-fixtures';
import { createBicycleFixtures } from '../../../../test/fixtures/create-bicycle-fixtures';
import { createBrakeFixtures } from '../../../../test/fixtures/create-brake-fixtures';
import { createChainFixture } from '../../../../test/fixtures/create-chain-fixtures';

describe('Mount Spare Part on a bicycle', () => {
  describe('When I mount a tire', () => {
    it('should show a tire in the spare part list', () => {
      const bicycle = createBicycleFixtures();
      const tire = createTireFixtures();

      bicycle.mountSparePart([tire]);

      const sparePartList = bicycle.getSpareParts();

      expect(sparePartList).toContain(tire);
    });
  });

  describe('When the bicycle allready have 2 tires', () => {
    it('should not be able to mount a third one', () => {
      const firstTire = createTireFixtures();
      const secondTire = createTireFixtures();
      const thirdTire = createTireFixtures();

      const bicycle = createBicycleFixtures({
        spareParts: [firstTire, secondTire],
      });

      expect(() => bicycle.mountSparePart([thirdTire])).toThrow(
        "A bicycle can't have more than two tires",
      );
    });
  });

  describe('When the biycle allready have 2 brakes', () => {
    it('should not be able to mount a third one', () => {
      const firstBrake = createBrakeFixtures();
      const secondBrake = createBrakeFixtures();
      const thirdBrake = createBrakeFixtures();

      const bicycle = createBicycleFixtures({
        spareParts: [firstBrake, secondBrake],
      });

      expect(() => bicycle.mountSparePart([thirdBrake])).toThrow(
        "A bicycle can't have more than two brakes",
      );
    });
  });

  describe('When the biycle have a chain mounted', () => {
    it('should not be able to mount another one', () => {
      const firstChain = createChainFixture();
      const secondChain = createChainFixture();

      const bicycle = createBicycleFixtures({
        spareParts: [firstChain],
      });

      expect(() => bicycle.mountSparePart([secondChain])).toThrow(
        'A bicycle can only contain one unit of these parts',
      );
    });
  });
});
