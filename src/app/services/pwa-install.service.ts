import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PWAInstallService {
  deferredPrompt: any;
  appCanInstall: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  notInstall(): void {
    this.appCanInstall.next(false);
  }

  userCanInstallApp(e: any): void {
    this.deferredPrompt = e;
    this.appCanInstall.next(true);
  }

  installApp(): void {
    this.appCanInstall.next(false);
    console.log('deferredPrompt', this.deferredPrompt);
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  }
}
