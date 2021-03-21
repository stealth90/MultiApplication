import { Component, OnInit } from '@angular/core';
import { Article, Customer } from '../../models';
import { CustomerService } from '../../services/customerservice.service';
import { NewsService } from '../../services/news.service';
@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss'],
})
export class NewsTableComponent implements OnInit {
  selectedCustomer2: Customer;
  customers2: Article[];
  columns: any[];

  constructor(
    private customerService: CustomerService,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.columns = [
      { field: 'author', header: 'Author' },
      { field: 'title', header: 'Title' },
      { field: 'publishedAt', header: 'Published at' },
      { field: 'url', header: 'Url' },
      { field: 'description', header: 'Description' },
    ];
    this.newsService
      .getEverythingArticles('covid')
      .subscribe((data) => (this.customers2 = data));
    /* this.customerService
      .getCustomersMedium()
      .then((data) => (this.customers2 = data)); */
  }
}
