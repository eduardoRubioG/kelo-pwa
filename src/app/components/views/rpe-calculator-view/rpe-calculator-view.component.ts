import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLayoutComponent } from '../../view-layout/view-layout.component';

@Component({
  selector: 'kelo-rpe-calculator-view',
  standalone: true,
  imports: [CommonModule, ViewLayoutComponent],
  templateUrl: './rpe-calculator-view.component.html',
})
export class RpeCalculatorViewComponent {}
