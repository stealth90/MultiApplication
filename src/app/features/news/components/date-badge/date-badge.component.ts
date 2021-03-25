import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-date-badge',
  templateUrl: './date-badge.component.html',
  styleUrls: ['./date-badge.component.scss'],
})
export class DateBadgeComponent implements OnInit {
  @Input() date: string;
  constructor() {}

  ngOnInit(): void {
    console.log('date', this.date);
  }
}
