import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth/auth.service'
import { SidebarService } from './components/layout/sidebar.service';
import '../assets/js/jquery.dataTables.js';
import '../assets/js/jquery.dataTables.bootstrap.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'raan';

  public userSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  constructor(
    private authService: AuthService,
    private sidebarSvc: SidebarService
  ) {
    this.authService.userSignedIn$.subscribe(data => this.userSignedIn$.next(data));
    console.log(this.authService.userSignedIn$)
  }

  private onClickOutSideBar(e) {
    this.sidebarSvc.emitClickOutSide();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
