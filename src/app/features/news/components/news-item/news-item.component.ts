import { Component, Input } from '@angular/core';
import { Article } from '../../models';
@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent {
  @Input() data: Article;
  constructor() {}

  goToArticle(url: string) {
    window.open(url, '_blank');
  }
}
