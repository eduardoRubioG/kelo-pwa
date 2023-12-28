import { Injectable } from '@angular/core';
import { PlateCalculatorState } from './plate-calculator.service.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UnitsService } from '../units/units.service';
import {
  PLATE_WEIGHTS_KGS,
  PLATE_WEIGHTS_LBS,
  STORE_KEYS,
  UNITS,
} from '../../consts/kelo.const';
import { Plates } from '../../types/kelo.interface';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PlateCalculatorService {
  private readonly defaultState: PlateCalculatorState = {
    inputWeight: 0,
    barWeight: 45,
    remainder: 0,
    platesNeeded: {},
    barUnit: UNITS.LBS,
    availability: {
      RED: Infinity,
      BLUE: Infinity,
      YELLOW: Infinity,
      GREEN: Infinity,
      TENS: Infinity,
      FIVES: Infinity,
      BISCUIT: Infinity,
    },
  };
  public state$: BehaviorSubject<PlateCalculatorState> = new BehaviorSubject({
    ...this.defaultState,
  });

  constructor(
    private readonly unitsService: UnitsService,
    private readonly storage: StorageService
  ) {
    const storedAvilability = this.storage.setIfDoesNotExist(
      STORE_KEYS.PLATE_AVAILABILITY_SS,
      this.serializePlateAvailabilityForStorage(this.getPlateAvailability),
      true // store in session storage
    );
    // If default availability doesn't match stored availability
    const deserializedAvailability =
      this.deserializePlatesAvailabilityFromStorage(storedAvilability);
    if (this.getPlateAvailability !== deserializedAvailability) {
      this.updateState({ availability: deserializedAvailability });
    }
  }

  updateState(state: Partial<PlateCalculatorState>): void {
    const current = this.state$.value;
    this.state$.next({
      ...current,
      ...state,
    });
  }

  // Need to serialize because JSON doesn't support Infinity
  serializePlateAvailabilityForStorage(map: Plates): string {
    const serialized = { ...map };
    for (const key in serialized) {
      if (serialized[key] === Infinity) {
        serialized[key] = -1;
      }
    }
    return JSON.stringify(serialized);
  }

  deserializePlatesAvailabilityFromStorage(serializedData: string): Plates {
    const plates = JSON.parse(serializedData) as Plates;
    for (const key in plates) {
      if (plates[key] === -1) {
        plates[key] = Infinity;
      }
    }
    return plates;
  }

  getInputWeight(): number {
    return this.state$.value.inputWeight;
  }

  getInputWeight$(): Observable<number> {
    return this.state$.pipe(map((state) => state.inputWeight));
  }

  getTotalDisplayedWeight$(): Observable<number> {
    return this.state$.pipe(map(() => this.getCurrentTotalPlateLoad()));
  }

  get getSelectedBarWeight(): number {
    return this.state$.value.barWeight;
  }

  get getSelectedBarUnit(): UNITS {
    return this.state$.value.barUnit;
  }

  get getRemainder$(): Observable<number> {
    return this.state$.pipe(map((state) => state.remainder));
  }

  get calculatedPlates$() {
    return this.state$.pipe(map((state) => state.platesNeeded));
  }

  get getPlateAvailability(): Plates {
    return this.state$.value.availability;
  }

  getCurrentTotalPlateLoad(): number {
    // calculated total should be in the input unit
    const inputUnit = this.unitsService.getInputUnitPreference();
    const outputUnit = this.unitsService.getOutputUnitPreference();
    let total = 0;

    // add bar
    const barUnit = this.getSelectedBarUnit;
    let barWeight = this.getSelectedBarWeight;
    if (barUnit !== outputUnit) {
      barWeight =
        barUnit === UNITS.KGS
          ? this.unitsService.kilogramsToPounds(barWeight)
          : this.unitsService.poundsToKilograms(barWeight);
    }
    total += barWeight;

    // add plates
    // normalize plates using output unit since it's what the plates are in
    const plates: Plates = this.state$.value.platesNeeded;
    const weightMap =
      outputUnit === UNITS.KGS ? PLATE_WEIGHTS_KGS : PLATE_WEIGHTS_LBS;

    Object.entries(plates).forEach(([plateKey, plateCount]) => {
      total += weightMap[plateKey] * plateCount * 2;
    });

    return Number(total.toFixed(2));
  }

  setPlateAvailability(plateKey: string, newLimit: number): void {
    const limits = { ...this.getPlateAvailability };
    limits[plateKey] = newLimit;

    // set in state
    this.updateState({
      availability: limits,
    });
    // set in session
    this.storage.set(
      STORE_KEYS.PLATE_AVAILABILITY_SS,
      this.serializePlateAvailabilityForStorage(limits),
      true
    );
    // recalc plates
    this.calculatePlates();
  }

  calculatePlates(weight?: number): void {
    if (weight || this.getInputWeight()) {
      weight = !!weight ? weight : this.getInputWeight();
      this.setWeightInput(weight);
      const { plates, remainder } = this.unitsService.calculatePlateCombination(
        weight,
        this.getSelectedBarWeight,
        this.getSelectedBarUnit,
        this.getPlateAvailability
      );

      this.updateState({
        platesNeeded: plates,
        remainder,
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

  resetAvailability(): void {
    this.updateState({
      availability: this.defaultState.availability,
    });

    this.calculatePlates();
  }
}
