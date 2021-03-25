import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-source-badge',
  templateUrl: './source-badge.component.html',
  styleUrls: ['./source-badge.component.scss'],
})
export class SourceBadgeComponent implements OnInit {
  @Input() source: string;
  constructor() {}

  ngOnInit(): void {}
}
