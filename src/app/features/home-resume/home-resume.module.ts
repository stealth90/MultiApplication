import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { HomeResumeRoutingModule } from './home-resume-routing.module';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressBarModule } from 'primeng/progressbar';

import { HomeResumeComponent } from './home-resume.component';
import { SocialsLinksComponent } from './components/socials-links/socials-links.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsBadgeComponent } from './components/skills-badge/skills-badge.component';
import { KnobDirective } from './directives/knob.directive';
import { CounterDirective } from './directives/counter.directive';
import { ButtonModule } from 'primeng/button';
import { HeaderSectionComponent } from './components/header-section/header-section.component';
import { AngularTiltModule } from 'angular-tilt';
import { LottieModule, LottieCacheModule } from 'ngx-lottie';
import player from 'lottie-web/build/player/lottie_svg';

@NgModule({
  declarations: [
    HomeResumeComponent,
    SocialsLinksComponent,
    ProgressBarComponent,
    SkillsBadgeComponent,
    KnobDirective,
    CounterDirective,
    HeaderSectionComponent,
  ],
  imports: [
    CommonModule,
    HomeResumeRoutingModule,
    AngularTiltModule,
    AngularFullpageModule,
    FontAwesomeModule,
    ProgressBarModule,
    ButtonModule,
    TranslateModule.forChild({ extend: true }),
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot(),
  ],
  providers: [Title],
})
export class HomeResumeModule {}

export function playerFactory() {
  return player;
}
