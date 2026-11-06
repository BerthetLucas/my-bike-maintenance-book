import { BicycleUsage } from 'src/domain/bicycle/bicycle-usage.model';
import { createChainFixture } from '../../../../test/fixtures/create-chain-fixtures';
import { Warning } from '../warning';

describe('chain', () => {
  describe('Given a VTT', () => {
    describe('When the chain count more than 2000 km', () => {
      it('should get a warning', () => {
        const chain = createChainFixture({ km: 2001, usage: BicycleUsage.VTT });
        expect(chain.getWarnings()).toStrictEqual([
          Warning.of('Remplacer la chaîne'),
        ]);
      });
    });

    describe('When the chain has 75% of max km up to 2000km', () => {
      it('should send a warning to check the chain', () => {
        const chain = createChainFixture({ km: 2000, usage: BicycleUsage.VTT });
        expect(chain.getWarnings()).toStrictEqual([
          Warning.of('Vérifier la chaîne'),
        ]);
      });
    });

    describe('When the chain has less of 75% of max km', () => {
      it('should not send warning or alarm', () => {
        const chain = createChainFixture({ km: 1499, usage: BicycleUsage.VTT });
        expect(chain.getWarnings()).toStrictEqual([]);
      });
    });
  });

  describe('Given a Road bike', () => {
    describe('When the chain count more than 3500 km', () => {
      it('should get a warning', () => {
        const chain = createChainFixture({
          km: 3501,
          usage: BicycleUsage.ROAD,
        });
        expect(chain.getWarnings()).toStrictEqual([
          Warning.of('Remplacer la chaîne'),
        ]);
      });
    });

    describe('When the chain has 75% of max km up to 3500km', () => {
      it('should send a warning to check the chain', () => {
        const chain = createChainFixture({
          km: 3500,
          usage: BicycleUsage.ROAD,
        });
        expect(chain.getWarnings()).toStrictEqual([
          Warning.of('Vérifier la chaîne'),
        ]);
      });
    });

    describe('When the chain has less of 75% of max km', () => {
      it('should not send warning or alarm', () => {
        const chain = createChainFixture({
          km: 2500,
          usage: BicycleUsage.ROAD,
        });
        expect(chain.getWarnings()).toStrictEqual([]);
      });
    });
  });
});
