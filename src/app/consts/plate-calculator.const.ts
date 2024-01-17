import { Bar, SelectableItem } from '../types/kelo.interface';
import { UNITS } from './kelo.const';

export const DefaultBarSelectOptions: SelectableItem<Bar>[] = [
  {
    label: 'Standard - 45lbs',
    value: { weight: 45, unit: UNITS.LBS },
  },
  {
    label: 'Standard - 20kgs',
    value: { weight: 20, unit: UNITS.KGS },
  },
  {
    label: 'Machine - No Weight',
    value: { weight: 0, unit: UNITS.LBS },
  },
];
