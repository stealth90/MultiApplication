import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleReq, ArticlesResp } from '../models';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  baseUri = 'https://api.nytimes.com/svc/archive/v1/';
  api = 'ROLKmVA9wilvwsPzrAoTsuZFtlzZV0Dr';
  newsApi = 'e6984dc1ebcc45af920f5195a0bbc864';
  topNewsUri = `https://newsapi.org/v2/top-headlines?`;
  allNewsUri = `https://newsapi.org/v2/everything?`;
  newsCOllection: [] = [];
  headers: HttpHeaders;
  constructor(private http: HttpClient, private translate: TranslateService) {
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

  getItaNews(): Observable<any> {
    return this.http.get<any>(this.topNewsUri);
  }

  getTopHeadlinesNews(
    category: string = null,
    country: string = null
  ): Observable<any> {
    const currentCountry = country
      ? country
      : this.translate.currentLang === 'en'
      ? 'gb'
      : this.translate.currentLang;
    const api = `${this.topNewsUri}country=${currentCountry}${
      category ? `&category=${category}` : ''
    }&apiKey=${this.newsApi}`;
    return this.http
      .get<any>(api, { headers: this.headers })
      .pipe(map((value) => value.articles));
  }

  getEverythingArticles({ q, from, to }: ArticleReq): Observable<ArticlesResp> {
    const currentLanguage = this.translate.currentLang;
    const url = `${this.allNewsUri}q=${encodeURIComponent(q)}${
      from ? `&from=${from}` : ''
    }${to ? `&to=${to}` : ''}&language=${currentLanguage}&apiKey=${
      this.newsApi
    }`;
    return this.http.get<ArticlesResp>(url, { headers: this.headers });
  }
}
