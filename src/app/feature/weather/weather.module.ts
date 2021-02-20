import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherWidgetComponent } from './weatherWidget/weatherWidget.component';
import { MatCardModule } from '@angular/material/card';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import { WeatherAppComponent } from './weather-app.component';
import { NoWeatherComponent } from './components/no-weather/no-weather.component';
import { MatIconModule } from '@angular/material/icon';
import { WeatherIconComponent } from './components/weather-icon/weather-icon.component';
import { DropdownModule } from 'primeng/dropdown';

import { ButtonModule } from 'primeng/button';

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
  ],
  declarations: [
    WeatherWidgetComponent,
    WeatherFormComponent,
    WeatherAppComponent,
    NoWeatherComponent,
    WeatherIconComponent,
  ],
})
export class WeatherModule {}
