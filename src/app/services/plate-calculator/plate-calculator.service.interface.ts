import { UNITS } from '../../consts/kelo.const';
import { Plates, SelectableItem } from '../../types/kelo.interface';

export interface PlateCalculatorState {
  inputWeight: number;
  barWeight: number;
  remainder: number;
  platesNeeded: Plates;
  availability: Plates;
  barUnit: UNITS;
  barOptions: SelectableItem<{ weight: number; unit: UNITS }>[];
}
