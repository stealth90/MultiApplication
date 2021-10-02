import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FlickingOptions, Plugin } from '@egjs/flicking/declaration/types';
import { Subscription } from 'rxjs';
import { News } from '../../models';
import { NewsService } from '../../services/news.service';
import * as AOS from 'aos';
@Component({
  selector: 'app-news-slider',
  templateUrl: './news-slider.component.html',
  styleUrls: ['./news-slider.component.scss'],
})
export class NewsSliderComponent implements OnInit, OnDestroy {
  @Input() resumePosition: 'left' | 'right';
  @Input() title: string;
  @Input() description: string;
  @Input() sliderOptions: Partial<FlickingOptions>;
  @Input() data: News[] = [];
  @Input() sliderPlugins: Plugin[];
  data$: Subscription;
  constructor(private newsService: NewsService) {
    AOS.init();
  }
  ngOnDestroy(): void {
    this.data$.unsubscribe();
  }

  ngOnInit(): void {
    this.data$ = this.newsService
      .getTopHeadlinesNews()
      .subscribe((value: News[]) => (this.data = [...this.data, ...value]));
  }

  goToArticle(url: string): void {
    window.open(url, '_blank');
  }

  getNews({ category, country }): void {
    this.data = [];
    this.data$ = this.newsService
      .getTopHeadlinesNews(category, country)
      .subscribe((value: News[]) => (this.data = [...this.data, ...value]));
  }
}
