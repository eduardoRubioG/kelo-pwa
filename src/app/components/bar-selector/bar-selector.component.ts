import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownSelectorComponent } from '../dropdown-selector/dropdown-selector.component';
import { PlateCalculatorService } from '../../services/plate-calculator/plate-calculator.service';
import { Observable, map } from 'rxjs';
import { Bar, SelectableItem } from '../../types/kelo.interface';
import { UNITS } from '../../consts/kelo.const';
import { DefaultBarSelectOptions } from '../../consts/plate-calculator.const';

@Component({
  selector: 'kelo-bar-selector',
  standalone: true,
  templateUrl: './bar-selector.component.html',
  styleUrl: './bar-selector.component.scss',
  imports: [CommonModule, DropdownSelectorComponent],
})
export class BarSelectorComponent {
  barOptions$: Observable<SelectableItem<{ weight: number; unit: UNITS }>[]> =
    new Observable();
  currentBar$: Observable<SelectableItem<Bar>> = new Observable();
  constructor(private readonly plateCalcService: PlateCalculatorService) {}

  ngOnInit(): void {
    this.barOptions$ = this.plateCalcService.getBarOptions$();
    this.currentBar$ = this.plateCalcService.getCurrentBar$().pipe(
      map((bar) => {
        const barSelectableItem = DefaultBarSelectOptions.find(
          (barOption) =>
            barOption.value.weight === bar.weight &&
            barOption.value.unit === bar.unit
        );
        if (barSelectableItem) {
          return barSelectableItem;
        } else {
          console.error(
            'BarSelectorComponent: Default Bar Was Not Found - Serving Static Selection'
          );
          return DefaultBarSelectOptions[0];
        }
      })
    );
  }

  onBarSelection(selection: any): void {
    const bar: SelectableItem<{ weight: number; unit: UNITS }> =
      selection as SelectableItem<{ weight: number; unit: UNITS }>;

    this.plateCalcService.setBarSelection(bar?.value?.weight, bar?.value?.unit);
  }
}
