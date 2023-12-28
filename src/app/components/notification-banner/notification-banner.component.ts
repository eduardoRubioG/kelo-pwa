import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'kelo-notification-banner',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './notification-banner.component.html',
  styleUrl: './notification-banner.component.scss',
})
export class NotificationBannerComponent {
  @Input() text: string = '';
  @Input() icon: 'info' | 'error' = 'info';
  @Input() type: 'info' | 'error' = 'info';

  public INFO_TOKENS = 'bg-blue-100 text-blue-700';
  public ERROR_TOKENS = 'bg-red-100 text-red-700';
  public typeToken = '';

  ngOnInit() {
    if (this.type === 'info') {
      this.typeToken = this.INFO_TOKENS;
    } else if (this.type === 'error') {
      this.typeToken = this.ERROR_TOKENS;
    }
  }
}
