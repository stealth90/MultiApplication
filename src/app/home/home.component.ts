import { Component, OnDestroy, OnInit } from '@angular/core';
import { options } from './models/fullpage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  title: string = 'IOCA';
  config: options;

  currentIndex = 0;
  fullpage_api;

  constructor() {
    this.config = {
      licenseKey: 'YOUR LICENSE KEY HERE',
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
      sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
      scrollOverflow: true,
      normalScrollElements: '.scrollable-content',
      bigSectionsDestination: 'top',
      loopBottom: true,
      // navigation: true,
      // slidesNavigation: true,
      // navigationTooltips: [
      //   'firstPage',
      //   'secondPage',
      //   'thirdPage',
      //   'fourthPage',
      // ],
      onLeave: (origin?: any, destination?: any, direction?: any) => {
        this.currentIndex = destination.index
          ? 100.0 * (destination.index / (this.config.anchors.length - 1))
          : 0;
      },
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.fullpage_api.destroy();
  }
}
