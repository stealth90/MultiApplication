import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherApp } from '../weather';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weatherWidget.component.html',
  styleUrls: ['./weatherWidget.component.css'],
})
export class WeatherWidgetComponent implements OnInit {
  @Input() weather: WeatherApp;
  @Output() deleteButton: EventEmitter<any> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}

  deleteCity() {
    this.deleteButton.emit(this.weather.id);
  }
}
