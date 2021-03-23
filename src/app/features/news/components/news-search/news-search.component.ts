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
  searchNewsForm = this.formBuilder.group({
    q: ['', Validators.required],
    from: [undefined],
    to: [undefined],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.searchNewsForm);
    const updatedValue = Object.values(this.searchNewsForm.value).filter(
      (value) => value !== null
    );
    if (updatedValue.length) {
      const data = {};
      const values = Object.entries(this.searchNewsForm.value);
      values.forEach((value) =>
        value[1] !== null
          ? value[0] === 'q'
            ? (data[value[0]] = value[1])
            : (data[value[0]] = Moment(value[1]).format('YYYY-MM-DD'))
          : null
      );
      this.dataSearch.emit(data);
    }
  }
}
