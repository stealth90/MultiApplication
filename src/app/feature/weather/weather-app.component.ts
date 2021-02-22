import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherApp } from './models/weather';
import { WeatherService } from './weather.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { TimeService } from './time.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.css'],
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
    private timerService: TimeService
  ) {}

  ngOnInit(): void {
    this.myCurrentWeather = this.weatherService.myCurrentWeather;
    this.myWeatherCollection = this.weatherService.weatherCollection;
    this.subscriptions.push(
      this.timerService.currentTime.subscribe(
        (time) => (this.currentTime = time)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getCity(city: string) {
    this.weatherService.getWeather(city);
    this.myWeatherCollection = this.weatherService.weatherCollection;
  }

  deleteCity(id: string) {
    this.weatherService.deleteWeather(id);
    this.myWeatherCollection = this.weatherService.weatherCollection;
  }
}
