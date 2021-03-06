import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  currentTime: Observable<any>;
  constructor() {
    this.currentTime = interval(1000).pipe(map(() => moment()));
  }
}
