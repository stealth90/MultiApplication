import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherApp } from './models/weather';
import { WeatherService } from './services/weather.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { TimeService } from './services/time.service';
import { Subscription } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { PWAInstallService } from 'src/app/services/pwa-install.service';
import { PopupMessageService } from 'src/app/services/popup-message.service';
import { PopupType } from 'src/assets/models';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss'],
  animations: [
    trigger('animation', [
      state(
        'visible',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out'),
      ]),
      transition('* => void', [
        animate(
          '250ms ease-in',
          style({
            height: 0,
            opacity: 0,
            transform: 'translateX(50%)',
          })
        ),
      ]),
    ]),
  ],
})
export class WeatherAppComponent implements OnInit, OnDestroy {
  myCurrentWeather: WeatherApp[] = [];
  myWeatherCollection: WeatherApp[] = [];
  subscriptions: Subscription[] = [];
  currentTime: string;

  constructor(
    private weatherService: WeatherService,
    private timerService: TimeService,
    private translate: TranslateService,
    private pwaInstallService: PWAInstallService,
    private popupMessage: PopupMessageService
  ) {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.pwaInstallService.userCanInstallApp(e);
    });
    window.addEventListener('appinstalled', () => {
      this.popupMessage.showPopup({
        message: this.translate.instant('common.app-installed'),
        popupType: PopupType.SUCCESS,
      });
    });
  }

  ngOnInit(): void {
    const lang$ = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.translate.use(event.lang);
      }
    );
    this.myCurrentWeather = this.weatherService.myCurrentWeather;
    this.myWeatherCollection = this.weatherService.weatherCollection;
    const currentTime$ = this.timerService.currentTime.subscribe(
      (time) => (this.currentTime = time)
    );
    this.subscriptions.push(currentTime$, lang$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  addCity(city: string): void {
    this.weatherService.addCity(city);
    this.myWeatherCollection = this.weatherService.weatherCollection;
  }

  deleteCity(id: number): void {
    this.weatherService.deleteWeather(id);
    this.myWeatherCollection = this.weatherService.weatherCollection;
  }
}
