import { Pipe, PipeTransform } from '@angular/core';
import {
  PLATE_WEIGHTS_KGS,
  PLATE_WEIGHTS_LBS,
  UNITS,
} from '../../consts/kelo.const';

@Pipe({
  name: 'plateKeyDisplay',
  standalone: true,
})
export class PlateKeyDisplayPipe implements PipeTransform {
  transform(plateKey: string, unitPreference: UNITS | null): number {
    if (unitPreference !== UNITS.KGS && unitPreference !== UNITS.LBS) {
      console.error('PlatKeyDisplayPipe: Invalid unit preference');
      return -1; // something went wrong lol
    }

    if (unitPreference === UNITS.LBS) {
      return PLATE_WEIGHTS_LBS[plateKey];
    }
    return PLATE_WEIGHTS_KGS[plateKey];
  }
}
