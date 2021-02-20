import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { CityService } from '../city.service';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css'],
})
export class WeatherFormComponent implements OnInit {
  subscribes: Subject<any>[] = [];
  citiesList$: Observable<any>;

  constructor(private cityService: CityService) {}

  myName: string;

  @Output() getCity = new EventEmitter<string>(true);

  ngOnInit(): void {
    this.citiesList$ = this.cityService.getAllCity();
  }

  onAddCity(): void {
    if (this.myName) {
      this.getCity.emit(this.myName);
      this.myName = '';
    }
  }
}
