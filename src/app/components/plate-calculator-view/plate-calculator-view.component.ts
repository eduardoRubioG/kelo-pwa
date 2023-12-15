import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLayoutComponent } from '../view-layout/view-layout.component';
import { BoldInputComponent } from '../bold-input/bold-input.component';

@Component({
  selector: 'kelo-plate-calculator-view',
  standalone: true,
  imports: [CommonModule, ViewLayoutComponent, BoldInputComponent],
  templateUrl: './plate-calculator-view.component.html',
  host: { class: 'block h-full' },
})
export class PlateCalculatorViewComponent {}
