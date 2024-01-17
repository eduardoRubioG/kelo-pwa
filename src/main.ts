import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environment/environment';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

if ('serviceWorker' in navigator && environment.production) {
  navigator.serviceWorker.register('/ngsw-worker.js');
}
