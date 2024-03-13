import { Routes } from '@angular/router';
import { PlateCalculatorViewComponent } from './components/views/plate-calculator-view/plate-calculator-view.component';
import { RpeCalculatorViewComponent } from './components/views/rpe-calculator-view/rpe-calculator-view.component';
import { PercentCalculatorViewComponent } from './components/views/percent-calculator-view/percent-calculator-view.component';

export const routes: Routes = [
  { path: '**', redirectTo: 'plate-calculator' },
  { path: '', redirectTo: 'plate-calculator', pathMatch: 'full' },
  {
    path: 'plate-calculator',
    component: PlateCalculatorViewComponent,
    data: {
      title: 'Plate Calculator',
    },
  },
  {
    path: 'percent-calculator',
    component: PercentCalculatorViewComponent,
    data: {
      title: 'Percent Calculator',
    },
  },
  {
    path: 'rpe-calculator',
    component: RpeCalculatorViewComponent,
    data: {
      title: 'RPE Calculator',
    },
  },
];
