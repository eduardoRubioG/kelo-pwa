import { UNITS } from '../../consts/kelo.const';

export interface OneRM {
  name: string;
  unit: UNITS;
  weight: number;
}

export interface PercentCalculatorServiceState {
  pinned1RMs: OneRM[];
}
