import { Component, OnDestroy, OnInit } from '@angular/core';
import { AutoPlay, Parallax } from '@egjs/flicking-plugins';
import { Plugin } from '@egjs/flicking';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { NewsService } from './services/news.service';
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  currentLang: string;
  totalResults: number;
  subscriptions: Subscription[] = [];
  plugins: Plugin[] = [
    new Parallax('img', 0.8),
    new AutoPlay({ duration: 3000 }),
  ];

  constructor(
    private translate: TranslateService,
    private config: PrimeNGConfig,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    const primengConfig$ = this.translate
      .get('primeng')
      .subscribe((res) => this.config.setTranslation(res));
    const currentLang$ = this.translate.onLangChange.subscribe(
      (lang: LangChangeEvent) => {
        this.currentLang = lang.lang;
        this.config.setTranslation(lang.translations.primeng);
      }
    );
    this.subscriptions.push(currentLang$, primengConfig$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
