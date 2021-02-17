import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'weather',
    loadChildren: () =>
      import('./feature/weather/weather.module').then((m) => m.WeatherModule),
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  { path: 'news', loadChildren: () => import('./feature/news/news.module').then(m => m.NewsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
