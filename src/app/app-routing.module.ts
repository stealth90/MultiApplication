import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'weather',
    loadChildren: () =>
      import('./features/weather/weather.module').then((m) => m.WeatherModule),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./features/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./features/home-resume/home-resume.module').then(
        (m) => m.HomeResumeModule
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
