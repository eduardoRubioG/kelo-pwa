import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'kelo-bold-input',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bold-input.component.html',
})
export class BoldInputComponent {
  @Input() label!: string;
  @Output() valueChange = new EventEmitter<number>();

  public value: FormControl<number | null> = new FormControl<number>(Number(0));
  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
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
}