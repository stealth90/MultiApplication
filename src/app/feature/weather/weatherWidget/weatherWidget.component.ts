import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weatherWidget.component.html',
  styleUrls: ['./weatherWidget.component.css'],
})
export class WeatherWidgetComponent implements OnInit {
  @Input() weather: { city: string; temp: number; icon: string };
  constructor() {}
  ngOnInit(): void {}
}
