import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  getCurrentHeight(): Observable<any> {
    return fromEvent(window, 'scroll').pipe(share());
  }
}
