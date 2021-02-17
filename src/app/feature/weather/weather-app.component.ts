import { Component } from '@angular/core';
import { WeatherApp } from './weather';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.css'],
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
}
