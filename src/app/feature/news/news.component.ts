import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fade, AutoPlay } from '@egjs/flicking-plugins';
import { Plugin } from '@egjs/flicking';
import { NewsService } from './news.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  slidesStore: any[] = [];
  totalResults: number;
  plugins: Plugin[] = [new Fade(), new AutoPlay({ duration: 10000 }, 'NEXT')];
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
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
    this.newsService.getItaNews().subscribe((news) => {
      console.log('news', news);
      this.slidesStore = news.articles;
      this.totalResults = news.totalResults;
    });
  }

  ngOnDestroy(): void {}

  onNeedPanel(e) {
    console.log(e);
    // ADD PANELS
  }

  getShortDate(date: any) {}

  onMoveEnd(e) {
    // HANDLE INDEX CHANGE
  }
}
