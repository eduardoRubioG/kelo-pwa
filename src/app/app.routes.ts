import { Routes } from '@angular/router';
import { PlateCalculatorViewComponent } from './components/plate-calculator-view/plate-calculator-view.component';
import { RpeCalculatorViewComponent } from './components/rpe-calculator-view/rpe-calculator-view.component';

export const routes: Routes = [
  {
    path: 'plate-calculator',
    component: PlateCalculatorViewComponent,
  },
  {
    path: 'rpe-calculator',
    component: RpeCalculatorViewComponent,
  },
];
