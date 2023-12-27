import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plates } from '../../types/kelo.interface';
import { UnitsService } from '../../services/units/units.service';
import { PlateKeyDisplayPipe } from '../../pipes/plate-key-display/plate-key-display.pipe';
import { Observable } from 'rxjs';
import { UNITS } from '../../consts/kelo.const';
import { PlateColorCodePipe } from '../../pipes/plate-color-code/plate-color-code.pipe';

@Component({
  selector: 'kelo-plate',
  standalone: true,
  imports: [CommonModule, PlateKeyDisplayPipe, PlateColorCodePipe],
  templateUrl: './plate.component.html',
})
export class PlateComponent {
  @Input() plateKey: string = '';
  @Input() plateCount: number = 0;

  public unitPreference: Observable<UNITS> = new Observable();
  readonly UNITS = UNITS;

  constructor(private readonly unitsService: UnitsService) {}

  ngOnInit(): void {
    this.unitPreference = this.unitsService.getOutputUnitPreference$;
  }
}
