import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeResumeComponent } from './home-resume.component';

const routes: Routes = [{ path: '', component: HomeResumeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeResumeRoutingModule { }
