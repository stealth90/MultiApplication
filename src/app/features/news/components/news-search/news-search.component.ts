import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.scss'],
})
export class NewsSearchComponent implements OnInit {
  searchNewsForm = this.formBuilder.group({
    terms: ['', Validators.required],
    from: [''],
    to: [''],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(e) {
    console.log(this.searchNewsForm);
  }
}
