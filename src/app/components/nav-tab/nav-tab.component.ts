import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';
import { NavRoutes } from '../../types/kelo.interface';
import { APP_ROUTES } from '../../consts/kelo.const';

@Component({
  selector: 'kelo-nav-tab',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterLink],
  templateUrl: './nav-tab.component.html',
  styleUrl: './nav-tab.component.scss',
})
export class NavTabComponent {
  public activeLink: string = '';
  private readonly DEFAULT_TAB = APP_ROUTES.PLATE_CALC;

  // These are only used in component -- not for actual Ng Router
  public routes: NavRoutes[] = [
    {
      path: APP_ROUTES.PLATE_CALC,
      label: 'Plate Calc',
    },
    { path: APP_ROUTES.RPE_CALC, label: 'RPE' },
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // tab from last session or the default tab if none
    const lastSelectedTab: string =
      localStorage.getItem('lastSelectedTab') || this.DEFAULT_TAB;
    this.router.navigate([lastSelectedTab]);

    this.activeLink = lastSelectedTab;
  }

  onTabClick(selectedTabPath: string): void {
    this.activeLink = selectedTabPath;
    localStorage.setItem('lastSelectedTab', selectedTabPath);
  }
}
