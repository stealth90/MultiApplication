import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewVersionCheckerService {
  $isNewVersionAvailable: BehaviorSubject<boolean> = new BehaviorSubject(false);
  newVersionSubscription: Subscription;

  constructor(private swUpdate: SwUpdate) {
    this.checkForUpdate();
  }
  checkForUpdate(): void {
    this.newVersionSubscription?.unsubscribe();
    if (!this.swUpdate.isEnabled) {
      return;
    }
    this.newVersionSubscription = this.swUpdate.versionUpdates.subscribe(
      (evt) => {
        switch (evt.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${evt.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${evt.currentVersion.hash}`);
            console.log(
              `New app version ready for use: ${evt.latestVersion.hash}`
            );
            this.$isNewVersionAvailable.next(true);
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(
              `Failed to install app version '${evt.version.hash}': ${evt.error}`
            );
            break;
        }
      }
    );
  }

  applyUpdate(): void {
    // Reload the page to update to the latest version after the new version is activated
    this.swUpdate
      .activateUpdate()
      .then(() => {
        this.$isNewVersionAvailable.next(false);
        document.location.reload();
      })
      .catch((error) => console.error('Failed to apply updates:', error));
  }
}
