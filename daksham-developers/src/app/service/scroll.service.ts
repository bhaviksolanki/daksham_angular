import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollSubject = new Subject<void>();

  scroll() {
    this.scrollSubject.next();
  }

  getScrollObservable() {
    return this.scrollSubject.asObservable();
  }
}
