import { Component, OnDestroy, OnInit } from '@angular/core';
import { options } from './models/fullpage';
import * as AOS from 'aos';
import { Skill } from './models/skill';
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
