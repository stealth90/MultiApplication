import { Component, OnInit } from '@angular/core';
import { PopupType } from 'src/assets/models';
import { PopupMessageService } from '../../../../services/popup-message.service';
import {
  Article,
  ArticleReq,
  ArticlesResp,
  NewsError,
  ERROR_MESSAGES,
} from '../../models';
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
  newsError: NewsError;
  constructor(
    private newsService: NewsService,
    private popupService: PopupMessageService
  ) {}

  ngOnInit(): void {
    this.data = this.newsService.newsCollection;
  }

  searchNews(articleReq: ArticleReq): void {
    this.loading = true;
    this.noResult = false;
    this.newsService.getEverythingArticles(articleReq).subscribe(
      (response: ArticlesResp) => {
        if (response.totalResults === 0) {
          this.noResult = true;
          this.data = [];
        } else {
          this.data = [...response.articles];
          this.newsService.newsCollection = [...this.data];
          localStorage.setItem('lastArticles', JSON.stringify(this.data));
        }
        this.loading = false;
      },
      (error: NewsError) => {
        this.popupService.showPopup({
          popupType: PopupType.WARNING,
          message: ERROR_MESSAGES[error.error.code],
        });
        this.newsError = error;
        this.loading = false;
      }
    );
  }
}
