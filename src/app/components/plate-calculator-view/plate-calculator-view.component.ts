import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLayoutComponent } from '../view-layout/view-layout.component';
import { BoldInputComponent } from '../bold-input/bold-input.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plates } from '../../types/kelo.interface';
import { PlatesDisplayComponent } from '../plates-display/plates-display.component';
import { PlateCalculatorService } from '../../services/plate-calculator/plate-calculator.service';
import { DropdownSelectorComponent } from '../dropdown-selector/dropdown-selector.component';
import { BarSelectorComponent } from '../bar-selector/bar-selector.component';

@Component({
  selector: 'kelo-plate-calculator-view',
  standalone: true,
  imports: [
    CommonModule,
    ViewLayoutComponent,
    BoldInputComponent,
    PlatesDisplayComponent,
    BarSelectorComponent,
  ],
  templateUrl: './plate-calculator-view.component.html',
  host: { class: 'block h-full overflow-x-hidden' },
})
export class PlateCalculatorViewComponent {
  weightInput: number = NaN;
  calculatedWeights$: Observable<Plates> = new BehaviorSubject({});
  leftOver$: Observable<number> = new BehaviorSubject(0);
  currentInput$: Observable<number> = new Observable();

  constructor(
    private readonly plateCalculatorService: PlateCalculatorService
  ) {}

  ngOnInit() {
    this.calculatedWeights$ = this.plateCalculatorService.calculatedPlates$;
    this.currentInput$ = this.plateCalculatorService.getInputWeight$();
    this.leftOver$ = this.plateCalculatorService.getRemainder$;
  }

  onWeightInput(ev: number): void {
    this.weightInput = ev;
    this.plateCalculatorService.calculatePlates(ev);
  }

  resetLimits(): void {
    // TODO: remove this once we have a settings page
    this.plateCalculatorService.resetAvailability();
  }
}
