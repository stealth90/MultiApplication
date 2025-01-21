import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleReq, ArticlesResp, News } from '../models';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  topNewsUri = `https://real-time-news-data.p.rapidapi.com/topic-headlines?`;
  allNewsUri = `https://real-time-news-data.p.rapidapi.com/search?`;
  /* allNewsFreeUri = `https://newscatcher.p.rapidapi.com/v1/search_free?`; */
  newsCollection: News[] = [];
  headers: HttpHeaders;
  constructor(private http: HttpClient, private translate: TranslateService) {
    const newsCollectionSaved: News[] = JSON.parse(
      localStorage.getItem('lastArticles')
    );
    this.newsCollection = newsCollectionSaved || [];
    this.headers = new HttpHeaders()
      .set(
        'X-RapidAPI-Key',
        '0aaaf61640msh0a9c87855438186p15c6a1jsnff30d535d768'
      )
      .set('X-RapidAPI-Host', 'real-time-news-data.p.rapidapi.com');
  }

  getTopHeadlinesNews(
    category: string = 'NATIONAL',
    country: string = null
  ): Observable<any> {
    const currentCountry = country
      ? country
      : this.translate.currentLang === 'en'
      ? 'gb'
      : this.translate.currentLang;
    const url = `${this.topNewsUri}topic=${category}&country=${currentCountry}`;
    return this.http
      .get<any>(url, { headers: this.headers })
      .pipe(map((value) => value.data));
  }

  getEverythingArticles({ q, from, to }: ArticleReq): Observable<ArticlesResp> {
    const currentLanguage = this.translate.currentLang;
    /* const withoutRangeDate = !from && !to; */
    /* const url = `${
      withoutRangeDate ? this.allNewsFreeUri : this.allNewsUri
    }q=${q}${from ? `&from=${from}` : ''}${
      to ? `&to=${to}` : ''
    }&lang=${currentLanguage}&media=True${
      withoutRangeDate ? '' : '&from_rank = 30000'
    }}`; */
    const url = `${this.allNewsUri}query=${q}&country=${
      currentLanguage === 'it' ? 'IT' : 'US'
    }&lang=${currentLanguage}`;
    return this.http.get<ArticlesResp>(url, { headers: this.headers });
  }
}
