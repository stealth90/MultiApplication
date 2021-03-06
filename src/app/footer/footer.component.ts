import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  currentLanguage: string;
  subscription: Subscription;
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.subscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.currentLanguage = event.lang;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
