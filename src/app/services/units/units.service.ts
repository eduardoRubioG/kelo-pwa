import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { UnitsState } from './units.service.interface';
import {
  PLATE_WEIGHTS_KGS,
  PLATE_WEIGHTS_LBS,
  STORE_KEYS,
  UNITS,
} from '../../consts/kelo.const';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';
import { Plates } from '../../types/kelo.interface';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  private readonly defaultUnitState: UnitsState = {
    inputUnit: UNITS.LBS,
    outputUnit: UNITS.LBS,
  };
  public state$: BehaviorSubject<UnitsState> = new BehaviorSubject({
    ...this.defaultUnitState,
  });

  constructor(private readonly storage: StorageService) {
    let inputUnit = UNITS.LBS;
    let outputUnit = UNITS.LBS;

    if (this.storage.has(STORE_KEYS.UNIT_INPUT)) {
      inputUnit = this.storage.get(STORE_KEYS.UNIT_INPUT);
    }
    if (this.storage.has(STORE_KEYS.UNIT_OUTPUT)) {
      outputUnit = this.storage.get(STORE_KEYS.UNIT_OUTPUT);
    }

    this.updateState({
      inputUnit,
      outputUnit,
    });
  }

  updateState(state: Partial<UnitsState>): void {
    const current = this.state$.value;
    this.state$.next({
      ...current,
      ...state,
    });
  }

  get isUsingLbsOutput$(): Observable<boolean> {
    return this.state$.pipe(map((state) => state.outputUnit === UNITS.LBS));
  }

  get isUsingLbsInput$(): Observable<boolean> {
    return this.state$.pipe(map((state) => state.inputUnit === UNITS.LBS));
  }

  get getInputUnitPreference$(): Observable<UNITS> {
    return this.state$.pipe(
      map((state) => state.inputUnit),
      distinctUntilChanged()
    );
  }

  get getOutputUnitPreference$(): Observable<UNITS> {
    return this.state$.pipe(
      map((state) => state.outputUnit),
      distinctUntilChanged()
    );
  }

  getOutputUnitLabel$(): Observable<string> {
    return this.state$.pipe(
      map((state) => (state.outputUnit === UNITS.KGS ? 'Kgs' : 'Lbs'))
    );
  }

  getInputUnitLabel$(): Observable<string> {
    return this.state$.pipe(
      map((state) => (state.inputUnit === UNITS.KGS ? 'Kgs' : 'Lbs'))
    );
  }

  getInputUnitPreference(): UNITS {
    return this.state$.value.inputUnit;
  }

  getOutputUnitPreference(): UNITS {
    return this.state$.value.outputUnit;
  }

  toggleUnitOutputPreference(): void {
    const state = this.state$.value;
    if (state.outputUnit === UNITS.KGS) {
      this.updateState({ outputUnit: UNITS.LBS });
      this.storage.set(STORE_KEYS.UNIT_OUTPUT, UNITS.LBS);
    } else if (state.outputUnit === UNITS.LBS) {
      this.updateState({ outputUnit: UNITS.KGS });
      this.storage.set(STORE_KEYS.UNIT_OUTPUT, UNITS.KGS);
    }
  }

  mapBarWeight(inputUnit: UNITS): number {
    if (inputUnit === UNITS.KGS) {
      return 20;
    } else {
      return 45;
    }
  }

  calculatePlateCombination(
    inputWeight: number,
    barWeight: number,
    barUnit: UNITS,
    plateAvailability: Plates
  ): { plates: Plates; remainder: number } {
    const outputUnit = this.getOutputUnitPreference();
    const inputUnit = this.getInputUnitPreference();

    // Normalize weights to output unit
    const platesMap =
      outputUnit === UNITS.LBS ? PLATE_WEIGHTS_LBS : PLATE_WEIGHTS_KGS;

    if (inputUnit !== outputUnit) {
      inputWeight =
        outputUnit === UNITS.KGS
          ? this.poundsToKilograms(inputWeight)
          : this.kilogramsToPounds(inputWeight);
    }

    if (barUnit !== outputUnit) {
      barWeight =
        outputUnit === UNITS.KGS
          ? this.poundsToKilograms(barWeight)
          : this.kilogramsToPounds(barWeight);
    }

    return this._calculatePlateCombination(
      Math.round(inputWeight),
      platesMap,
      Math.round(barWeight),
      plateAvailability
    );
  }

  private _calculatePlateCombination(
    inputWeight: number, //rounded
    plateWeights: Plates,
    barWeight: number, // rounded
    plateAvailability?: Plates
  ): { plates: Plates; remainder: number } {
    let weightPerSide = (inputWeight - barWeight) / 2;
    let plateCombination: Plates = {};
    let weightRemainder = weightPerSide;

    for (const plate in plateWeights) {
      const plateWeight = plateWeights[plate];
      let availableCount = plateAvailability
        ? plateAvailability[plate]
        : Infinity;
      let count = 0;

      while (weightRemainder >= plateWeight && count < availableCount) {
        weightRemainder -= plateWeight;
        count++;
      }

      if (count > 0) {
        plateCombination[plate] = count;
      }
    }

    return {
      plates: plateCombination,
      remainder: Math.round(weightRemainder),
    };
  }

  setUnitInputPreference() {}
  setUnitOutputPreference() {}

  // Helper functions
  poundsToKilograms(pounds: number): number {
    return pounds / 2.20462;
  }

  kilogramsToPounds(kilograms: number): number {
    return kilograms * 2.20462;
  }
}
