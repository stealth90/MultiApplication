import { Component, OnInit } from '@angular/core';
import { Article, ArticleReq, ArticlesResp } from '../../models';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-container',
  templateUrl: './news-container.component.html',
  styleUrls: ['./news-container.component.scss'],
})
export class NewsContainerComponent implements OnInit {
  data: Article[] = [];
  loading: boolean = false;
  noResult: boolean = false;
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.data = this.newsService.newsCollection;
  }

  searchNews(articleReq: ArticleReq): void {
    this.loading = true;
    this.noResult = false;
    this.newsService
      .getEverythingArticles(articleReq)
      .subscribe((response: ArticlesResp) => {
        if (response.totalResults === 0) {
          this.noResult = true;
          this.data = [];
        } else {
          this.data = [...response.articles];
          this.newsService.newsCollection = [...this.data];
          localStorage.setItem('lastArticles', JSON.stringify(this.data));
        }
        this.loading = false;
      });
  }
}
