import { Component, OnDestroy, OnInit } from '@angular/core';
import { options } from './models/fullpage';
import * as AOS from 'aos';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home-resume',
  templateUrl: './home-resume.component.html',
  styleUrls: ['./home-resume.component.scss'],
})
export class HomeResumeComponent implements OnInit, OnDestroy {
  title: string = 'IOCA';
  config: options;
  currentIndex = 0;
  fullpage_api;

  constructor() {
    this.config = {
      licenseKey: null,
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
      sectionsColor: ['#4d05e8', '#4d05e8', '#4d05e8', '#4d05e8', '#4d05e8'],
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

  ngOnInit(): void {
    AOS.init();
  }
  ngOnDestroy(): void {
    this.fullpage_api.destroy();
  }
}
