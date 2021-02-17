import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Weather, WeatherApp } from './weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherCollection: WeatherApp[] = [];
  api: string = '448b2429a71b8c55510f42a62897d676';
  baseUri: string = 'http://api.openweathermap.org/data/2.5/';
  constructor(private http: HttpClient) {}

  getWeather = (city: string) => {
    this.http
      .get<Weather>(
        `${this.baseUri}weather?q=${city}&appid=${this.api}&units=metric`
      )
      .pipe(
        map((weather: Weather) => ({
          city,
          temp: weather.main.temp,
          icon: weather.weather[0].icon,
        })),
        catchError((err) => of(err.ok))
      )
      .subscribe((value) => {
        if (value === false) {
          alert('Hai inserito una città non esistente');
        } else this.weatherCollection.push(value);
      });
  };
}
