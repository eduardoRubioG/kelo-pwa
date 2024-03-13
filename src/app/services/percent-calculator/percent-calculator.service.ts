import { Injectable } from '@angular/core';
import {
  OneRM,
  PercentCalculatorServiceState,
} from './percent-calculator.service.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PercentCalculatorService {
  private readonly defaultState: PercentCalculatorServiceState = {
    pinned1RMs: [],
  };

  public state$: BehaviorSubject<PercentCalculatorServiceState> =
    new BehaviorSubject({
      ...this.defaultState,
    });

  updateState(state: Partial<PercentCalculatorServiceState>): void {
    const current = this.state$.value;
    this.state$.next({
      ...current,
      ...state,
    });
  }

  // selectors
  getPinned1Rms$(): Observable<OneRM[]> {
    return this.state$.pipe(map((state) => state.pinned1RMs));
  }
}
