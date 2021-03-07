import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CityService } from '../services/city.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss'],
})
export class WeatherFormComponent implements OnInit, OnDestroy {
  citiesList$: Observable<any>;
  lang$: Subscription;
  myName: string;
  @Output() addCity = new EventEmitter<string>(true);
  constructor(
    private cityService: CityService,
    private translate: TranslateService
  ) {
    this.lang$ = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.use(event.lang);
    });
  }

  ngOnInit(): void {
    this.citiesList$ = this.cityService.getAllCity();
  }
  ngOnDestroy(): void {
    this.lang$.unsubscribe();
  }

  onAddCity(): void {
    if (this.myName) {
      this.addCity.emit(this.myName);
      this.myName = '';
    }
  }
}
