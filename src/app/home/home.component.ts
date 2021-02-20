import { Component, OnInit } from '@angular/core';
import {
  options,
  fullpage_api,
} from 'fullpage.js/dist/fullpage.extensions.min';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title: string = 'IOCA';
  config: options;
  fullpage_api: fullpage_api;

  constructor() {
    // for more details on config options please visit fullPage.js docs
    this.config = {
      // fullpage options
      licenseKey: 'YOUR LICENSE KEY HERE',
      anchors: [
        'firstPage',
        'secondPage',
        'thirdPage',
        'fourthPage',
        'lastPage',
      ],
      sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
      menu: '#menu',

      // fullpage callbacks
      afterResize: () => {
        console.log('After resize');
      },
      afterLoad: (origin, destination, direction) => {
        console.log(origin.index);
      },
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  ngOnInit(): void {}
}
