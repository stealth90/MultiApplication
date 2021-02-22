import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherApp } from '../models/weather';
import { WeatherService } from '../weather.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weatherWidget.component.html',
  styleUrls: ['./weatherWidget.component.css'],
})
export class WeatherWidgetComponent implements OnInit {
  @Input() weather: WeatherApp;
  @Input() isGeoCity: boolean;
  @Input() time: string;
  @Output() deleteButton: EventEmitter<any> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}

  deleteCity() {
    this.deleteButton.emit(this.weather.id);
  }

  convertTimezone(): string {
    const newTime = moment(this.time).tz(this.weather.timezone);
    return `${newTime.hour()}: ${newTime.minute()}`;
  }

  onSwipe($event) {
    console.log($event);
  }
  onSwipeLeft($event) {
    console.log($event);
  }
  onSwipeRight($event) {
    console.log($event);
  }
}
