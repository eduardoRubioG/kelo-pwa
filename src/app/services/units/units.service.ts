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

  get getInputUnitPreference(): UNITS {
    return this.state$.value.inputUnit;
  }

  get getOutputUnitPreference(): UNITS {
    return this.state$.value.outputUnit;
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

  calculatePlates(inputWeight: number, barWeight: number) {
    const outputUnit = this.getOutputUnitPreference;
    const inputUnit = this.getInputUnitPreference;

    let weight = inputWeight;
    if (inputUnit === UNITS.KGS && outputUnit === UNITS.LBS) {
      weight *= 2.2;
    } else if (inputUnit === UNITS.LBS && outputUnit === UNITS.KGS) {
      weight /= 2.2;
    }

    let platesNeeded: Plates = {};
    let remainingWeight = (weight - this.mapBarWeight(outputUnit)) / 2;

    const platesMap =
      outputUnit === UNITS.LBS ? PLATE_WEIGHTS_LBS : PLATE_WEIGHTS_KGS;

    Object.entries(platesMap).forEach(([color, weight]) => {
      const count = Math.floor(remainingWeight / weight);
      if (count > 0) {
        platesNeeded[color] = count;
        remainingWeight -= count * weight;
      }
    });

    return {
      platesNeeded,
      remainingWeight: Math.round(remainingWeight * 2),
    };
  }

  setUnitInputPreference() {}
  setUnitOutputPreference() {}
}
