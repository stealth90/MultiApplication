import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PopupMessageService {
  isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  closePopup() {
    this.isOpen.next(false);
  }

  showPopup() {
    timer(0, 3000)
      .pipe(
        take(2),
        map((v, i) => (i === 0 ? true : false))
      )
      .subscribe((value) => this.isOpen.next(value));
  }
}
