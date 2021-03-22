import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.scss'],
})
export class NewsSearchComponent implements OnInit {
  lang$: Subscription;
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.lang$ = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.translate.use(event.lang);
      }
    );
  }
}
