import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fade, AutoPlay, Parallax } from '@egjs/flicking-plugins';
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
  currentLang: string;
  totalResults: number;
  currentLang$: Subscription;
  plugins: Plugin[] = [
    new Parallax('img', 0.8),
    new AutoPlay({ duration: 3000 }),
  ];
  plugins2: Plugin[] = [
    new Parallax('img', 0.8),
    new AutoPlay({ duration: 3000 }),
  ];
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
