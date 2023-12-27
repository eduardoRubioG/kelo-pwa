import { Plates } from '../../types/kelo.interface';

export interface PlateCalculatorState {
  inputWeight: number;
  barWeight: number;
  leftOverAmount: number;
  platesNeeded: Plates;
}
