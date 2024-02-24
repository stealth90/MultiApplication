import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Article, Customer, News } from '../../models';
@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss'],
})
export class NewsTableComponent implements OnInit {
  selectedCustomer2: Customer;
  @Input() data: News[];
  @Input() loading: boolean;
  @Input() noResult: boolean;
  customers2: Article[];
  columns: any[];
  isMobileDevice: boolean;

  constructor(private deviceService: DeviceDetectorService) {
    this.isMobileDevice = this.deviceService.isMobile();
  }

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
