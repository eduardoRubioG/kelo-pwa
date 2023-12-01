import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { NavRoutes } from '../../types/kelo.interface';

@Component({
  selector: 'app-nav-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterLink],
  templateUrl: './nav-tab.component.html',
})
export class NavTabComponent {
  public activeLink: string = '';
  public routes: NavRoutes[] = [
    {
      path: '/plate-calculator',
      label: 'Loader',
    },
    { path: '/rpe-calculator', label: 'RPE' },
  ];
}
