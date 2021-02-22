import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { WeatherApp } from './models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherCollection: WeatherApp[] = [];
  myCurrentWeather: WeatherApp[] = [];
  api: string = '448b2429a71b8c55510f42a62897d676';
  geoApi: string = 'c762178c3b604aa1b807eb867f8a1058';
  baseGeoUri: string = `https://api.opencagedata.com/geocode/v1/json?key=${this.geoApi}&languange=native&&q=`;
  baseUri: string = 'http://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) {
    this.getCurrentCity();
  }

  getCurrentCity = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const myCords = position.coords;
        this.http
          .get<any>(
            `${this.baseGeoUri}${myCords.latitude}+${myCords.longitude}`
          )
          .pipe(
            map((city) => ({
              cityDetail: {
                name: city.results[0].components.city,
                flag: city.results[0].annotations.flag,
                timezone: city.results[0].annotations.timezone.name,
              },
            })),
            mergeMap(({ cityDetail }) =>
              this.http
                .get<any>(
                  `${this.baseUri}weather?q=${cityDetail.name}&appid=${this.api}&units=metric`
                )
                .pipe(map((value) => Object.assign({}, value, cityDetail)))
            ),
            map((result) => ({
              id: result.id,
              city: result.name,
              temp: result.main.temp,
              flag: result.flag,
              timezone: result.timezone,
              icon: result.weather[0].icon,
            })),
            catchError((err) => of(err.ok))
          )
          .subscribe((weather) => {
            !weather
              ? alert('Non è stato possibile trovare la tua attuale posizione')
              : this.myCurrentWeather.push(weather);
          });
      }
    );
  };

  getWeather = (city: string) => {
    this.http
      .get<any>(`${this.baseGeoUri}${city}`)
      .pipe(
        map((city) => ({
          cityDetail: {
            name:
              city.results[0].components.city ||
              city.results[0].components.town,
            flag: city.results[0].annotations.flag,
            timezone: city.results[0].annotations.timezone.name,
          },
        })),
        mergeMap(({ cityDetail }) =>
          this.http
            .get<any>(
              `${this.baseUri}weather?q=${cityDetail.name}&appid=${this.api}&units=metric`
            )
            .pipe(map((value) => Object.assign({}, value, cityDetail)))
        ),
        map((result) => ({
          id: result.id,
          city: result.name,
          temp: result.main.temp,
          flag: result.flag,
          timezone: result.timezone,
          icon: result.weather[0].icon,
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
