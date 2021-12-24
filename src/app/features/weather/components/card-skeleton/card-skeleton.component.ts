import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  templateUrl: './card-skeleton.component.html',
  styleUrls: ['./card-skeleton.component.scss'],
})
export class CardSkeletonComponent implements OnInit {
  @Input() needRefetch?: boolean;
  @Output() refetchCity: EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  refetchCurrentCity(): void {
    this.refetchCity.emit();
  }
}
