import { createTireFixtures } from '@test/fixtures/create-tire-fixtures';
import { createBicycleFixtures } from '@test/fixtures/create-bicycle-fixtures';
import { createBrakeFixtures } from '@test/fixtures/create-brake-fixtures';
import { createChainFixture } from '@test/fixtures/create-chain-fixtures';
import { SparePartsInconsistencyError } from '../spare-parts-inconsistency.error';

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

  describe('When I mount different kinds of parts on an empty bicycle', () => {
    it('should mount all of them', () => {
      const bicycle = createBicycleFixtures();
      const brake = createBrakeFixtures();
      const chain = createChainFixture();

      bicycle.mountSparePart([brake, chain]);

      expect(bicycle.getSpareParts()).toEqual(
        expect.arrayContaining([brake, chain]),
      );
    });
  });

  describe('When the bicycle already has 2 tires', () => {
    it('should not be able to mount a third one', () => {
      const firstTire = createTireFixtures();
      const secondTire = createTireFixtures();
      const thirdTire = createTireFixtures();

      const bicycle = createBicycleFixtures({
        spareParts: [firstTire, secondTire],
      });

      expect(() => bicycle.mountSparePart([thirdTire])).toThrow(
        SparePartsInconsistencyError,
      );
    });

    it('should still be able to mount a chain', () => {
      const bicycle = createBicycleFixtures({
        spareParts: [createTireFixtures(), createTireFixtures()],
      });

      expect(() =>
        bicycle.mountSparePart([createChainFixture()]),
      ).not.toThrow();
    });
  });

  describe('When the bicycle already has 2 brakes', () => {
    it('should not be able to mount a third one', () => {
      const firstBrake = createBrakeFixtures();
      const secondBrake = createBrakeFixtures();
      const thirdBrake = createBrakeFixtures();

      const bicycle = createBicycleFixtures({
        spareParts: [firstBrake, secondBrake],
      });

      expect(() => bicycle.mountSparePart([thirdBrake])).toThrow(
        SparePartsInconsistencyError,
      );
    });
  });

  describe('When I mount 3 brakes at once on an empty bicycle', () => {
    it('should refuse them', () => {
      const bicycle = createBicycleFixtures();

      expect(() =>
        bicycle.mountSparePart([
          createBrakeFixtures(),
          createBrakeFixtures(),
          createBrakeFixtures(),
        ]),
      ).toThrow(SparePartsInconsistencyError);
    });
  });

  describe('When the bicycle has a chain mounted', () => {
    it('should not be able to mount another one', () => {
      const firstChain = createChainFixture();
      const secondChain = createChainFixture();

      const bicycle = createBicycleFixtures({
        spareParts: [firstChain],
      });

      expect(() => bicycle.mountSparePart([secondChain])).toThrow(
        SparePartsInconsistencyError,
      );
    });
  });

  describe('When I mount 2 chains at once on an empty bicycle', () => {
    it('should refuse them', () => {
      const bicycle = createBicycleFixtures();

      expect(() =>
        bicycle.mountSparePart([createChainFixture(), createChainFixture()]),
      ).toThrow(SparePartsInconsistencyError);
    });
  });
});
