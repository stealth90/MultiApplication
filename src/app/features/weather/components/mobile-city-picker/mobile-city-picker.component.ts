import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import MobileSelect from 'mobile-select';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'mobile-city-picker',
  templateUrl: './mobile-city-picker.component.html',
  styleUrls: ['./mobile-city-picker.component.scss'],
})
export class MobileCityPickerComponent implements OnInit {
  mobileSelect: any;
  allCities: any[] = [{ value: 'Caricamento...', childs: [{ value: '' }] }];
  bodyNode: HTMLBodyElement;
  loadingCities: boolean = false;
  @Output() addCity = new EventEmitter<string>();
  constructor(
    private translate: TranslateService,
    private cityService: CityService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.mobileSelect = new MobileSelect({
      trigger: '#mobile-select',
      ensureBtnText: `<i class="pi pi-check"></i>`,
      cancelBtnText: `<i class="pi pi-times"></i>`,
      cancelBtnColor: '#ff0000',
      triggerDisplayData: false,
      wheels: [
        {
          data: this.allCities,
        },
      ],
      onShow: (e) => this.showPicker(e),
      callback: (
        _: number[],
        data: {
          id: string;
          value: string[];
          childs: { id: string; value: string }[];
        }
      ) => this.getCurrentValues(_, data, this.addCity),
      onHide: (e) => this.hidePicker(e),
    });
  }

  fetchData() {
    if (this.allCities.length === 1) {
      this.mobileSelect.setTitle(
        `<i class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>`
      );
      this.cityService
        .getAllTownCity()
        .toPromise()
        .then((res) => {
          this.mobileSelect.setTitle('');
          this.allCities = res;
          this.mobileSelect.updateWheels(this.allCities);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loadingCities = false;
        });
    }
  }

  showPicker(e) {
    this.renderer.addClass(document.body, 'no-overflow');
  }

  hidePicker(e) {
    this.renderer.removeClass(document.body, 'no-overflow');
  }

  getCurrentValues(
    _: number[],
    data: {
      id: string;
      value: string[];
      childs: { id: string; value: string }[];
    },
    callback: EventEmitter<string>
  ) {
    const city = data[1].value;
    callback.emit(city);
  }
}
