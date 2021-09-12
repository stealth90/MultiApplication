import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CityService } from '../../services/city.service';
import { detectDeviceType } from '../../../../utils';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss'],
})
export class WeatherFormComponent implements OnInit {
  citiesList$: Observable<any>;
  isMobileDevice: boolean;
  localCities: any[];
  myName: string;
  @Output() addCity = new EventEmitter<string>(true);
  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.citiesList$ = this.cityService.getAllItaCity();
    if (detectDeviceType() === 'Mobile') {
      this.isMobileDevice = true;
    } else {
      this.isMobileDevice = false;
    }
  }

  onAddCity(): void {
    if (this.myName) {
      this.addCity.emit(this.myName);
      this.myName = '';
    }
  }

  onSelectCity(city: string): void {
    this.addCity.emit(city);
  }
}
