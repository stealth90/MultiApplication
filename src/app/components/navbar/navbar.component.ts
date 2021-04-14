import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  faLinkedinIn = faLinkedinIn;
  subscriptions: Subscription[] = [];
  isVisibleSidebar: boolean;
  /* innerWidth: number; */
  sidebarAnimation: boolean;
  sidebarSubscription$: Subscription;
  currentLanguage: string;
  offsetNavbar: boolean = false;
  currentRoute: string;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private uiService: UiService
  ) {}

  /* @HostListener('window:resize', ['$event'])
  onResize() {
    console.log('hostlistener');
    this.innerWidth = window.innerWidth;
  } */

  @ViewChild('navbar', { read: ElementRef, static: true }) navbar: ElementRef;

  ngOnInit(): void {
    const router$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url.slice(1);
      });
    const lang$ = this.translate.onLangChange.subscribe(
      (langEvent: LangChangeEvent) => {
        this.currentLanguage = langEvent.lang;
      }
    );
    const navbarHeigh$ = this.uiService.getCurrentHeight().subscribe(() => {
      const navbarHeight = this.navbar.nativeElement.clientHeight;
      const windowHeight = window.pageYOffset;
      this.offsetNavbar = navbarHeight / 2 - windowHeight > 0 ? false : true;
    });
    this.subscriptions.push(lang$, navbarHeigh$, router$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  handleOpenSidebar = () => {
    this.isVisibleSidebar = !this.isVisibleSidebar;
    this.sidebarAnimation = !this.sidebarAnimation;
    this.sidebarSubscription$ = fromEvent<any>(document, 'click')
      .pipe(
        filter(
          (event) =>
            event.target.className === 'p-component-overlay p-sidebar-mask'
        ),
        take(1)
      )
      .subscribe(() => this.handleCloseSidebar());
    this.subscriptions.push(this.sidebarSubscription$);
  };

  handleCloseSidebar = (routeName?: string) => {
    this.sidebarSubscription$.unsubscribe();
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
