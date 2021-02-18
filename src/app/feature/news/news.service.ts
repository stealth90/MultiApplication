import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  baseUri = 'https://api.nytimes.com/svc/archive/v1/';
  api = 'ROLKmVA9wilvwsPzrAoTsuZFtlzZV0Dr';
  newsCOllection: [] = [];
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  getNews(year: string, month: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseUri}${year}/${month}.json?api-key=${this.api}`, {
        headers: this.headers,
      })
      .pipe(map((collection) => collection.response.docs));
  }
}
