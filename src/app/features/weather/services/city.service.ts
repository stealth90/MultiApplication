import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { capitalize } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  allCityCollection: [] = [];
  /* allCityUri: string =
    'https://parseapi.back4app.com/classes/Italycities_City?limit=90000&order=name'; */
  allItaCityUri = 'https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni';
  allItaTownUri = 'https://axqvoqvbfjpaamphztgd.functions.supabase.co/province';
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('X-Parse-Application-Id', 'wDqiMlc7FHCehQHJ0XRiOiSZEKXnvakFcyQtwPG9')
      .set('X-Parse-REST-API-Key', 'IE7tFkoH6rPQ2EUaWnsaqvL7ggnzXgzRkVdt0Fl7');
  }

  /* getAllCity(): Observable<any[]> {
    return this.http
      .get<any>(this.allCityUri, { headers: this.headers })
      .pipe(map((citiesList) => citiesList.results));
  } */

  getAllItaCity(): Observable<any[]> {
    return this.http
      .get<any>(`${this.allItaCityUri}?onlyname=true`)
      .pipe(
        map((citiesList) =>
          citiesList.sort().map((city: string) => ({ name: capitalize(city) }))
        )
      );
  }

  getAllTownCity(): Observable<any> {
    return this.http.get<any[]>(`${this.allItaTownUri}?onlyname=true`).pipe(
      mergeMap((mainItemArr) => {
        return forkJoin(
          mainItemArr.sort().map((city) => {
            return this.http
              .get<any[]>(
                `${this.allItaCityUri}/provincia/${city}?onlyname=true`
              )
              .pipe(
                map((someInfo) => {
                  return {
                    value: capitalize(city),
                    id: city,
                    childs: someInfo.map((info) => {
                      return { id: info, value: capitalize(info) };
                    }),
                  };
                })
              );
          })
        );
      })
    );
  }
}
