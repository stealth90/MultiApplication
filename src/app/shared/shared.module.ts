import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderComponent } from './components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, ProgressSpinnerModule, TranslateModule],
  exports: [LoaderComponent, ProgressSpinnerModule, TranslateModule],
})
export class LoaderModule {}
