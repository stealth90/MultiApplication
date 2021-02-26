import { Component, HostListener, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  subscription: Subscription;
  isVisibleSidebar: boolean;
  innerWidth: number;
  sidebarAnimation: boolean;

  constructor(private primengConfig: PrimeNGConfig) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.primengConfig.ripple = true;
  }

  handleOpenSidebar = () => {
    this.isVisibleSidebar = !this.isVisibleSidebar;
    this.sidebarAnimation = !this.sidebarAnimation;
    this.subscription = fromEvent<any>(document, 'click')
      .pipe(
        filter((event) => {
          if (event.target.className === 'p-component-overlay p-sidebar-mask')
            return event;
        }),
        take(1)
      )
      .subscribe(() => this.handleCloseSidebar());
  };

  handleCloseSidebar = () => {
    this.sidebarAnimation = !this.sidebarAnimation;
    setTimeout(() => {
      this.isVisibleSidebar = false;
    }, 1000);
    this.subscription.unsubscribe();
  };
}
