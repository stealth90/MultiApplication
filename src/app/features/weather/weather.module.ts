import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { MatCardModule } from '@angular/material/card';
import { WeatherFormComponent } from './components/weather-form/weather-form.component';
import { WeatherAppComponent } from './weather-app.component';
import { NoWeatherComponent } from './components/no-weather/no-weather.component';
import { MatIconModule } from '@angular/material/icon';
import { WeatherIconComponent } from './components/weather-icon/weather-icon.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { CardSkeletonComponent } from './components/card-skeleton/card-skeleton.component';
import { MobileCityPickerComponent } from './components/mobile-city-picker/mobile-city-picker.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    WeatherRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    SkeletonModule,
    SharedModule,
    ProgressSpinnerModule,
    TranslateModule.forChild({ extend: true }),
  ],
  declarations: [
    WeatherWidgetComponent,
    WeatherFormComponent,
    WeatherAppComponent,
    NoWeatherComponent,
    WeatherIconComponent,
    CardSkeletonComponent,
    MobileCityPickerComponent,
  ],
})
export class WeatherModule {}
