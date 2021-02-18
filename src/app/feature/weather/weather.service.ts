import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Weather, WeatherApp } from './weather';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherCollection: WeatherApp[] = [
    { id: uuidv4(), city: 'Milano', temp: 13.63, icon: '01d' },
  ];
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
          id: uuidv4(),
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

  editCity = (id: string, city: string) => {
    this.deleteWeather(id);
    this.getWeather(city);
  };

  deleteWeather = (id: string) => {
    this.weatherCollection = this.weatherCollection.filter(
      (city) => city.id !== id
    );
  };
}
