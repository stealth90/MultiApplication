import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFlickingModule } from '@egjs/ngx-flicking';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, BadgeModule, NewsRoutingModule, NgxFlickingModule],
})
export class NewsModule {}
