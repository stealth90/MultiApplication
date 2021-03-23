import { Component, Input, OnInit } from '@angular/core';
import { Article, Customer } from '../../models';
import { NewsService } from '../../services/news.service';
@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss'],
})
export class NewsTableComponent implements OnInit {
  selectedCustomer2: Customer;
  @Input() data: Article[];
  customers2: Article[];
  columns: any[];

  constructor() {}

  ngOnInit(): void {
    this.columns = [
      { field: 'author', header: 'Author' },
      { field: 'title', header: 'Title' },
      { field: 'publishedAt', header: 'Published at' },
      { field: 'url', header: 'Url' },
      { field: 'urlToImage', header: 'Image' },
      { field: 'description', header: 'Description' },
    ];
  }
}
