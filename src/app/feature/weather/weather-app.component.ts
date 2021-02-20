import { Component } from '@angular/core';
import { WeatherApp } from './weather';
import { WeatherService } from './weather.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

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
export class WeatherAppComponent {
  myWeatherCollection: WeatherApp[] = [];
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.myWeatherCollection = this.weatherService.weatherCollection;
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
