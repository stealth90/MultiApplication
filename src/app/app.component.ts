import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { routeTransitionAnimations } from '../assets/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations],
})
export class AppComponent implements OnInit {
  constructor(
    private config: PrimeNGConfig,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    const currentLanguage = this.translate.getBrowserLang();
    this.translate.setDefaultLang(currentLanguage);
    this.translate.use(currentLanguage);
    this.translate
      .get('primeng')
      .subscribe((res) => this.config.setTranslation(res));
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
