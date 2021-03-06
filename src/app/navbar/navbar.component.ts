import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  faLinkedinIn = faLinkedinIn;
  subscriptions: Subscription[] = [];
  isVisibleSidebar: boolean;
  innerWidth: number;
  sidebarAnimation: boolean;
  currentLanguage: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService,
    private router: Router
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.primengConfig.ripple = true;
    const lang$ = this.translate.onLangChange.subscribe(
      (langEvent: LangChangeEvent) => {
        this.currentLanguage = langEvent.lang;
      }
    );
    this.subscriptions.push(lang$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  handleOpenSidebar = () => {
    this.isVisibleSidebar = !this.isVisibleSidebar;
    this.sidebarAnimation = !this.sidebarAnimation;
    const sidebarSubscription = fromEvent<any>(document, 'click')
      .pipe(
        filter((event) => {
          if (event.target.className === 'p-component-overlay p-sidebar-mask')
            return event;
        }),
        take(1)
      )
      .subscribe(() => this.handleCloseSidebar());
    this.subscriptions.push(sidebarSubscription);
  };

  handleCloseSidebar = (routeName?: string) => {
    this.sidebarAnimation = !this.sidebarAnimation;
    setTimeout(() => {
      if (routeName) {
        this.router
          .navigate([routeName])
          .then(() => (this.isVisibleSidebar = false))
          .catch(console.log);
      } else this.isVisibleSidebar = false;
    }, 1600);
  };

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
