import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../../models/skill';

@Component({
  selector: 'app-skills-badge',
  templateUrl: './skills-badge.component.html',
  styleUrls: ['./skills-badge.component.scss'],
})
export class SkillsBadgeComponent implements OnInit {
  @Input() skill: Skill;
  @Input() id: number;
  knobOptions = {
    readOnly: true,
    size: 200,
    valueformat: 'percent',
    max: 100,
    trackWidth: 9,
    barWidth: 6,
    trackColor: '#000',
    barColor: '#f14336',
  };
  constructor() {}

  ngOnInit(): void {}
}
