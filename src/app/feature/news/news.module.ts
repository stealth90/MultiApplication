import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFlickingModule } from '@egjs/ngx-flicking';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, NewsRoutingModule, NgxFlickingModule],
})
export class NewsModule {}
