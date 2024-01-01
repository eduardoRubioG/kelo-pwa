import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { UnitsService } from '../../services/units/units.service';
import { UNITS } from '../../consts/kelo.const';

@Component({
  selector: 'kelo-bold-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bold-input.component.html',
})
export class BoldInputComponent {
  @Input() label!: string;
  @Input() weightInput: number | null = null;
  @Output() valueChange = new EventEmitter<number>();

  constructor(private readonly units: UnitsService) {}

  public value: FormControl<number | null> = new FormControl<number | null>(
    this.weightInput
  );
  public inputUnit$: Observable<UNITS> = this.units.getInputUnitPreference$;
  public UNITS = UNITS;
  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.setInputOnInit();
    this.value.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter(
          (value: number | null): value is number =>
            value !== null && !isNaN(value) && value >= 0
        ),
        tap((value) => this.valueChange.emit(value))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  setInputOnInit(): void {
    if (!isNaN(this.weightInput as number)) {
      this.value.setValue(this.weightInput);
    }
  }
}
