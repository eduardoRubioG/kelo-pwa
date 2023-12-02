import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, distinctUntilChanged, filter, map, takeUntil } from 'rxjs';

@Component({
  selector: 'kelo-app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public title: string = '';
  private destroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    // get the data object from routes
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          if (child?.snapshot.data['title']) {
            return child?.snapshot.data['title'];
          }
          return this.title;
        }),
        distinctUntilChanged()
      )
      .subscribe((title: string) => {
        this.title = title;
      });
  }
}
