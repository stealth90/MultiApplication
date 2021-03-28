import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PopupContent, PopupType } from '../../assets/models';

@Injectable({
  providedIn: 'root',
})
export class PopupMessageService {
  popup: BehaviorSubject<PopupContent> = new BehaviorSubject<PopupContent>({
    isShow: false,
    popupType: PopupType.INFO,
    message: '',
    icon: '',
  });

  constructor() {}

  closePopup() {
    this.popup.next({
      isShow: false,
      popupType: PopupType.INFO,
      message: '',
      icon: '',
    });
  }

  showPopup(
    { message, popupType = PopupType.ERROR, icon }: Partial<PopupContent>,
    duration?: number
  ) {
    const iconPopup = !icon
      ? popupType === 'error'
        ? 'pi-ban'
        : popupType === 'success'
        ? 'pi-check'
        : popupType === 'warning'
        ? 'pi-exclamation-triangle'
        : 'pi-info'
      : icon;
    if (duration === 0) {
      this.popup.next({
        isShow: true,
        message,
        popupType,
        icon: iconPopup,
      });
    } else {
      timer(0, duration ? duration : 3000)
        .pipe(
          take(2),
          map((v, i) => (i === 0 ? true : false))
        )
        .subscribe((value: boolean) => {
          return this.popup.next({
            isShow: value,
            message,
            popupType,
            icon: iconPopup,
          });
        });
    }
  }
}
