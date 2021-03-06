import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routeTransitionAnimations } from './shared/animations/route-transition-animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    const currentLanguage = this.translate.getBrowserLang();
    this.translate.setDefaultLang(currentLanguage);
    this.translate.use(currentLanguage);
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
