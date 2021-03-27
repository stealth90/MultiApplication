import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
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
  offsetNavbar: boolean = false;
  currentRoute: string;

  constructor(private translate: TranslateService, private router: Router) {
    const router$ = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url.slice(1);
      });
    this.subscriptions.push(router$);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  @ViewChild('navbar', { read: ElementRef, static: true }) navbar: ElementRef;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    const lang$ = this.translate.onLangChange.subscribe(
      (langEvent: LangChangeEvent) => {
        this.currentLanguage = langEvent.lang;
      }
    );
    const navbarHeigh$ = fromEvent(window, 'scroll').subscribe(() => {
      const navbarHeight = this.navbar.nativeElement.clientHeight;
      const windowHeight = window.pageYOffset;
      this.offsetNavbar = navbarHeight / 2 - windowHeight > 0 ? false : true;
    });
    this.subscriptions.push(lang$, navbarHeigh$);
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
          .catch(console.error);
      } else this.isVisibleSidebar = false;
    }, 1600);
  };

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
