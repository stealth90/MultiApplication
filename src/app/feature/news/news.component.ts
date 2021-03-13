import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fade, AutoPlay } from '@egjs/flicking-plugins';
import { Plugin } from '@egjs/flicking';
import { NewsService } from './news.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  slidesStore: any[] = [];
  currentLang: string;
  totalResults: number;
  currentLang$: Subscription;
  plugins: Plugin[] = [new Fade(), new AutoPlay({ duration: 10000 }, 'NEXT')];
  constructor(
    private newsService: NewsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.currentLang$ = this.translate.onLangChange.subscribe(
      (lang: LangChangeEvent) => {
        this.currentLang = lang.lang;
      }
    );

    /* this.newsService.getNews('2021', '2').subscribe((news: any[]) => {
      this.slidesStore = news
        .filter((_, index) => index <= 10)
        .map((news) => ({
          title: news.headline.main,
          pub_date: news.pub_date,
          url: news.web_url,
          author: news.byline.original,
          image: news.multimedia[0]?.url,
        }));
      console.log(this.slidesStore);
    }); */
    this.newsService
      .getItaNews()
      .pipe(take(1))
      .subscribe((news) => {
        this.slidesStore = news.articles;
        this.totalResults = news.totalResults;
      });
  }

  ngOnDestroy(): void {
    this.currentLang$.unsubscribe();
  }

  onNeedPanel(e) {
    console.log(e);
    // ADD PANELS
  }

  getShortDate(date: any) {
    console.log('hi');
  }

  onMoveEnd(e) {
    // HANDLE INDEX CHANGE
  }
}
