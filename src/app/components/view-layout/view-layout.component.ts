import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kelo-view-layout',
  standalone: true,
  imports: [CommonModule],
  template: ` <section class="p-6 bg-gray-100 h-full flex flex-col">
    <ng-content />
  </section>`,
  host: { class: 'block h-full' },
})
export class ViewLayoutComponent {}
