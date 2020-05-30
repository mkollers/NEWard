import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  navigateBackUri$ = new BehaviorSubject<string | any[]>('');

  get navigateBackUri() {
    return this.navigateBackUri$.value;
  }

  set navigateBackUri(value: string | any[]) {
    this.navigateBackUri$.next(value);
  }
}
