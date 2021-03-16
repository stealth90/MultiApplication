import { Component, Input, OnInit } from '@angular/core';
import { CATEGORY_NEWS, COUNTRIES } from '../../models';

@Component({
  selector: 'app-news-resume-filter',
  templateUrl: './news-resume-filter.component.html',
  styleUrls: ['./news-resume-filter.component.scss'],
})
export class NewsResumeFilterComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  categoryList = CATEGORY_NEWS;
  countriesList = COUNTRIES;
  category: string;
  country: string;
  constructor() {}

  ngOnInit(): void {}
}
