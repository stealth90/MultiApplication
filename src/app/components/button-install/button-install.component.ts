import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { installAppAnimation } from 'src/assets/animations';
import { PWAInstallService } from 'src/app/services/pwa-install.service';

@Component({
  selector: 'app-button-install',
  templateUrl: './button-install.component.html',
  styleUrls: ['./button-install.component.scss'],
  animations: [installAppAnimation],
})
export class ButtonInstallComponent implements OnInit {
  showButton$: Observable<boolean>;

  constructor(private pwaInstallService: PWAInstallService) {}

  ngOnInit(): void {
    this.showButton$ = this.pwaInstallService.appCanInstall;
  }

  handleInstallClick = (e: Event): void => {
    this.pwaInstallService.installApp();
  }

  closeInstallPopup = (): void => {
    this.pwaInstallService.notInstall();
  }
}
