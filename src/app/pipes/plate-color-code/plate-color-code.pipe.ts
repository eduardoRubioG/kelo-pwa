import { Pipe, PipeTransform } from '@angular/core';
import { PLATE_COLOR_MAP } from '../../consts/kelo.const';

@Pipe({
  name: 'plateColorCode',
  standalone: true,
})
export class PlateColorCodePipe implements PipeTransform {
  private readonly DEFAULT_KEY = 'DEFAULT';
  transform(plateKey: string): string {
    if (!plateKey) {
      return PLATE_COLOR_MAP[this.DEFAULT_KEY];
    }
    return PLATE_COLOR_MAP[plateKey] || PLATE_COLOR_MAP[this.DEFAULT_KEY];
  }
}
