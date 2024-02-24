import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as Moment from 'moment';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.scss'],
})
export class NewsSearchComponent implements OnInit {
  @Output() dataSearch: EventEmitter<any> = new EventEmitter();
  maxDateValue: Date;
  yearRange: string;
  searchNewsForm = this.formBuilder.group({
    q: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.maxDateValue = new Date();
    this.yearRange = `2000:${new Date().getFullYear()}`;
  }

  onSubmit(): void {
    const updatedValue = Object.values(this.searchNewsForm.value).filter(
      (value) => value !== null
    );
    if (updatedValue.length) {
      const data = {};
      const values = Object.entries(this.searchNewsForm.value);
      values.forEach(([key, value]) =>
        value !== null
          ? key === 'q'
            ? (data[key] = value)
            : (data[key] = Moment(value).format('YYYY-MM-DD'))
          : null
      );
      this.dataSearch.emit(data);
      this.searchNewsForm.reset();
    }
  }

  clearInput(inputField: string): void {
    this.searchNewsForm.controls[inputField].reset();
  }
}
