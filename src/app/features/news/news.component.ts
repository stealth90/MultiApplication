import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AutoPlay, Parallax } from '@egjs/flicking-plugins';
import { Plugin } from '@egjs/flicking';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { Title } from '@angular/platform-browser';
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
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.setPageTitle(this.translate.currentLang);
    const primengConfig$ = this.translate
      .get('primeng')
      .subscribe((res) => this.config.setTranslation(res));
    const currentLang$ = this.translate.onLangChange.subscribe(
      (langChangeEvent: LangChangeEvent) => {
        this.currentLang = langChangeEvent.lang;
        this.config.setTranslation(langChangeEvent.translations.primeng);
        this.setPageTitle(langChangeEvent.lang);
      }
    );
    this.subscriptions.push(currentLang$, primengConfig$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  setPageTitle(currentLang: string): void {
    if (currentLang === 'it') {
      this.titleService.setTitle('Petralia | App Notizie');
    } else this.titleService.setTitle('Petralia | News app');
  }
}
