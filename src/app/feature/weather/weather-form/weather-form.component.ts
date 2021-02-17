import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css'],
})
export class WeatherFormComponent implements OnInit, OnDestroy {
  subscribes: Subject<any>[] = [];
  constructor() {}
  ngOnDestroy(): void {
    this.subscribes.forEach((sub) => sub.unsubscribe());
  }
  name = new FormControl('');

  @Output() getCity = new EventEmitter<string>(true);

  ngOnInit(): void {}

  onAddCity(): void {
    this.getCity.emit(this.name.value);
  }
}
