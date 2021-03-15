import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderComponent } from './components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [LoaderComponent, TruncatePipe],
  imports: [CommonModule, ProgressSpinnerModule, TranslateModule],
  exports: [LoaderComponent, ProgressSpinnerModule, TranslateModule, TruncatePipe],
})
export class SharedModule {}
