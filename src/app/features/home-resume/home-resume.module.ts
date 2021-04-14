import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    AngularFullpageModule,
    FontAwesomeModule,
    ProgressBarModule,
    ButtonModule,
    TranslateModule.forChild({ extend: true }),
  ],
})
export class HomeResumeModule {}
