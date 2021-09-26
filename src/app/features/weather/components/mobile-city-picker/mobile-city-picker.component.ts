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
  selector: 'app-mobile-city-picker',
  templateUrl: './mobile-city-picker.component.html',
  styleUrls: ['./mobile-city-picker.component.scss'],
})
export class MobileCityPickerComponent implements OnInit {
  mobileSelect: any;
  allCities: any[] = [
    {
      value: `<i class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>`,
      childs: [
        {
          value: `<i class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>`,
        },
      ],
    },
  ];
  bodyNode: HTMLBodyElement;
  loadingCities = false;
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
      onShow: () => this.showPicker(),
      callback: (
        _: number[],
        data: {
          id: string;
          value: string[];
          childs: { id: string; value: string }[];
        }
      ) => this.getCurrentValues(_, data, this.addCity),
      onHide: () => this.hidePicker(),
    });
  }

  fetchData(): void {
    if (this.allCities.length === 1) {
      /* this.mobileSelect.setTitle(
        `<i class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>`
      ); */
      this.cityService
        .getAllTownCity()
        .toPromise()
        .then((res) => {
          /* this.mobileSelect.setTitle(''); */
          this.allCities = res;
          this.mobileSelect.updateWheels(this.allCities);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loadingCities = false;
        });
    }
  }

  showPicker(): void {
    this.renderer.addClass(document.body, 'no-overflow');
  }

  hidePicker(): void {
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
  ): void {
    const city = data[1].value;
    callback.emit(city);
  }
}
