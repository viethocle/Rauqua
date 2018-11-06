import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  clickOutSide = new BehaviorSubject(false);
  constructor() { }

  emitClickOutSide() {
    this.clickOutSide.next(true);
  }
}
