import { BicycleUsage } from 'src/domain/bicycle/bicycle-usage.model';
import { createTireFixtures } from '../../../../test/fixtures/create-tire-fixtures';
import { Warning } from '../warning';

describe('tire', () => {
  describe('Given a winter tire', () => {
    describe('When it reach 5000', () => {
      it('should send an alarm', () => {
        const tire = createTireFixtures({ km: 5000, season: 'winter' });

        expect(tire.getWarnings()).toStrictEqual([
          Warning.of('Remplacer le pneu'),
        ]);
      });
    });
  });

  describe('Given a summer tire', () => {
    describe('When the bike is a VTT with at least 5000km', () => {
      it('should give an alarm', () => {
        const tire = createTireFixtures({
          km: 3000,
          season: 'summer',
          usage: BicycleUsage.VTT,
        });

        expect(tire.getWarnings()).toStrictEqual([
          Warning.of('Remplacer le pneu'),
        ]);
      });
    });

    describe('When the bike is a RoadBike with at least 3000km', () => {
      it('should give an alarm', () => {
        const tire = createTireFixtures({
          km: 5000,
          season: 'summer',
          usage: BicycleUsage.ROAD,
        });

        expect(tire.getWarnings()).toStrictEqual([
          Warning.of('Remplacer le pneu'),
        ]);
      });
    });
  });
});
