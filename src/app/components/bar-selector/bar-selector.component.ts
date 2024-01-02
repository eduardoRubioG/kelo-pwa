import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownSelectorComponent } from '../dropdown-selector/dropdown-selector.component';
import { PlateCalculatorService } from '../../services/plate-calculator/plate-calculator.service';
import { Observable } from 'rxjs';
import { SelectableItem } from '../../types/kelo.interface';
import { UNITS } from '../../consts/kelo.const';

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
  constructor(private readonly plateCalcService: PlateCalculatorService) {}

  ngOnInit(): void {
    this.barOptions$ = this.plateCalcService.getBarOptions$();
  }

  onBarSelection(selection: any): void {
    const bar: SelectableItem<{ weight: number; unit: UNITS }> =
      selection as SelectableItem<{ weight: number; unit: UNITS }>;

    this.plateCalcService.setBarSelection(bar?.value?.weight, bar?.value?.unit);
  }
}
