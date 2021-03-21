import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, mergeMap, retryWhen } from 'rxjs/operators';
import { WeatherApp, Weather } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherCollection: WeatherApp[];
  myCurrentWeather: WeatherApp[] = [];
  api: string = '448b2429a71b8c55510f42a62897d676';
  geoApi: string = 'c762178c3b604aa1b807eb867f8a1058';
  baseGeoUri: string = `https://api.opencagedata.com/geocode/v1/json?key=${this.geoApi}&languange=native&&q=`;
  baseUri: string = 'http://api.openweathermap.org/data/2.5/';
  hasGeoPermission: boolean = true;
  coordinates$: Observable<any>;

  constructor(private http: HttpClient) {
    const weatherCitiesSaved: WeatherApp[] = JSON.parse(
      localStorage.getItem('weatherCities')
    );
    this.getCurrentCity();
    this.weatherCollection = weatherCitiesSaved || [];
  }

  getCurrentCoords(): Observable<any> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (error) => observer.error(error),
        { timeout: 5000 }
      );
    }).pipe(retryWhen((error) => error.pipe(delay(2000))));
  }

  getCurrentCity() {
    let newCity: WeatherApp = {
      prefetch: true,
      id: 0,
      city: '',
      temp: 0,
      icon: '',
      flag: '',
      timezone: '',
      temp_max: 0,
      temp_min: 0,
      humidity: 0,
      timestamp: moment().toISOString(),
    };
    this.myCurrentWeather.push(newCity);
    this.getCurrentCoords().subscribe((myCords) => {
      this.http
        .get<any>(`${this.baseGeoUri}${myCords.latitude}+${myCords.longitude}`)
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
              .get<Weather>(
                `${this.baseUri}weather?q=${cityDetail.name}&appid=${this.api}&units=metric`
              )
              .pipe(map((value) => Object.assign({}, value, cityDetail)))
          ),
          map(
            (
              result: Weather & { flag: string; timezone: string; name: string }
            ): WeatherApp => ({
              prefetch: false,
              id: result.id,
              city: result.name,
              temp: result.main.temp,
              flag: result.flag,
              timezone: result.timezone,
              timestamp: '',
              icon: result.weather[0].icon,
              temp_max: result.main.temp_max,
              temp_min: result.main.temp_min,
              humidity: result.main.humidity,
            })
          ),
          catchError((err) => of(err.ok))
        )
        .subscribe((weather) => {
          console.log(weather);
          if (!weather) {
            console.log(
              'Non è stato possibile trovare la tua attuale posizione'
            );
          } else {
            const weatherKeys = Object.keys(weather);
            weatherKeys.forEach((key) => {
              this.myCurrentWeather[0][key] = weather[key];
            });
          }
        }),
        (err) => {
          console.log(err.code);
          this.hasGeoPermission = false;
        };
    });
  }

  addCity = (city: string) => {
    if (this.weatherCollection.find((weather) => weather.city === city)) return;
    let newCity: WeatherApp = {
      prefetch: true,
      id: 0,
      city: '',
      temp: 0,
      icon: '',
      flag: '',
      timezone: '',
      temp_max: 0,
      temp_min: 0,
      humidity: 0,
      timestamp: moment().toISOString(),
    };
    const lastElement = this.weatherCollection.push(newCity) - 1;
    this.http
      .get<any>(`${this.baseGeoUri}${city}`)
      .pipe(
        map((city$) => ({
          cityDetail: {
            name: city,
            flag: city$.results[0].annotations.flag,
            timezone: city$.results[0].annotations.timezone.name,
          },
        })),
        mergeMap(({ cityDetail }) =>
          this.http
            .get<Weather>(
              `${this.baseUri}weather?q=${cityDetail.name}&appid=${this.api}&units=metric`
            )
            .pipe(map((value) => Object.assign({}, value, cityDetail)))
        ),
        map(
          (
            result: Weather & { flag: string; timezone: string; name: string }
          ): WeatherApp => ({
            prefetch: false,
            id: result.id,
            city: result.name,
            temp: result.main.temp,
            flag: result.flag,
            timezone: result.timezone,
            icon: result.weather[0].icon,
            temp_max: result.main.temp_max,
            temp_min: result.main.temp_min,
            humidity: result.main.humidity,
            timestamp: moment().toISOString(),
          })
        ),
        catchError((err) => of(err.ok))
      )
      .subscribe((value) => {
        if (value === false) {
          alert('Hai inserito una città non esistente');
          this.weatherCollection.pop();
        } else {
          const weatherKeys = Object.keys(value);
          weatherKeys.forEach((key) => {
            this.weatherCollection[lastElement][key] = value[key];
          });
          localStorage.setItem(
            'weatherCities',
            JSON.stringify(this.weatherCollection)
          );
        }
      });
  };

  deleteWeather = (id: number) => {
    this.weatherCollection = this.weatherCollection.filter(
      (city) => city.id !== id
    );
    localStorage.setItem(
      'weatherCities',
      JSON.stringify(this.weatherCollection)
    );
  };

  ceckDateWeather = (id: number) => {
    const index = this.weatherCollection.findIndex(
      (weather) => weather.id === id
    );
    const weather = this.weatherCollection[index];
    if (-moment(weather.timestamp).diff(moment(), 'minutes') >= 30) {
      this.http
        .get<Weather>(
          `${this.baseUri}weather?q=${weather.city}&appid=${this.api}&units=metric`
        )
        .pipe(
          map(
            (result: Weather): WeatherApp => ({
              prefetch: false,
              id: result.id,
              city: result.name,
              temp: result.main.temp,
              flag: weather.flag,
              timezone: weather.timezone,
              icon: result.weather[0].icon,
              temp_max: result.main.temp_max,
              temp_min: result.main.temp_min,
              humidity: result.main.humidity,
              timestamp: moment().toISOString(),
            })
          )
        )
        .subscribe((result) => {
          Object.keys(result).forEach((key) => {
            this.weatherCollection[index][key] = result[key];
          });
          localStorage.setItem(
            'weatherCities',
            JSON.stringify(this.weatherCollection)
          );
        });
    }
  };
}
