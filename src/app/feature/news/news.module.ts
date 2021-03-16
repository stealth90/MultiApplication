import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFlickingModule } from '@egjs/ngx-flicking';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { BadgeModule } from 'primeng/badge';
import { SharedModule } from '../../shared/shared.module';
import { ArticleDirective } from './directive/article-directive';
import { DateBadgeComponent } from './components/date-badge/date-badge.component';
import { NewsSliderComponent } from './components/news-slider/news-slider.component';
import { NewsResumeFilterComponent } from './components/news-resume-filter/news-resume-filter.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    NewsComponent,
    ArticleDirective,
    DateBadgeComponent,
    NewsSliderComponent,
    NewsResumeFilterComponent,
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
  ],
})
export class NewsModule {}
