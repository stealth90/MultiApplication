import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, ArticleReq, ArticlesResp } from '../models';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  topNewsUri = `https://newscatcher.p.rapidapi.com/v1/latest_headlines?`;
  allNewsUri = `https://newscatcher.p.rapidapi.com/v1/search?`;
  allNewsFreeUri = `https://newscatcher.p.rapidapi.com/v1/search_free?`;
  newsCollection: Article[] = [];
  headers: HttpHeaders;
  constructor(private http: HttpClient, private translate: TranslateService) {
    const newsCollectionSaved: Article[] = JSON.parse(
      localStorage.getItem('lastArticles')
    );
    this.newsCollection = newsCollectionSaved || [];
    this.headers = new HttpHeaders()
      .set(
        'x-rapidapi-key',
        '0aaaf61640msh0a9c87855438186p15c6a1jsnff30d535d768'
      )
      .set('x-rapidapi-host', 'newscatcher.p.rapidapi.com');
  }

  /* getNews(year: string, month: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseUri}${year}/${month}.json?api-key=${this.api}`, {
        headers: this.headers,
      })
      .pipe(map((collection) => collection.response.docs));
  } */

  /* getItaNews(): Observable<any> {
    return this.http.get<any>(this.topNewsUri);
  } */

  getTopHeadlinesNews(
    category: string = null,
    country: string = null
  ): Observable<any> {
    const currentCountry = country
      ? country
      : this.translate.currentLang === 'en'
      ? 'gb'
      : this.translate.currentLang;
    const url = `${this.topNewsUri}country=${currentCountry}&media=True${
      category ? `&topic=${category}` : ''
    }`;
    return this.http
      .get<any>(url, { headers: this.headers })
      .pipe(map((value) => value.articles));
  }

  getEverythingArticles({ q, from, to }: ArticleReq): Observable<ArticlesResp> {
    const currentLanguage = this.translate.currentLang;
    const withoutRangeDate = !from && !to;
    const url = `${
      withoutRangeDate ? this.allNewsFreeUri : this.allNewsUri
    }q=${q}${from ? `&from=${from}` : ''}${
      to ? `&to=${to}` : ''
    }&lang=${currentLanguage}&media=True${
      withoutRangeDate ? '' : '&from_rank = 30000'
    }}`;
    return this.http.get<ArticlesResp>(url, { headers: this.headers });
  }
}
