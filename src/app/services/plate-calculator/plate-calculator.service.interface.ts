import { Bar, Plates, SelectableItem } from '../../types/kelo.interface';

export interface PlateCalculatorState {
  inputWeight: number;
  remainder: number;
  platesNeeded: Plates;
  availability: Plates;
  currentBar: Bar;
  barOptions: SelectableItem<Bar>[];
}
