import { Component, HostListener, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
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
  };

  handleCloseSidebar = () => {
    this.sidebarAnimation = !this.sidebarAnimation;
    setTimeout(() => (this.isVisibleSidebar = false), 1000);
  };
}
