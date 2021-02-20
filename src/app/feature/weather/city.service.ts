import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  allCityCollection: [] = [];
  allCityUri: string =
    'https://parseapi.back4app.com/classes/Italycities_City?limit=10000&order=name';
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('X-Parse-Application-Id', 'wDqiMlc7FHCehQHJ0XRiOiSZEKXnvakFcyQtwPG9')
      .set('X-Parse-REST-API-Key', 'IE7tFkoH6rPQ2EUaWnsaqvL7ggnzXgzRkVdt0Fl7');
  }

  getAllCity(): Observable<any[]> {
    return this.http
      .get<any>(this.allCityUri, { headers: this.headers })
      .pipe(map((citiesList) => citiesList.results));
  }
}
