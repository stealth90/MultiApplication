import { Title } from '@angular/platform-browser';
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
import { Observable, Subscription } from 'rxjs';
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
  needRefetch$: Observable<boolean>;
  subscriptions: Subscription[] = [];
  currentTime: string;

  constructor(
    private weatherService: WeatherService,
    private timerService: TimeService,
    private translate: TranslateService,
    private pwaInstallService: PWAInstallService,
    private popupMessage: PopupMessageService,
    private titleService: Title
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
    this.setPageTitle(this.translate.currentLang);
    const lang$ = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.translate.use(event.lang);
        this.setPageTitle(event.lang);
      }
    );
    this.needRefetch$ = this.weatherService.needRefetch;
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

  setPageTitle(currentLang: string): void {
    if (currentLang === 'it') {
      this.titleService.setTitle('Petralia | App Meteo');
    } else this.titleService.setTitle('Petralia | Weather app');
  }

  addCity(city: string): void {
    this.weatherService.addCity(city);
    this.myWeatherCollection = this.weatherService.weatherCollection;
  }

  deleteCity(id: number): void {
    this.weatherService.deleteWeather(id);
    this.myWeatherCollection = this.weatherService.weatherCollection;
  }

  refetchCity(): void {
    this.weatherService.getCurrentCity();
  }
}
