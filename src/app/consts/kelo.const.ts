import { Plates } from '../types/kelo.interface';

export const APP_ROUTES = {
  PLATE_CALC: '/plate-calculator',
  RPE_CALC: '/rpe-calculator',
};

export const STORE_KEYS = {
  UNIT_INPUT: 'unit-input',
  UNIT_OUTPUT: 'unit-output',
};

export enum UNITS {
  LBS,
  KGS,
}

export const PLATE_WEIGHTS_LBS: Plates = {
  RED: 55,
  BLUE: 45,
  YELLOW: 35,
  GREEN: 25,
  TENS: 10,
  FIVES: 5,
  BISCUIT: 2.5,
};

export const PLATE_WEIGHTS_KGS: Plates = {
  RED: 25,
  BLUE: 20,
  YELLOW: 15,
  GREEN: 10,
  TENS: 5,
  FIVES: 2.5,
  BISCUIT: 1,
};

export const PLATE_COLOR_MAP: Record<string, string> = {
  RED: '#E95151',
  BLUE: '#419EF5',
  YELLOW: '#EEE853',
  GREEN: '#61B054',
  TENS: '#2A2424',
  FIVES: '#E95151',
  BISCUIT: '#61B054',
  DEFAULT: '#2A2424',
};
