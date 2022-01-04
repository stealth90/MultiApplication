import { Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFlickingModule } from '@egjs/ngx-flicking';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { BadgeModule } from 'primeng/badge';
import { SharedModule } from '../../shared/shared.module';
import { NewsDirective } from './directive/news.directive';
import { DateBadgeComponent } from './components/date-badge/date-badge.component';
import { NewsSliderComponent } from './components/news-slider/news-slider.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NewsResumeFilterComponent } from './components/news-resume-filter/news-resume-filter.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NewsTableComponent } from './components/news-table/news-table.component';
import { NewsSearchComponent } from './components/news-search/news-search.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { NewsContainerComponent } from './components/news-container/news-container.component';
import { SourceBadgeComponent } from './components/source-badge/source-badge.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewsDirective,
    DateBadgeComponent,
    NewsSliderComponent,
    NewsResumeFilterComponent,
    NewsTableComponent,
    NewsSearchComponent,
    NewsItemComponent,
    NewsContainerComponent,
    SourceBadgeComponent,
  ],
  imports: [
    CommonModule,
    BadgeModule,
    NewsRoutingModule,
    NgxFlickingModule,
    SharedModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    CalendarModule,
  ],
  providers: [Title],
})
export class NewsModule {}
