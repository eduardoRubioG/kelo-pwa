import { Injectable } from '@angular/core';
import { PlateCalculatorState } from './plate-calculator.service.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UnitsService } from '../units/units.service';

@Injectable({
  providedIn: 'root',
})
export class PlateCalculatorService {
  private readonly defaultState: PlateCalculatorState = {
    inputWeight: 0,
    barWeight: 45,
    leftOverAmount: 0,
    platesNeeded: {},
  };
  public state$: BehaviorSubject<PlateCalculatorState> = new BehaviorSubject({
    ...this.defaultState,
  });

  constructor(private readonly unitsService: UnitsService) {}

  updateState(state: Partial<PlateCalculatorState>): void {
    const current = this.state$.value;
    this.state$.next({
      ...current,
      ...state,
    });
  }

  getInputWeight(): number {
    return this.state$.value.inputWeight;
  }

  get getSelectedBarWeight(): number {
    return this.state$.value.barWeight;
  }

  get getLeftOver$(): Observable<number> {
    return this.state$.pipe(map((state) => state.leftOverAmount));
  }

  get calculatedPlates$() {
    return this.state$.pipe(map((state) => state.platesNeeded));
  }

  getCurrentTotalPlateLoad() {}

  calculatePlates(weight?: number): void {
    if (weight || this.getInputWeight()) {
      weight = !!weight ? weight : this.getInputWeight();
      this.setWeightInput(weight);
      const { remainingWeight, platesNeeded } =
        this.unitsService.calculatePlates(weight, this.getSelectedBarWeight);

      this.updateState({
        platesNeeded,
        leftOverAmount: remainingWeight,
      });
    } else {
      console.error('Plate Calculator Service: Invalid Weight Input');
    }
  }

  setWeightInput(inputWeight: number): void {
    this.updateState({
      inputWeight,
    });
  }
}
