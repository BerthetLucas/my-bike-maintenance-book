import { createTireFixtures } from '../../../../test/fixtures/create-tire-fixtures';
import { createBicycleFixtures } from '../../../../test/fixtures/create-bicycle-fixtures';

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
});
