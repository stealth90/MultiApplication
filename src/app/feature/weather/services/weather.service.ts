import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, mergeMap, retryWhen } from 'rxjs/operators';
import { WeatherApp } from '../models/weather';

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
      window.localStorage.getItem('weatherCities')
    );
    this.weatherCollection =
      weatherCitiesSaved && weatherCitiesSaved.length
        ? this.ceckDateWeather(weatherCitiesSaved)
        : [];
    this.getCurrentCity();
  }

  getCurrentCoords(): Observable<any> {
    return new Observable((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    }).pipe(retryWhen((error) => error.pipe(delay(1000))));
  }

  getCurrentCity() {
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
          console.log(weather);
          !weather
            ? console.log(
                'Non è stato possibile trovare la tua attuale posizione'
              )
            : this.myCurrentWeather.push(weather);
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
      id: '',
      city: '',
      temp: 0,
      icon: '',
      flag: '',
      timezone: '',
      timestamp: moment(),
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
            .get<any>(
              `${this.baseUri}weather?q=${cityDetail.name}&appid=${this.api}&units=metric`
            )
            .pipe(map((value) => Object.assign({}, value, cityDetail)))
        ),
        map((result) => ({
          prefetch: false,
          id: result.id,
          city: result.name,
          temp: result.main.temp,
          flag: result.flag,
          timezone: result.timezone,
          icon: result.weather[0].icon,
          timestamp: moment(),
        })),
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
          window.localStorage.setItem(
            'weatherCities',
            JSON.stringify(this.weatherCollection)
          );
        }
      });
  };

  deleteWeather = (id: string) => {
    this.weatherCollection = this.weatherCollection.filter(
      (city) => city.id !== id
    );
    window.localStorage.setItem(
      'weatherCities',
      JSON.stringify(this.weatherCollection)
    );
  };

  ceckDateWeather = (weatherCitiesSaved: WeatherApp[]) => {
    let needUpdate = false;
    weatherCitiesSaved.forEach(async (weather, id) => {
      if (moment(weather.timestamp).add(1, 'hours').isAfter(moment())) {
        needUpdate = true;
        const response = await this.http
          .get<any>(
            `${this.baseUri}weather?q=${weather.city}&appid=${this.api}&units=metric`
          )
          .pipe(
            map((result) => ({
              prefetch: false,
              id: result.id,
              city: result.name,
              temp: result.main.temp,
              flag: weather.flag,
              timezone: weather.timezone,
              icon: result.weather[0].icon,
              timestamp: moment(),
            }))
          )
          .toPromise();
        const weatherKeys = Object.keys(weather);
        weatherKeys.forEach((key) => {
          weatherCitiesSaved[id][key] = response[key];
        });
      }
    });
    if (needUpdate) {
      window.localStorage.setItem(
        'weatherCities',
        JSON.stringify(weatherCitiesSaved)
      );
    }
    return weatherCitiesSaved;
  };
}
