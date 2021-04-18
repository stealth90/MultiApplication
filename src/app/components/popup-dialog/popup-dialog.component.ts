import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PopupMessageService } from 'src/app/services/popup-message.service';
import { PopupContent } from 'src/assets/models';
import { popupAnimation } from 'src/assets/animations';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss'],
  animations: [popupAnimation],
})
export class PopupDialogComponent implements OnInit {
  @Input() alertType: PopupContent;
  showPopup$: Observable<PopupContent>;

  constructor(private popupMessageService: PopupMessageService) {}

  ngOnInit(): void {
    this.showPopup$ = this.popupMessageService.popup;
  }

  handleClosePopup() {
    this.popupMessageService.closePopup();
  }
}
