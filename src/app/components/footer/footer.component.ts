import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  currentLanguage: string;
  subscriptions: Subscription[] = [];
  offsetFooter: boolean = false;
  currentRoute: string;

  constructor(private translate: TranslateService, private router: Router) {
    const router$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url.slice(1);
      });
    this.subscriptions.push(router$);
  }

  @ViewChild('footer', { read: ElementRef, static: true }) footer: ElementRef;

  ngOnInit(): void {
    const lang$ = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.currentLanguage = event.lang;
      }
    );
    const footerHeight$ = fromEvent(window, 'scroll').subscribe(() => {
      const footerHeight = this.footer.nativeElement.clientHeight;
      const body = document.body,
        html = document.documentElement;
      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowHeight =
        window.pageYOffset + window.innerHeight > height - footerHeight / 2;
      this.offsetFooter = !windowHeight;
    });

    this.subscriptions.push(lang$, footerHeight$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
