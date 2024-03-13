import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLayoutComponent } from '../../view-layout/view-layout.component';
import { PercentCalculatorService } from '../../../services/percent-calculator/percent-calculator.service';
import { OneRM } from '../../../services/percent-calculator/percent-calculator.service.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'kelo-percent-calculator-view',
  standalone: true,
  imports: [
    CommonModule,
    ViewLayoutComponent,
    FormsModule,
    MatIconModule,
    MatSliderModule,
    MatRippleModule,
  ],
  templateUrl: './percent-calculator-view.component.html',
  styleUrl: './percent-calculator-view.component.scss',
})
export class PercentCalculatorViewComponent {
  constructor(
    private readonly percentService: PercentCalculatorService,
    private readonly _snackBar: MatSnackBar
  ) {}

  public pinned1RMs: Observable<OneRM[]> = new BehaviorSubject([]);
  public resultingWeight: number = -1;

  // form controls
  percentValue: number = 60; // Default slider value
  oneRMWeight: number = 0; // Default 1RM input value

  ngOnInit(): void {
    this.pinned1RMs = this.percentService.getPinned1Rms$();
  }

  calcWeight(): void {
    this.resultingWeight = this.percentValue * 0.01 * this.oneRMWeight;
  }

  openSnackbar(): void {
    this._snackBar.open(`Copied ${this.resultingWeight} to clipboard`, 'Close');
  }

  copyWeightToClipboard(event: any): void {
    navigator.clipboard
      .writeText(this.resultingWeight.toString())
      .then(() => {
        this.openSnackbar();
      })
      .catch((err) => {
        console.error('Failed to copy', err);
      });
  }
}
