import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map, mergeMap, retryWhen } from 'rxjs/operators';
import { PopupMessageService } from 'src/app/services/popup-message.service';
import { PopupType } from 'src/assets/models';
import { WeatherApp, Weather } from '../models/weather';
import { insertAt } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherCollection: WeatherApp[];
  myCurrentWeather: WeatherApp[] = [];
  needRefetch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  api = '448b2429a71b8c55510f42a62897d676';
  geoApi = '672604a3782147cebfd0000f75646874';
  baseGeoUri = `https://api.opencagedata.com/geocode/v1/json?key=${this.geoApi}&languange=native&&q=`;
  baseUri = 'https://api.openweathermap.org/data/2.5/';
  hasGeoPermission = true;
  coordinates$: Observable<any>;
  /* headers: HttpHeaders; */

  constructor(
    private http: HttpClient,
    private popupService: PopupMessageService
  ) {
    const weatherCitiesSaved: WeatherApp[] = JSON.parse(
      localStorage.getItem('weatherCities')
    );
    this.getCurrentCity();
    this.weatherCollection = weatherCitiesSaved || [];
    /*     this.headers = new HttpHeaders().set(
      'x-rapidapi-host',
      'google-map-places.p.rapidapi.com'
    ); */
  }

  getCurrentCoords(): Observable<any> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (error) => {
          if (this.hasGeoPermission) {
            if (this.myCurrentWeather.length) {
              this.myCurrentWeather.pop();
            }
            this.popupService.showPopup(
              {
                message: 'weather.errors.no-permission',
                popupType: PopupType.ERROR,
              },
              0
            );
            this.hasGeoPermission = false;
          }
          return observer.error(error);
        },
        { timeout: 5000 }
      );
    }).pipe(retryWhen((error) => error.pipe(delay(2000))));
  }

  getCurrentCity(): void {
    this.needRefetch.next(false);
    const newCity: WeatherApp = {
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
    this.myCurrentWeather = [newCity];
    this.getCurrentCoords().subscribe((myCords) => {
      this.http
        .get<any>(`${this.baseGeoUri}${myCords.latitude},${myCords.longitude}`)
        .pipe(
          map((city) => ({
            cityDetail: {
              name:
                city.results[0].components.town ??
                city.results[0].components.city,
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
              result: Weather & {
                flag: string;
                timezone: string;
                name: string;
              }
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
          if (!weather) {
            this.popupService.showPopup({
              message: 'weather.errors.no-position',
              popupType: PopupType.WARNING,
            });
            this.myCurrentWeather.pop();
            this.needRefetch.next(true);
          } else {
            this.popupService.closePopup();
            this.hasGeoPermission = true;
            if (!this.myCurrentWeather.length) {
              this.myCurrentWeather.push(weather);
            } else {
              const weatherKeys = Object.keys(weather);
              weatherKeys.forEach((key) => {
                this.myCurrentWeather[0][key] = weather[key];
              });
            }
          }
        });
    });
  }

  addCity = (city: string): void => {
    if (this.weatherCollection.find((weather) => weather.city === city)) {
      this.popupService.showPopup({
        message: 'common.item-exist',
        popupType: PopupType.WARNING,
      });
      return;
    }
    const newCity: WeatherApp = {
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
    this.weatherCollection = insertAt(this.weatherCollection, 0, newCity);
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
          this.popupService.showPopup({
            message: 'weather.errors.no-city',
            popupType: PopupType.ERROR,
          });
          this.weatherCollection = this.weatherCollection.splice(0);
        } else {
          this.popupService.showPopup({
            message: 'common.item-added',
            popupType: PopupType.SUCCESS,
          });
          const weatherKeys = Object.keys(value);
          weatherKeys.forEach((key) => {
            this.weatherCollection[0][key] = value[key];
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
    this.popupService.showPopup({
      message: 'common.item-deleted',
      popupType: PopupType.INFO,
    });
  };

  ceckDateWeather = (id: number): void => {
    const index = this.weatherCollection.findIndex(
      (element) => element.id === id
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
