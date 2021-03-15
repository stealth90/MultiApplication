import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Input() message: string = 'loader.weather';
  @Input() customSpinner: boolean;
  @Input() strokeWidth: number;
  @Input() animationDuration: string;
  lang$: Subscription;
  constructor(private translate: TranslateService) {
    this.lang$ = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.use(event.lang);
    });
  }
  ngOnDestroy(): void {
    this.lang$.unsubscribe();
  }

  ngOnInit(): void {}
}
