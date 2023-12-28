import { TestBed } from '@angular/core/testing';

import { UnitsService } from './units.service';
import { UNITS } from '../../consts/kelo.const';
import { Plates } from '../../types/kelo.interface';

describe('UnitsService', () => {
  let service: UnitsService;
  let plateAvailability: Plates = {};
  const defaultPlateAvailability = {
    RED: Infinity,
    BLUE: Infinity,
    YELLOW: Infinity,
    GREEN: Infinity,
    TENS: Infinity,
    FIVES: Infinity,
    BISCUIT: Infinity,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    plateAvailability = { ...defaultPlateAvailability };
    service = TestBed.inject(UnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculatePlateCombination | lbs -> lbs', () => {
    beforeEach(() => {
      spyOn(service, 'getOutputUnitPreference').and.returnValue(UNITS.LBS);
      spyOn(service, 'getInputUnitPreference').and.returnValue(UNITS.LBS);
      plateAvailability = { ...defaultPlateAvailability };
    });

    it('should calculate 265lbs with no plate limits', () => {
      const output = service.calculatePlateCombination(
        265,
        45,
        UNITS.LBS,
        plateAvailability
      );
      const plateOutput: Plates = {
        RED: 2,
      };
      expect(output).toEqual({ plates: plateOutput, remainder: 0 });
    });

    it('should calculate 405lbs with no plate limits', () => {
      const output = service.calculatePlateCombination(
        405,
        45,
        UNITS.LBS,
        plateAvailability
      );
      const plateOutput: Plates = {
        RED: 3,
        TENS: 1,
        FIVES: 1,
      };
      expect(output).toEqual({ plates: plateOutput, remainder: 0 });
    });

    it('should calculate 405lbs with no red plates', () => {
      const _limits = { ...plateAvailability, RED: 0 };
      const output = service.calculatePlateCombination(
        405,
        45,
        UNITS.LBS,
        _limits
      );
      const plateOutput: Plates = {
        BLUE: 4,
      };
      expect(output).toEqual({ plates: plateOutput, remainder: 0 });
    });

    it('should calculate 206lbs with no red plates', () => {
      const _limits = { ...plateAvailability, RED: 0 };
      const output = service.calculatePlateCombination(
        206,
        45,
        UNITS.LBS,
        _limits
      );
      const plateOutput: Plates = {
        BLUE: 1,
        YELLOW: 1,
      };
      expect(output).toEqual({ plates: plateOutput, remainder: 1 });
    });
  });

  describe('calculatePlateCombination | kgs -> kgs', () => {
    beforeEach(() => {
      spyOn(service, 'getOutputUnitPreference').and.returnValue(UNITS.KGS);
      spyOn(service, 'getInputUnitPreference').and.returnValue(UNITS.KGS);
      plateAvailability = { ...defaultPlateAvailability };
    });

    it('should calculate 100kg with no plate limits', () => {
      const output = service.calculatePlateCombination(
        100,
        20,
        UNITS.KGS,
        plateAvailability
      );
      const plateOutput: Plates = {
        RED: 1,
        YELLOW: 1,
      };
      expect(output).toEqual({ plates: plateOutput, remainder: 0 });
    });
  });

  describe('calculatePlateCombination | lbs -> kgs', () => {
    beforeEach(() => {
      spyOn(service, 'getOutputUnitPreference').and.returnValue(UNITS.KGS);
      spyOn(service, 'getInputUnitPreference').and.returnValue(UNITS.LBS);
      plateAvailability = { ...defaultPlateAvailability };
    });

    it('should calculate 220lbs with no limits', () => {
      const output = service.calculatePlateCombination(
        220,
        20,
        UNITS.KGS,
        plateAvailability
      );
      const plateOutput: Plates = {
        RED: 1,
        YELLOW: 1,
      };
      expect(output).toEqual({ plates: plateOutput, remainder: 0 });
    });

    it('should calculate 375lbs with no limits', () => {
      const output = service.calculatePlateCombination(
        375,
        20,
        UNITS.KGS,
        plateAvailability
      );
      const plateOutput: Plates = {
        RED: 3,
      };
      expect(output).toEqual({ plates: plateOutput, remainder: 0 });
    });

    it('should calculate 376lbs with no limits', () => {
      const output = service.calculatePlateCombination(
        376,
        20,
        UNITS.KGS,
        plateAvailability
      );
      const plateOutput: Plates = {
        RED: 3,
      };
      expect(output).toEqual({ plates: plateOutput, remainder: 1 });
    });
  });

  // describe('calculatePlateCombination | kgs -> lbs', () => {});
});
