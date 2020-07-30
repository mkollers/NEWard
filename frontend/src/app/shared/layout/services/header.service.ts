import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  navigateBackUri$ = new BehaviorSubject<string | any[]>('');
  fragment$ = new BehaviorSubject<string>('');

  get navigateBackUri() {
    return this.navigateBackUri$.value;
  }

  set navigateBackUri(value: string | any[]) {
    this.navigateBackUri$.next(value);
  }

  get fragment() {
    return this.fragment$.value;
  }

  set fragment(value: string) {
    this.fragment$.next(value);
  }
}
