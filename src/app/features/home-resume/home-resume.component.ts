import { Component, OnDestroy, OnInit } from '@angular/core';
import { Options } from './models/fullpage';
import * as AOS from 'aos';
import { Skill } from './models/skill';
@Component({
  selector: 'app-home-resume',
  templateUrl: './home-resume.component.html',
  styleUrls: ['./home-resume.component.scss'],
})
export class HomeResumeComponent implements OnInit, OnDestroy {
  title = 'IOCA';
  config: Options;
  currentIndex = 0;
  fullpageApi: any;
  mySkills: Skill[] = [
    { name: 'JavaScript', percentage: 90, icon: 'javascript.png' },
    { name: 'TypeScript', percentage: 75, icon: 'typescript.png' },
    { name: 'Angular 2+', percentage: 70, icon: 'angular.png' },
    { name: 'React.js', percentage: 80, icon: 'react.png' },
    { name: 'HTML 5', percentage: 80, icon: 'html.png' },
    { name: 'CSS', percentage: 90, icon: 'css.png' },
    { name: 'Redux', percentage: 70, icon: 'redux.png' },
    { name: 'RxJs', percentage: 75, icon: 'rxjs.svg' },
  ];

  tiltSettings = {
    reverse: true,
    maxTilt: 20,
    perspective: 1000,
    easing: 'cubic-bezier(.03,.98,.52,.99)',
    scale: 1.2,
    speed: 300,
    transition: true,
    disableAxis: null,
    reset: true,
    glare: false,
    maxGlare: 0.5,
  };

  constructor() {
    this.config = {
      licenseKey: null,
      anchors: [
        'firstPage',
        'secondPage',
        'thirdPage',
        'fourthPage',
        'fivePage',
      ],
      sectionsColor: ['#4d05e8', '#4d05e8', '#4d05e8', '#4d05e8', '#4d05e8'],
      scrollOverflow: true,
      /* normalScrollElements: '.scrollable-content', */
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

  getRef(fullPageRef: any): void {
    this.fullpageApi = fullPageRef;
  }

  ngOnInit(): void {
    AOS.init();
  }
  ngOnDestroy(): void {
    this.fullpageApi.destroy();
  }
}
