import { Title } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Options } from './models/fullpage';
import * as AOS from 'aos';
import { Skill } from './models/skill';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-home-resume',
  templateUrl: './home-resume.component.html',
  styleUrls: ['./home-resume.component.scss'],
})
export class HomeResumeComponent implements OnInit, OnDestroy {
  private animationItem: AnimationItem;
  config: Options;
  currentIndex = 0;
  fullpageApi: any;
  options: AnimationOptions = {
    path: 'assets/lottie/home_resume.json',
    loop: false,
    autoplay: false,
  };
  mySkills: Skill[] = [
    { name: 'JavaScript', percentage: 90, icon: 'javascript.png' },
    { name: 'TypeScript', percentage: 75, icon: 'typescript.png' },
    { name: 'Angular 2+', percentage: 70, icon: 'angular.png' },
    { name: 'React.js', percentage: 80, icon: 'react.png' },
    { name: 'Vue.js', percentage: 30, icon: 'vue.png' },
    { name: 'HTML 5', percentage: 80, icon: 'html.png' },
    { name: 'SCSS', percentage: 90, icon: 'sass.png' },
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

  constructor(private titleService: Title) {
    this.config = {
      licenseKey: '20A84643-EB4C4F07-B5B35BF6-A606DDD4',
      anchors: [
        'firstPage',
        'secondPage',
        'thirdPage',
        'fourthPage',
        'fivePage',
      ],
      sectionsColor: ['#4d05e8', '#4d05e8', '#4d05e8', '#4d05e8', '#4d05e8'],
      scrollOverflow: true,
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
    this.titleService.setTitle('Petralia | Homepage');
  }
  ngOnDestroy(): void {
    this.fullpageApi.destroy();
  }

  setPageTitle(currentLang: string): void {
    if (currentLang === 'it') {
      this.titleService.setTitle('Petralia | App Meteo');
    } else this.titleService.setTitle('Petralia | Weather app');
  }
  openCv(): void {
    window.open('assets/cv/Petralia_Pierantonio_CV.pdf', '_blank');
  }
}
