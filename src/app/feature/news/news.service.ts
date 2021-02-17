import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  baseUri = 'https://api.nytimes.com/svc/archive/v1/';
  api = 'ROLKmVA9wilvwsPzrAoTsuZFtlzZV0Dr';

  constructor(private http: HttpClient) {}

  getNews(year: string, month: string) {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http
      .get<any>(
        `${this.baseUri}${year}/${month}.json?api-key=${this.api}`,
        requestOptions
      )
      .subscribe((value) => console.log(value));
  }
}
