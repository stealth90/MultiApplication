import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PopupMessageService } from 'src/app/services/popup-message.service';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss'],
  animations: [
    trigger('openPopup', [
      state(
        'visible',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out'),
      ]),
      transition('* => void', [
        animate(
          '300ms ease-in',
          style({
            opacity: 0,
            transform: 'translateX(50%)',
          })
        ),
      ]),
    ]),
  ],
})
export class PopupDialogComponent implements OnInit {
  @Input() alertType: AlertType;
  showPopup$: Observable<boolean>;

  constructor(private popupMessageService: PopupMessageService) {}

  ngOnInit(): void {
    this.showPopup$ = this.popupMessageService.isOpen;
  }

  handleClosePopup() {
    this.popupMessageService.closePopup();
  }
}

const enum AlertType {
  Error = 1,
  Info,
}
