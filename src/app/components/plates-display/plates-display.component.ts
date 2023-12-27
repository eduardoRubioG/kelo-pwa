import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { Plates } from '../../types/kelo.interface';
import { PlateComponent } from '../plate/plate.component';
import { UnitsService } from '../../services/units/units.service';
import { Observable } from 'rxjs';
import { UNITS } from '../../consts/kelo.const';
import { PlateCalculatorService } from '../../services/plate-calculator/plate-calculator.service';

@Component({
  selector: 'kelo-plates-display',
  standalone: true,
  imports: [CommonModule, PlateComponent],
  templateUrl: './plates-display.component.html',
  styleUrl: './plates-display.component.scss',
})
export class PlatesDisplayComponent {
  @Input() plates: Plates = {};
  @Input() leftOver: number = 0;
  hasValidPlates: boolean = false;
  unitPreference: Observable<UNITS> = new Observable();
  readonly UNITS = UNITS;

  constructor(
    private readonly unitsService: UnitsService,
    private readonly plateCalcService: PlateCalculatorService
  ) {}

  ngOnInit() {
    this.unitPreference = this.unitsService.getOutputUnitPreference$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plates']) {
      this.hasValidPlates = Boolean(Object.keys(this.plates).length);
    }
  }

  onUnitToggleClick() {
    this.unitsService.toggleUnitOutputPreference();
    this.plateCalcService.calculatePlates();
  }

  // dummy custom sort function since the keyvalue pipe has built in sorting
  // this just maintains the sorting order since the plates are already sorted by key
  sortPlatesToOriginalOrder(
    a: KeyValue<string, number>,
    b: KeyValue<string, number>
  ): number {
    return 0;
  }
}
