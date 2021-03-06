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
  constructor(
    private cityService: CityService,
    private translate: TranslateService
  ) {
    this.lang$ = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.use(event.lang);
    });
  }
  ngOnDestroy(): void {
    this.lang$.unsubscribe();
  }

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
