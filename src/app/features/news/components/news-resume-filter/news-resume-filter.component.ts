import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CATEGORY_NEWS, COUNTRIES } from '../../models';

@Component({
  selector: 'app-news-resume-filter',
  templateUrl: './news-resume-filter.component.html',
  styleUrls: ['./news-resume-filter.component.scss'],
})
export class NewsResumeFilterComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Output() newsForm: EventEmitter<any> = new EventEmitter();

  categoryList = CATEGORY_NEWS;
  countriesList = COUNTRIES;
  category: string;
  country: string;
  constructor() {}

  ngOnInit(): void {}

  submitForm(): void {
    this.newsForm.emit({ category: this.category, country: this.country });
  }
}
