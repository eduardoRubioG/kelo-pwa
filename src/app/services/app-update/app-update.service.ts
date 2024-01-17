import { Injectable } from '@angular/core';
import {
  SwUpdate,
  UnrecoverableStateEvent,
  VersionEvent,
} from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  constructor(private swUpdate: SwUpdate) {
    this.subscribeToUpdates();
  }

  private subscribeToUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event: VersionEvent) => {
        switch (event.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${event.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${event.currentVersion.hash}`);
            console.log(
              `New app version ready for use: ${event.latestVersion.hash}`
            );
            if (confirm('New version available. Load New Version?')) {
              window.location.reload();
            }
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(
              `Failed to install app version '${event.version.hash}': ${event.error}`
            );
            break;
        }
      });

      this.swUpdate.unrecoverable.subscribe(
        (event: UnrecoverableStateEvent) => {
          console.error(
            'An error occurred that we cannot recover from:',
            event.reason
          );
          alert(
            'An error occurred that we cannot recover from. Please reload the page.'
          );
        }
      );
    }
  }

  public checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate
        .checkForUpdate()
        .then((isUpdateAvailable) => {
          console.log(
            isUpdateAvailable
              ? 'A new version is available.'
              : 'Already on the latest version.'
          );
        })
        .catch((err) => {
          console.error('Failed to check for updates:', err);
        });
    }
  }
}
