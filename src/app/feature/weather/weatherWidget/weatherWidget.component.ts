import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherApp } from '../models/weather';
/* import {
  trigger,
  keyframes,
  animate,
  transition,
  state,
  style,
} from '@angular/animations'; */
import * as moment from 'moment-timezone';
// import * as kf from './keyframes';
@Component({
  selector: 'app-weather-widget',
  templateUrl: './weatherWidget.component.html',
  styleUrls: ['./weatherWidget.component.css'],
  /* animations: [
    trigger('cardAnimator', [
      state(
        'default',
        style({
          transform: 'translate3d(0, 0, 0)',
        })
      ),
      state(
        'slideOutLeft',
        style({
          transform: 'translate3d(-25%, 0, 0)',
        })
      ),
      transition(
        'default => slideOutLeft',
        animate(100, keyframes(kf.slideOutLeft))
      ),
      transition(
        'slideOutLeft => default',
        animate(100, keyframes(kf.slideOutRight))
      ),
    ]),
    trigger('buttonAnimator', [
      state(
        'default',
        style({
          opacity: 0,
          display: 'none',
          transform: 'translate3d(0, 0, 0)',
        })
      ),
      state(
        'slideOutLeft',
        style({
          opacity: 1,
          display: 'block',
          transform: 'translate3d(90%, 0, 0)',
        })
      ),
      transition(
        'default => slideOutLeft',
        animate(100, keyframes(kf.showButton))
      ),
      transition(
        'slideOutLeft => default',
        animate(100, keyframes(kf.hideButton))
      ),
    ]),
  ], */
})
export class WeatherWidgetComponent implements OnInit {
  @Input() weather: WeatherApp;
  @Input() isGeoCity: boolean;
  @Input() time: string;
  @Output() deleteButton: EventEmitter<any> = new EventEmitter();
  // animationState: string;
  constructor() {}
  ngOnInit(): void {
    // this.animationState = 'default';
  }

  deleteCity() {
    this.deleteButton.emit(this.weather.id);
  }

  convertTimezone(): string {
    const newTime = moment(this.time).tz(this.weather.timezone);
    return newTime.format('HH:mm ');
  }

  /* startAnimation(state) {
    this.animationState = state;
  } */
}
