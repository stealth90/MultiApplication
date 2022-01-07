import { Component, Input, OnInit } from '@angular/core';
import { StateChange } from 'ng-lazyload-image';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss'],
})
export class LazyImageComponent implements OnInit {
  @Input() image: string;
  isImageLoading: boolean = true;
  defaultImage: string = 'assets/images/placeholder-image.png';

  constructor() {}

  ngOnInit(): void {}

  myCallbackFunction(event: StateChange): void {
    switch (event.reason) {
      case 'loading-succeeded':
      case 'loading-failed':
      case 'finally':
        this.isImageLoading = false;
        break;
    }
  }
}
