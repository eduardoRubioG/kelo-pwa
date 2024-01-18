import { UNITS } from '../consts/kelo.const';

export interface NavRoutes {
  path: string;
  label: string;
}

export type Plates = {
  [key: string]: number;
};

export type Bar = {
  weight: number;
  unit: UNITS;
};

export type SelectableItem<T> = {
  label: string;
  value: T;
};
