import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavTabComponent } from './components/nav-tab/nav-tab.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppUpdateService } from './services/app-update/app-update.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavTabComponent,
    AppHeaderComponent,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private readonly appUpdateService: AppUpdateService) {
    this.appUpdateService.checkForUpdates();
  }
}
