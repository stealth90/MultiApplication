import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFlickingModule } from '@egjs/ngx-flicking';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { BadgeModule } from 'primeng/badge';
import { LoaderModule } from '../../shared/shared.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    BadgeModule,
    NewsRoutingModule,
    NgxFlickingModule,
    LoaderModule,
  ],
})
export class NewsModule {}
