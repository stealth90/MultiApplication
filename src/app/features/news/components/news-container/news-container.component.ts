import { Component, OnInit } from '@angular/core';
import { Article } from '../../models';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss'],
})
export class NewsContainerComponent implements OnInit {
  data: Article[] = [];
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    console.log('data', this.data);
  }

  searchNews(event) {
    console.log('event', event);
    this.newsService
      .getEverythingArticles(event)
      .subscribe((values: Article[]) => {
        this.data = [...values];
        console.log('data', this.data);
      });
  }
}
