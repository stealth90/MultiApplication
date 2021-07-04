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
  id = 'tsparticles';

  particlesOptions = {
    autoplay: true,
    background: {
      color: {
        value: '#4d05e8',
      },
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
      opacity: 0,
    },
    fullScreen: {
      enable: true,
      zIndex: 1,
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#fff',
      },
      links: {
        color: '#f14336',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: false,
        speed: 3,
        straight: true,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  };

  particlesLoaded(container): void {
    console.log(container);
  }

  particlesInit(main): void {
    console.log(main);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
  }
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
