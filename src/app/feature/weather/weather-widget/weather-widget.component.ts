import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
// import * as kf from './keyframes';
@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
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
export class WeatherWidgetComponent implements OnInit, OnDestroy {
  @Input() weather: WeatherApp;
  @Input() isGeoCity: boolean;
  @Input() time: string;
  @Output() deleteButton: EventEmitter<any> = new EventEmitter();
  currentLang$: Subscription;
  currentLang: string;
  // animationState: string;
  constructor(private translate: TranslateService) {}
  ngOnDestroy(): void {
    this.currentLang$.unsubscribe();
  }
  ngOnInit(): void {
    // this.animationState = 'default';
    this.currentLang = this.translate.currentLang;
    this.currentLang$ = this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      this.convertTimezone();
    });
  }

  deleteCity() {
    this.deleteButton.emit(this.weather.id);
  }

  convertTimezone(): string {
    const newTime = moment(this.time)
      .locale(this.currentLang)
      .tz(this.weather.timezone);
    return `${newTime.format('HH:mm')} - ${this.capitalizeFirstLetter(
      newTime.format('dddd')
    )}`;
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  /* startAnimation(state) {
    this.animationState = state;
  } */
}
