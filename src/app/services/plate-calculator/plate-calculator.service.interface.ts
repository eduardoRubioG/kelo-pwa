import { UNITS } from '../../consts/kelo.const';
import { Plates } from '../../types/kelo.interface';

export interface PlateCalculatorState {
  inputWeight: number;
  barWeight: number;
  remainder: number;
  platesNeeded: Plates;
  availability: Plates;
  barUnit: UNITS;
}
