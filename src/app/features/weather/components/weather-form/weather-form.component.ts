import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss'],
})
export class WeatherFormComponent implements OnInit {
  citiesList$: Observable<any>;
  myName: string;
  @Output() addCity = new EventEmitter<string>(true);
  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.citiesList$ = this.cityService.getAllCity();
  }

  onAddCity(): void {
    if (this.myName) {
      this.addCity.emit(this.myName);
      this.myName = '';
    }
  }
}
